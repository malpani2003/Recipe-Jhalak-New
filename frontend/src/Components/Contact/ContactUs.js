import React from "react";
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
      >
        <ChevronLeft className="mr-1" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <p className="text-gray-600 mb-4">
            Feel free to reach out directly via email or phone, or visit us at our office!
          </p>
          <div className="space-y-6">
            <p className="flex items-center text-gray-700">
              <Mail className="mr-2 text-blue-500" /> pranavmaheshwair123@gmail.com
            </p>
            <p className="flex items-center text-gray-700">
              <Phone className="mr-2 text-blue-500" /> 1234567890
            </p>
            <p className="flex items-center text-gray-700">
              <MapPin className="mr-2 text-blue-500" /> India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
