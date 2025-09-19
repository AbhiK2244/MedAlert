import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div>
          <Link to="/" className="text-2xl font-bold text-[#4F6FFE]">MedAlert AI</Link>
          <p className="mt-4 text-sm text-neutral-400">
            Eat smarter. Live healthier.  
            AI-powered nutrition insights for a better lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <Link to="/about" className="hover:text-[#4F6FFE] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#4F6FFE] transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#4F6FFE] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#4F6FFE] transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <Link to="/scan" className="hover:text-[#4F6FFE] transition-colors">
                Product Scanner
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-[#4F6FFE] transition-colors">
                Health Reports
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#4F6FFE] transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-neutral-400 text-xl">
            <a href="#" className="hover:text-[#4F6FFE] transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-[#4F6FFE] transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#4F6FFE] transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#4F6FFE] transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-800 py-6 text-center text-neutral-400 text-sm">
        <p>© 2025 MedAlert. All rights reserved.</p>
        <p className="mt-2">
          Made by <span className="font-semibold">Aarya • Samrat • Rohit • Sweekar • Shubhas • Abhishek</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
