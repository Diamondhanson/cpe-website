"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

export default function Layout({ children, isHomePage = false }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header isHomePage={isHomePage} />
      {children}
      <Footer />
    </div>
  );
} 