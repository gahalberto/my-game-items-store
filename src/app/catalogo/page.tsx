'use client';

import { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  stock: number;
  category?: string;
  featured?: boolean;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Móveis', 'Decoração', 'Eletrônicos'];

  const fetchProducts = async (page = 1, search = searchTerm, category = selectedCategory) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data.products);
        setPagination(data.data.pagination);
      } else {
        console.error('Erro ao buscar produtos:', data.error);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1, searchTerm, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProducts(1, searchTerm, category);
  };

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, searchTerm, selectedCategory);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    fetchProducts(1, '', '');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-habbo">
            Catálogo de Mobis
          </h1>
          <p className="text-xl text-gray-600 font-habbo">
            Encontre os melhores mobis para decorar seu quarto no Habbo Origins
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-pixel p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Busca */}
            <div className="md:col-span-2">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Buscar mobis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-habbo-blue-500 font-habbo"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-habbo-blue-500 text-white rounded-r-lg hover:bg-habbo-blue-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Categoria */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habbo-blue-500 font-habbo"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Controles */}
            <div className="flex space-x-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-habbo"
              >
                Limpar
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-habbo-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-habbo-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600 font-habbo">
            {loading
              ? 'Carregando...'
              : `${pagination.total} ${pagination.total === 1 ? 'produto encontrado' : 'produtos encontrados'}`
            }
          </p>
        </div>

        {/* Grid de Produtos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-pixel p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-habbo">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-4 font-habbo">
              Tente ajustar os filtros ou fazer uma nova busca.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-habbo-blue-500 text-white rounded-lg hover:bg-habbo-blue-600 transition-colors font-habbo"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className={`px-4 py-2 rounded-lg font-habbo ${
                  pagination.hasPrev
                    ? 'bg-white text-habbo-blue-600 border border-habbo-blue-300 hover:bg-habbo-blue-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Anterior
              </button>

              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i;
                if (pageNum > pagination.totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg font-habbo ${
                      pageNum === pagination.page
                        ? 'bg-habbo-blue-500 text-white'
                        : 'bg-white text-habbo-blue-600 border border-habbo-blue-300 hover:bg-habbo-blue-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className={`px-4 py-2 rounded-lg font-habbo ${
                  pagination.hasNext
                    ? 'bg-white text-habbo-blue-600 border border-habbo-blue-300 hover:bg-habbo-blue-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 