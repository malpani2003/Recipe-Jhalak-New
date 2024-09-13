import React from "react";
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-900 text-white mt-auto">
      <div className="container px-2 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <ChefHat className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">Recipe Jhalak</span>
          </div>
          <nav className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-0">
            <Link to="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
            <Link to="/about" className="text-sm hover:underline">
              About Us
            </Link>
          </nav>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Recipe Jhalak. All Rights Reserved.</p>
          <p>Developed by Pranav Malpani</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
