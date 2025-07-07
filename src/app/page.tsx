'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, TrendingUp, Users, ShoppingBag, MessageCircle, Crown, Sparkles, Zap } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import DiscordModal from '@/components/ui/DiscordModal';

// Dados de exemplo para demonstração
const featuredProducts = [
  {
    id: '1',
    name: 'Sofá Habbo Clássico',
    description: 'O sofá mais icônico do Habbo Hotel, perfeito para receber amigos.',
    price: 50,
    image: 'https://images.habbo.com/c_images/catalogue/icon_70.png',
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Mesa de Centro Premium',
    description: 'Mesa elegante para decorar seu quarto com estilo.',
    price: 35,
    image: 'https://images.habbo.com/c_images/catalogue/icon_71.png',
    stock: 8,
    featured: true,
  },
  {
    id: '3',
    name: 'Poltrona Relax',
    description: 'Poltrona confortável para momentos de descanso.',
    price: 40,
    image: 'https://images.habbo.com/c_images/catalogue/icon_72.png',
    stock: 3,
    featured: true,
  },
  {
    id: '4',
    name: 'Abajur Vintage',
    description: 'Iluminação perfeita para criar o ambiente ideal.',
    price: 25,
    image: 'https://images.habbo.com/c_images/catalogue/icon_73.png',
    stock: 12,
    featured: true,
  },
];

export default function HomePage() {
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center flex flex-col items-center justify-center">
            {/* Logo animado */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-yellow-400 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Crown className="w-16 h-16 text-blue-800" />
                </div>
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Título principal */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                Minha Lojinha no Origins
              </span>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-10 text-blue-100 font-light max-w-5xl mx-auto leading-relaxed">
              Olá, me chamo <span className="font-bold">José</span> e sou o dono desses mobis abaixo.
            </p>
            
            {/* Descrição */}
            <p className="text-xl mb-16 text-blue-200 max-w-3xl mx-auto leading-relaxed px-4">
              Joguei muito no Habbo Hotel Origins mas por conta de alguns rumos da vida, não tenho mais tempo para jogar.
              Então resolvi vender os mobis que eu tenho. Muitas pessoas me conhecem, nao estou aqui para lucrar e sim recuperar o que investi.
              Voce pode encontrar os mobis aqui e me chamar no discord ou whatsapp.
              Veja os testemunhos para quem já vendi!
            </p>
            
            {/* Botões CTA */}
            <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="group relative !px-12 !py-6 bg-yellow-400 text-blue-900 rounded-2xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl !h-auto"
              >
                <Link href="/catalogo" className="flex items-center gap-4">
                  <ShoppingBag className="w-7 h-7" />
                  Ver Catálogo
                  <Zap className="w-6 h-6 group-hover:animate-pulse" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="!px-12 !py-6 bg-transparent border-3 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl !h-auto"
              >
                <Link href="/sobre">
                  Saiba Mais
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossos Números
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Confira o sucesso da nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-3">500+</div>
              <div className="text-gray-600 font-medium text-lg">Mobis Vendidos</div>
            </div>
            
            <div className="text-center group flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl font-bold text-green-600 mb-3">150+</div>
              <div className="text-gray-600 font-medium text-lg">Clientes Felizes</div>
            </div>
            
            <div className="text-center group flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Star className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl font-bold text-yellow-600 mb-3">4.9</div>
              <div className="text-gray-600 font-medium text-lg">Avaliação</div>
            </div>
            
            <div className="text-center group flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <ShoppingBag className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-3">100+</div>
              <div className="text-gray-600 font-medium text-lg">Produtos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Produtos em Destaque
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Os mobis mais populares da nossa loja
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center flex justify-center">
            <Button
              asChild
              size="lg"
              className="!px-14 !py-8 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl !h-auto"
            >
              <Link href="/catalogo" className="flex items-center gap-4">
                Ver Todos os Produtos
                <Star className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Pronto para Decorar seu Quarto?
          </h2>
          <p className="text-2xl mb-16 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Junte-se a centenas de Habbos que já transformaram seus quartos!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="!px-14 !py-8 bg-green-500 text-white rounded-2xl font-bold text-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl !h-auto"
            >
              <a
                href="https://wa.me/5511994917885?text=Olá! Gostaria de saber mais sobre os mobis da Habbo Store."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <MessageCircle className="w-6 h-6" />
                Chamar no WhatsApp
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="!px-14 !py-8 bg-transparent border-3 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 !h-auto"
              onClick={() => setIsDiscordModalOpen(true)}
            >
              <MessageCircle className="w-6 h-6" />
              Chamar no Discord
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          asChild
          size="icon"
          className="w-20 h-20 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce !p-5"
        >
          <a
            href="https://wa.me/5511994917885?text=Olá! Gostaria de saber mais sobre os mobis da Habbo Store."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <MessageCircle className="w-10 h-10" />
          </a>
        </Button>
      </div>

      {/* Discord Modal */}
      <DiscordModal 
        isOpen={isDiscordModalOpen} 
        onClose={() => setIsDiscordModalOpen(false)} 
      />
    </div>
  );
} 