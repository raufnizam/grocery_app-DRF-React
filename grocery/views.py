from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, Category, Cart, CartItem
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, CartItemSerializer

# Simple permission classes
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_admin()

class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer()

# Product Views
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsAdmin()]  # Only admins can create/update/delete

# Category Views
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsAdmin()]  # Only admins can modify categories

# Cart Views
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsCustomer]  # Only for customers
    
    def get_queryset(self):
        # Get only the current user's active cart
        return Cart.objects.filter(user=self.request.user, is_checked_out=False)
    
    def perform_create(self, serializer):
        # Check if user already has an active cart
        if self.get_queryset().exists():
            return Response(
                {"error": "You already have an active cart"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save(user=self.request.user)

# Cart Item Views
class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsCustomer]  # Only for customers
    
    def get_queryset(self):
        # Get items from user's active cart
        cart = get_object_or_404(Cart, user=self.request.user, is_checked_out=False)
        return CartItem.objects.filter(cart=cart)
    
    def perform_create(self, serializer):
        cart = get_object_or_404(Cart, user=self.request.user, is_checked_out=False)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data.get('quantity', 1)
        
        # Check stock
        if product.stock < quantity:
            return Response(
                {"error": f"Only {product.stock} available in stock"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Add to cart
        serializer.save(cart=cart)
    
    def perform_destroy(self, instance):
        # Simple delete with error handling
        try:
            instance.delete()
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )