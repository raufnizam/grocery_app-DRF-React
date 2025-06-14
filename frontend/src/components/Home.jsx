import { FaShoppingBasket, FaEgg, FaWineBottle, FaArrowRight } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import { MdLocalGroceryStore } from 'react-icons/md';

const Home = () => {

  return (
    <div className="container mt-10 mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-orange-600">FreshCart</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          
        </p>
        
        
      </div>

      
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-orange-100 group">
              <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <GiFruitBowl className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Fresh Produce</h3>
              <p className="text-gray-600 mb-4">
                Seasonal fruits and vegetables picked at peak freshness
              </p>
              <a href="#" className="text-orange-600 font-medium inline-flex items-center hover:text-orange-700">
                Browse selection
                <FaArrowRight className="ml-1" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-orange-100 group">
              <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <FaEgg className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Dairy & Eggs</h3>
              <p className="text-gray-600 mb-4">
                Farm-fresh dairy products and organic eggs
              </p>
              <a href="#" className="text-orange-600 font-medium inline-flex items-center hover:text-orange-700">
                Browse selection
                <FaArrowRight className="ml-1" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-orange-100 group">
              <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <MdLocalGroceryStore className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Pantry Staples</h3>
              <p className="text-gray-600 mb-4">
                All your essential kitchen items in one place
              </p>
              <a href="#" className="text-orange-600 font-medium inline-flex items-center hover:text-orange-700">
                Browse selection
                <FaArrowRight className="ml-1" />
              </a>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <FaShoppingBasket className="text-orange-500 text-4xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to shop?</h3>
              <p className="text-gray-600 mb-6">
                Discover our weekly specials and seasonal offers for the best deals on quality groceries
              </p>
              <a 
                href="/products" 
                className="inline-block px-8 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors duration-300"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default Home;