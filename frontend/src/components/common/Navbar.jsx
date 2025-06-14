import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Check auth status
  useEffect(() => {
    try {
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsAuthenticated(false);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsAuthenticated(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome className="mr-2" /> },
    ...(isAuthenticated
      ? [
          { path: "/dashboard", name: "Dashboard", icon: <FiShoppingCart className="mr-2" /> },
          { path: "/profile", name: "Profile", icon: <FiUser className="mr-2" /> },
        ]
      : [
          { path: "/login", name: "Login", icon: <FiLogIn className="mr-2" /> },
          { path: "/register", name: "Register", icon: <FiUserPlus className="mr-2" /> },
        ]),
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-lg text-white" : "bg-gradient-to-r from-orange-900 to-orange-500 text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center hover:opacity-80 transition-opacity"
          >
            <FiShoppingCart className="mr-2" />
            Grocery<span className="text-orange-400">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md transition-all ${
                  scrolled
                    ? "hover:bg-orange-500 hover:bg-opacity-20 hover:text-orange-300"
                    : "hover:bg-black hover:bg-opacity-20"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={`flex items-center px-3 py-2 rounded-md transition-all ${
                  scrolled
                    ? "hover:bg-red-500 hover:bg-opacity-20 hover:text-red-300"
                    : "hover:bg-red-500 hover:bg-opacity-20"
                }`}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none hover:bg-black hover:bg-opacity-20 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 space-y-2 ${scrolled ? "bg-black bg-opacity-90" : "bg-orange-600"} rounded-lg`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md transition-all ${
                  scrolled
                    ? "hover:bg-orange-500 hover:bg-opacity-20 hover:text-orange-300"
                    : "hover:bg-black hover:bg-opacity-20"
                }`}
              >
                <div className="flex items-center">
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                  scrolled
                    ? "hover:bg-red-500 hover:bg-opacity-20 hover:text-red-300"
                    : "hover:bg-red-500 hover:bg-opacity-20"
                }`}
              >
                <div className="flex items-center">
                  <FiLogOut className="mr-2" />
                  Logout
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;