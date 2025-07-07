'use client';

import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { state, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-4 top-16 w-96 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-hidden border">
        <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h3 className="text-lg font-bold">
            Carrinho ({state.count} {state.count === 1 ? 'item' : 'itens'})
          </h3>
        </div>

        {state.items.length === 0 ? (
          <div className="p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
            <Link 
              href="/catalogo"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              onClick={onClose}
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {state.items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs">
                        <p className="text-blue-600 font-bold">
                          {formatPrice(item.product.price).formattedCredit}
                        </p>
                        <p className="text-green-600 font-semibold">
                          {formatPrice(item.product.price).formattedReal}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">Total:</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {formatPrice(state.total).formattedCredit}
                  </div>
                  <div className="text-base font-semibold text-green-600">
                    {formatPrice(state.total).formattedReal}
                  </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="w-full block text-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
                onClick={onClose}
              >
                Finalizar Pedido
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
} 