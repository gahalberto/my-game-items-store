'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, User, Mail, MessageCircle, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  nickname: string;
  paymentMethod: 'pix' | 'card' | 'transfer';
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    nickname: '',
    paymentMethod: 'pix',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Redirecionar se carrinho vazio
  if (state.items.length === 0 && !orderCreated) {
    router.push('/catalogo');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname do Habbo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);

    try {
      // Calcular desconto PIX
      const discount = formData.paymentMethod === 'pix' ? 0.05 : 0;
      const finalTotal = Math.round(state.total * (1 - discount));

      // Preparar dados do pedido
      const orderData = {
        userName: formData.name,
        userEmail: formData.email,
        items: state.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: finalTotal,
      };

      // Criar pedido
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.data.id);
        setOrderCreated(true);
        clearCart();
        toast.success('Pedido criado com sucesso!');
      } else {
        throw new Error(data.error || 'Erro ao criar pedido');
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-pixel p-8 text-center">
              <div className="w-20 h-20 bg-habbo-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-habbo-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-habbo">
                Pedido Confirmado!
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 font-habbo">
                Seu pedido #{orderId.slice(-8)} foi criado com sucesso!
              </p>
              
              <div className="bg-habbo-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-habbo-blue-800 mb-3 font-habbo">
                  Próximos Passos:
                </h3>
                <div className="text-left space-y-2 text-habbo-blue-700 font-habbo">
                  <p>1. Entre em contato conosco via WhatsApp ou Discord</p>
                  <p>2. Informe o número do seu pedido</p>
                  <p>3. Realize o pagamento</p>
                  <p>4. Receba seus mobis no jogo!</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href={`https://wa.me/5511999999999?text=Olá! Gostaria de finalizar o pedido %23${orderId.slice(-8)} - ${formData.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-habbo font-bold"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://discord.gg/habbo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 py-3 px-6 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-habbo font-bold"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Discord</span>
                </a>
              </div>

              <button
                onClick={() => router.push('/catalogo')}
                className="px-6 py-2 text-habbo-blue-600 hover:text-habbo-blue-800 font-habbo"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const discount = formData.paymentMethod === 'pix' ? 0.05 : 0;
  const finalTotal = Math.round(state.total * (1 - discount));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center font-habbo">
            Finalizar Pedido
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="bg-white rounded-lg shadow-pixel p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-habbo">
                Dados do Pedido
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-habbo">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 font-habbo ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-habbo-blue-500'
                      }`}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 font-habbo">{errors.name}</p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-habbo">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 font-habbo ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-habbo-blue-500'
                      }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-habbo">{errors.email}</p>
                  )}
                </div>

                {/* Nickname */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-habbo">
                    Nickname no Habbo *
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 font-habbo ${
                      errors.nickname
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-habbo-blue-500'
                    }`}
                    placeholder="SeuNickname"
                  />
                  {errors.nickname && (
                    <p className="text-red-500 text-sm mt-1 font-habbo">{errors.nickname}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1 font-habbo">
                    Nickname para entrega dos mobis no jogo
                  </p>
                </div>

                {/* Método de Pagamento */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 font-habbo">
                    Método de Pagamento
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pix"
                        checked={formData.paymentMethod === 'pix'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-green-600" />
                      <div className="flex-1">
                        <div className="font-bold font-habbo">PIX</div>
                        <div className="text-sm text-green-600 font-habbo">5% de desconto</div>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-bold font-habbo">Cartão de Crédito/Débito</div>
                        <div className="text-sm text-gray-500 font-habbo">Visa, Mastercard, Elo</div>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-purple-600" />
                      <div className="flex-1">
                        <div className="font-bold font-habbo">Transferência Bancária</div>
                        <div className="text-sm text-gray-500 font-habbo">TED/DOC</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-habbo-green-500 text-white rounded-lg font-bold text-lg hover:bg-habbo-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-habbo"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    'Confirmar Pedido'
                  )}
                </button>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white rounded-lg shadow-pixel p-6 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-habbo">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 py-3 border-b border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 font-habbo">{item.product.name}</h4>
                      <div className="text-sm text-gray-600 font-habbo">
                        <p>{item.quantity}x {formatPrice(item.product.price).formattedCredit}</p>
                        <p className="text-green-600 font-semibold">{item.quantity}x {formatPrice(item.product.price).formattedReal}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-habbo-blue-600">
                        {formatPrice(item.quantity * item.product.price).formattedCredit}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {formatPrice(item.quantity * item.product.price).formattedReal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-habbo">Subtotal:</span>
                  <div className="text-right">
                    <div className="font-habbo">{formatPrice(state.total).formattedCredit}</div>
                    <div className="text-sm text-green-600 font-semibold">{formatPrice(state.total).formattedReal}</div>
                  </div>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-habbo">Desconto PIX (5%):</span>
                    <div className="text-right">
                      <div className="font-habbo">-{formatPrice(Math.round(state.total * discount)).formattedCredit}</div>
                      <div className="text-sm font-semibold">-{formatPrice(Math.round(state.total * discount)).formattedReal}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3">
                  <span className="font-habbo">Total:</span>
                  <div className="text-right">
                    <div className="text-habbo-blue-600 font-habbo">{formatPrice(finalTotal).formattedCredit}</div>
                    <div className="text-lg font-bold text-green-600">{formatPrice(finalTotal).formattedReal}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-habbo-blue-50 rounded-lg">
                <h4 className="font-bold text-habbo-blue-800 mb-2 font-habbo">
                  Informações Importantes:
                </h4>
                <ul className="text-sm text-habbo-blue-700 space-y-1 font-habbo">
                  <li>• Entrega imediata após confirmação do pagamento</li>
                  <li>• Entre em contato via WhatsApp ou Discord</li>
                  <li>• Mobis serão entregues no seu inventário</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 