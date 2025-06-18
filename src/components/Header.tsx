"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'backdrop-blur-md bg-white/60 border-b border-gray-200/50 shadow-lg' 
        : 'backdrop-blur-none bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/"
            className={`text-lg font-medium tracking-wide luxury-heading transition-colors duration-500 hover:opacity-80 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            LOGO HERE
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`nav-link transition-colors duration-500 ${
                  pathname === item.href 
                    ? (isScrolled ? 'text-blue-600' : 'text-amber-300') 
                    : (isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-amber-300')
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-500 ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`py-4 space-y-1 ${
            isScrolled ? 'bg-white/95' : 'bg-black/80'
          } backdrop-blur-md rounded-lg mt-2`}>
            {navigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? (isScrolled ? 'text-blue-600 bg-blue-50' : 'text-amber-300 bg-white/20')
                    : (isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                        : 'text-white hover:text-amber-300 hover:bg-white/10')
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 