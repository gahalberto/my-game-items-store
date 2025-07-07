'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const priceInfo = formatPrice(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div 
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 transform hover:-translate-y-3 w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produto/${product.id}`}>
        <div className="relative">
          {/* Badge de Destaque */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold z-10 shadow-xl flex items-center gap-2">
              <Star className="w-4 h-4" />
              DESTAQUE
            </div>
          )}

          {/* Badge de Estoque */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-xl">
              Últimas {product.stock}!
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-xl">
              ESGOTADO
            </div>
          )}

          {/* Imagem do Produto */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className={`max-w-full max-h-full object-contain transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Overlay com botão de favorito */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <button className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 transform hover:scale-110">
                <Heart className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo do Card */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-base text-gray-600 mb-6 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-blue-600">
                {priceInfo.formattedCredit}
              </span>
              <span className="text-lg font-semibold text-green-600">
                {priceInfo.formattedReal}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105 ${
                product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green-200'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">
                {product.stock === 0 ? 'Esgotado' : 'Comprar'}
              </span>
            </button>
          </div>

          {/* Indicador de Estoque */}
          {product.stock > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span className="font-medium">Estoque disponível</span>
                <span className="font-bold">{product.stock} unidades</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    product.stock > 10 
                      ? 'bg-gradient-to-r from-green-400 to-green-500' 
                      : product.stock > 5 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                        : 'bg-gradient-to-r from-red-400 to-pink-500'
                  }`}
                  style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
} 