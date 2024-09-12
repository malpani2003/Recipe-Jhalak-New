import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, Search, Heart } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full py-2 bg-gray-900 text-white">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6" />
          <span className="font-bold">RecipeFinder</span>
        </div>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link className="text-sm hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline" href="/contact">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
    // <footer className="bg-gray-800 text-white py-6">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col md:flex-row justify-between items-center">
    //       <div className="mb-6 md:mb-0">
    //         <h2 className="text-3xl font-bold text-yellow-400 mb-2">Recipe Jhalak</h2>
    //         <p className="text-lg">Recipe Dekh, Khana Bana</p>
    //         <p className="text-sm mt-1">By - Pranav Malpani</p>
    //       </div>
    //       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
    //         <div>
    //           <h3 className="text-xl font-semibold text-yellow-400 mb-2">Links</h3>
    //           <ul className="flex flex-col space-y-2">
    //             <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
    //             <li><Link to="/#category" className="hover:text-yellow-400">Recipe by Categories</Link></li>
    //             <li><Link to="/area" className="hover:text-yellow-400">Recipe by Area</Link></li>
    //             <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
    //             <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="my-4 border-gray-600" />
    //     <p className="text-center text-sm">
    //       Terms & Conditions | Privacy Policy | Copyright &copy; {new Date().getFullYear()} Recipe Jhalak
    //     </p>
    //   </div>
    // </footer>
  );
}

export default Footer;
