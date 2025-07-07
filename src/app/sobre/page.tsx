import { Heart, Shield, Zap, Users, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-habbo-blue-600 to-habbo-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-habbo">Sobre a Habbo Store</h1>
            <p className="text-xl opacity-90 font-habbo">
              A loja oficial de mobis para o Habbo Origins. 
              Transforme seu quarto em um verdadeiro lar!
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-habbo">Nossa Missão</h2>
              <p className="text-xl text-gray-600 font-habbo">
                Proporcionar a melhor experiência de decoração no Habbo Origins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-habbo">
                  Por que escolher a Habbo Store?
                </h3>
                <p className="text-gray-600 mb-6 font-habbo">
                  Somos apaixonados pelo universo Habbo e entendemos a importância de ter 
                  um quarto único e personalizado. Nossa loja oferece os melhores mobis 
                  com qualidade garantida e entrega imediata no jogo.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-habbo-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-habbo-green-600" />
                    </div>
                    <span className="font-habbo text-gray-800">Compra 100% segura</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-habbo-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-habbo-blue-600" />
                    </div>
                    <span className="font-habbo text-gray-800">Entrega imediata no jogo</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-habbo-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-habbo-purple-600" />
                    </div>
                    <span className="font-habbo text-gray-800">Atendimento personalizado</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-habbo-blue-100 to-habbo-purple-100 rounded-lg p-8 text-center">
                  <div className="w-20 h-20 bg-habbo-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-10 h-10 text-habbo-blue-800" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 font-habbo">500+</h4>
                  <p className="text-gray-600 font-habbo">Mobis vendidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-habbo">Como Funciona</h2>
              <p className="text-xl text-gray-600 font-habbo">
                Processo simples e rápido para ter seus mobis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-habbo-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-habbo">Escolha seus Mobis</h3>
                <p className="text-gray-600 font-habbo">
                  Navegue pelo nosso catálogo e adicione os mobis que desejar ao carrinho.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-habbo-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-habbo">Finalize o Pedido</h3>
                <p className="text-gray-600 font-habbo">
                  Informe seus dados e confirme a compra. Aceitamos diversos métodos de pagamento.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-habbo-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-habbo">Receba no Jogo</h3>
                <p className="text-gray-600 font-habbo">
                  Após a confirmação do pagamento, os mobis são entregues imediatamente no seu quarto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regras e Políticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center font-habbo">
              Regras e Políticas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-habbo">
                  Política de Entrega
                </h3>
                <ul className="space-y-2 text-gray-600 font-habbo">
                  <li>• Entrega imediata após confirmação do pagamento</li>
                  <li>• Mobis são adicionados diretamente ao seu inventário</li>
                  <li>• Horário de entrega: 24/7</li>
                  <li>• Suporte via WhatsApp ou Discord</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-habbo">
                  Termos de Uso
                </h3>
                <ul className="space-y-2 text-gray-600 font-habbo">
                  <li>• Apenas para uso no Habbo Origins</li>
                  <li>• Não fazemos reembolsos após entrega</li>
                  <li>• Problemas técnicos são resolvidos em até 24h</li>
                  <li>• Respeite as regras do Habbo Hotel</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-habbo">
                  Formas de Pagamento
                </h3>
                <ul className="space-y-2 text-gray-600 font-habbo">
                  <li>• PIX (desconto de 5%)</li>
                  <li>• Cartão de crédito/débito</li>
                  <li>• PagSeguro/Mercado Pago</li>
                  <li>• Transferência bancária</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-habbo">
                  Garantias
                </h3>
                <ul className="space-y-2 text-gray-600 font-habbo">
                  <li>• Mobis originais do Habbo</li>
                  <li>• Entrega garantida ou reembolso total</li>
                  <li>• Suporte técnico especializado</li>
                  <li>• Satisfação do cliente em primeiro lugar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-gradient-to-r from-habbo-blue-500 to-habbo-purple-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 font-habbo">Entre em Contato</h2>
            <p className="text-xl opacity-90 mb-8 font-habbo">
              Tem dúvidas? Nossa equipe está pronta para ajudar!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os mobis da Habbo Store."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 py-4 px-6 bg-green-500 hover:bg-green-600 rounded-lg transition-colors font-habbo font-bold"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://discord.gg/habbo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 py-4 px-6 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors font-habbo font-bold"
              >
                <Users className="w-6 h-6" />
                <span>Discord</span>
              </a>
            </div>

            <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-bold mb-4 font-habbo">Horário de Atendimento</h3>
              <p className="font-habbo">Segunda a Domingo: 08h às 22h</p>
              <p className="font-habbo text-sm opacity-75 mt-2">
                Entregas automáticas funcionam 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-habbo">
              Pronto para Decorar seu Quarto?
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-habbo">
              Explore nosso catálogo e encontre os mobis perfeitos para você!
            </p>
            
            <Link
              href="/catalogo"
              className="inline-flex items-center px-8 py-4 bg-habbo-blue-600 text-white rounded-lg font-bold text-lg hover:bg-habbo-blue-700 transition-all duration-300 shadow-pixel hover:shadow-pixel-lg active:scale-95 font-habbo"
            >
              <Star className="w-6 h-6 mr-2" />
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 