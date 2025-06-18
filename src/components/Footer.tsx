"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', desc: 'Our Story', href: '/about' },
    { name: 'Services', desc: 'What We Do', href: '/services' },
    { name: 'Portfolio', desc: 'Our Work', href: '/portfolio' },
    { name: 'Process', desc: 'How We Work', href: '#' },
    { name: 'Contact', desc: 'Get In Touch', href: '/contact' }
  ];



  return (
    <footer className="relative py-20 gradient-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-amber-300/20 rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-blue-400/20 -rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 border border-white/10 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-5">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h3 className="luxury-heading text-3xl font-normal text-white mb-4 tracking-wide">
                CAMEROON PHASE OF ENTERTAINMENT
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-400 mb-6"></div>
              <p className="text-gray-300 leading-relaxed font-normal text-lg mb-6">
                Creating exceptional visual content that transcends expectations and connects 
                with audiences through the power of cinematic storytelling.
              </p>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-medium">
                Follow Our Journey
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/cpe-entertainment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/cpe-entertainment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/cpe-entertainment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/cpe-entertainment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-6 font-medium flex items-center">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group block text-gray-300 hover:text-white transition-all duration-300 font-normal"
                  >
                    <span className="text-base group-hover:text-amber-300 transition-colors duration-300">
                      {link.name}
                    </span>
                    {/* <span className="block text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      {link.desc}
                    </span> */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-6 font-medium flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Get In Touch
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <span className="text-amber-400 group-hover:scale-110 transition-transform duration-300">📧</span>
                <span className="font-normal">hello@cameroonphase.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">📞</span>
                <span className="font-normal">+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <span className="text-green-400 group-hover:scale-110 transition-transform duration-300">📍</span>
                <span className="font-normal">Douala, Cameroon</span>
              </div>
            </div>

            
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-1">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-normal mb-4 md:mb-0">
              © 2024 Cameroon Phase of Entertainment. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 