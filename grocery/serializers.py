from rest_framework import serializers
from .models import Product, Category, Cart, CartItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']  # Matches your model exactly
        read_only_fields = ['id']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    in_stock = serializers.SerializerMethodField()  # Added without model change
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 
            'category', 'stock', 'image', 'created_at', 'in_stock'
        ]
        read_only_fields = ['id', 'created_at', 'in_stock']
        
    def get_in_stock(self, obj):
        return obj.stock > 0  # Computed field without model change

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price']
        read_only_fields = ['id', 'product', 'total_price']
        
    def get_total_price(self, obj):
        return obj.total_price()  # Uses your model's method

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at', 
                'is_checked_out', 'items', 'total']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'items', 'total']
        
    def get_total(self, obj):
        return sum(item.total_price() for item in obj.items.all())  # Uses your model method