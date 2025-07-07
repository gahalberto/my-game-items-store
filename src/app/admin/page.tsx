'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Plus, BarChart3, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Buscar estatísticas básicas
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders')
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      if (productsData.success && ordersData.success) {
        setStats({
          totalProducts: productsData.data.pagination?.total || 0,
          totalOrders: ordersData.data.length || 0,
          totalUsers: 1, // Placeholder
          revenue: ordersData.data.reduce((sum: number, order: any) => sum + order.total, 0) || 0
        });
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gerencie seus produtos e vendas da Habbo Store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : `${stats.revenue} créditos`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerenciar Produtos</h3>
            <p className="text-gray-600 mb-4">
              Adicione novos mobis, edite produtos existentes ou gerencie o estoque.
            </p>
            <div className="flex space-x-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/produtos/novo" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Produto
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/produtos" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Ver Todos
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos</h3>
            <p className="text-gray-600 mb-4">
              Visualize e gerencie todos os pedidos dos clientes.
            </p>
            <div className="flex space-x-3">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/admin/pedidos" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Ver Pedidos
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/relatorios" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Relatórios
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Bem-vindo ao Painel Admin!</h3>
          <p className="text-blue-800">
            Aqui você pode gerenciar todos os aspectos da sua loja Habbo Store. Use os links acima para:
          </p>
          <ul className="list-disc list-inside text-blue-800 mt-2 space-y-1">
            <li>Adicionar novos mobis ao catálogo</li>
            <li>Editar produtos existentes</li>
            <li>Gerenciar estoque e preços</li>
            <li>Visualizar pedidos dos clientes</li>
            <li>Acompanhar suas vendas</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 