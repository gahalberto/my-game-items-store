'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartDropdown from '@/components/cart/CartDropdown';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <header className="bg-blue-600 text-white shadow-xl relative z-50 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity py-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-blue-800 font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Habbo Store</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="text-white hover:text-yellow-300 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                Início
              </Link>
              <Link 
                href="/catalogo" 
                className="text-white hover:text-yellow-300 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                Catálogo
              </Link>
              <Link 
                href="/sobre" 
                className="text-white hover:text-yellow-300 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                Sobre
              </Link>
            </nav>

            {/* Right Side - Cart and User */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-3 hover:bg-blue-700 rounded-lg transition-colors text-white flex items-center justify-center"
                aria-label="Carrinho de compras"
              >
                <ShoppingCart className="w-6 h-6" />
                {state.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {state.count}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <Link 
                href="/admin" 
                className="p-3 hover:bg-blue-700 rounded-lg transition-colors text-white hidden sm:flex items-center justify-center"
                aria-label="Área do usuário"
              >
                <User className="w-6 h-6" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-3 hover:bg-blue-700 rounded-lg transition-colors text-white flex items-center justify-center"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-blue-500 bg-blue-600">
              <nav className="py-4 space-y-2">
                <Link
                  href="/"
                  className="block py-3 px-4 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors font-medium rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  href="/catalogo"
                  className="block py-3 px-4 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors font-medium rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catálogo
                </Link>
                <Link
                  href="/sobre"
                  className="block py-3 px-4 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors font-medium rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link
                  href="/admin"
                  className="block py-3 px-4 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors font-medium rounded-lg mx-2 sm:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Área do Usuário
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <CartDropdown 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      )}
    </>
  );
} 