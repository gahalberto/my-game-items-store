'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/ui/ImageUpload';

interface ProductForm {
  name: string;
  description: string;
  price: number | '';
  image: string;
  stock: number | '';
  category: string;
  featured: boolean;
}

export default function NovoProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: 'Móveis',
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Móveis', 'Decoração', 'Eletrônicos', 'Roupas', 'Raros', 'Limitados'];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que 0';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Imagem é obrigatória - faça upload de uma imagem';
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Estoque deve ser 0 ou maior';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Produto criado com sucesso!');
        router.push('/admin/produtos');
      } else {
        throw new Error(data.error || 'Erro ao criar produto');
      }
    } catch (error: any) {
      console.error('Erro ao criar produto:', error);
      toast.error(error.message || 'Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProductForm, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUploaded = (url: string) => {
    console.log('Callback recebido - URL:', url);
    handleInputChange('image', url);
  };

  const handleImageRemoved = () => {
    handleInputChange('image', '');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar ao Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Adicionar Novo Produto</h1>
          <p className="text-gray-600 mt-2">Preencha as informações do novo mobi para sua loja</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Ex: Sofá Habbo Clássico"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva o produto..."
              />
            </div>

            {/* Preço e Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preço (créditos) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || '')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="50"
                  min="1"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estoque *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || '')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stock
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="10"
                  min="0"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Upload de Imagem */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imagem do Produto *
              </label>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                currentImage={formData.image}
                onImageRemoved={handleImageRemoved}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Produto em Destaque */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Produto em Destaque (aparece na página inicial)
              </label>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Criando...
                  </div>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Produto
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin')}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>

        {/* Dicas */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 Dicas para adicionar produtos:</h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Faça upload de imagens de alta qualidade (JPG, PNG, GIF)</li>
            <li>Use imagens do catálogo oficial do Habbo para melhor qualidade</li>
            <li>Defina preços justos baseados na raridade do item</li>
            <li>Escreva descrições claras e atrativas</li>
            <li>Marque como &quot;Destaque&quot; apenas produtos especiais</li>
            <li>Mantenha o estoque atualizado para evitar vendas em excesso</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 