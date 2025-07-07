import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Sofá Habbo Clássico',
    description: 'O sofá mais icônico do Habbo Hotel, perfeito para receber amigos no seu quarto.',
    price: 50,
    image: 'https://images.habbo.com/c_images/catalogue/icon_70.png',
    stock: 15,
    category: 'Móveis',
    featured: true,
  },
  {
    name: 'Mesa de Centro Premium',
    description: 'Mesa elegante para decorar seu quarto com estilo e sofisticação.',
    price: 35,
    image: 'https://images.habbo.com/c_images/catalogue/icon_71.png',
    stock: 8,
    category: 'Móveis',
    featured: true,
  },
  {
    name: 'Poltrona Relax',
    description: 'Poltrona confortável para momentos de descanso e relaxamento.',
    price: 40,
    image: 'https://images.habbo.com/c_images/catalogue/icon_72.png',
    stock: 3,
    category: 'Móveis',
    featured: true,
  },
  {
    name: 'Abajur Vintage',
    description: 'Iluminação perfeita para criar o ambiente ideal no seu quarto.',
    price: 25,
    image: 'https://images.habbo.com/c_images/catalogue/icon_73.png',
    stock: 12,
    category: 'Decoração',
    featured: true,
  },
  {
    name: 'Estante de Livros',
    description: 'Organize seus livros com estilo nesta estante moderna.',
    price: 60,
    image: 'https://images.habbo.com/c_images/catalogue/icon_74.png',
    stock: 5,
    category: 'Móveis',
    featured: false,
  },
  {
    name: 'Planta Tropical',
    description: 'Traga vida para seu quarto com esta bela planta tropical.',
    price: 20,
    image: 'https://images.habbo.com/c_images/catalogue/icon_75.png',
    stock: 20,
    category: 'Decoração',
    featured: false,
  },
  {
    name: 'Quadro Artístico',
    description: 'Obra de arte única para decorar suas paredes.',
    price: 30,
    image: 'https://images.habbo.com/c_images/catalogue/icon_76.png',
    stock: 10,
    category: 'Decoração',
    featured: false,
  },
  {
    name: 'Cama King Size',
    description: 'Cama luxuosa para um descanso dos sonhos.',
    price: 80,
    image: 'https://images.habbo.com/c_images/catalogue/icon_77.png',
    stock: 4,
    category: 'Móveis',
    featured: false,
  },
  {
    name: 'Televisão HD',
    description: 'TV de última geração para entretenimento no seu quarto.',
    price: 120,
    image: 'https://images.habbo.com/c_images/catalogue/icon_78.png',
    stock: 6,
    category: 'Eletrônicos',
    featured: false,
  },
  {
    name: 'Tapete Persa',
    description: 'Tapete elegante que dará um toque especial ao seu quarto.',
    price: 45,
    image: 'https://images.habbo.com/c_images/catalogue/icon_79.png',
    stock: 8,
    category: 'Decoração',
    featured: false,
  },
  {
    name: 'Mesa de Jantar',
    description: 'Mesa grande perfeita para receber amigos para jantar.',
    price: 90,
    image: 'https://images.habbo.com/c_images/catalogue/icon_80.png',
    stock: 3,
    category: 'Móveis',
    featured: false,
  },
  {
    name: 'Luminária de Pé',
    description: 'Iluminação moderna e funcional para qualquer ambiente.',
    price: 35,
    image: 'https://images.habbo.com/c_images/catalogue/icon_81.png',
    stock: 15,
    category: 'Decoração',
    featured: false,
  },
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Dados existentes removidos');

  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@habbostore.com',
      name: 'Administrador',
      isAdmin: true,
    },
  });

  console.log('👤 Usuário admin criado');

  // Criar produtos
  for (const productData of sampleProducts) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log(`📦 ${sampleProducts.length} produtos criados`);

  // Criar alguns pedidos de exemplo
  const sampleOrder = await prisma.order.create({
    data: {
      userId: adminUser.id,
      userName: adminUser.name,
      userEmail: adminUser.email,
      total: 125,
      status: 'COMPLETED',
    },
  });

  // Adicionar itens ao pedido
  const products = await prisma.product.findMany({ take: 3 });
  
  await prisma.orderItem.createMany({
    data: [
      {
        orderId: sampleOrder.id,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price,
      },
      {
        orderId: sampleOrder.id,
        productId: products[1].id,
        quantity: 2,
        price: products[1].price,
      },
    ],
  });

  console.log('🛒 Pedidos de exemplo criados');

  console.log('✅ Seed concluído com sucesso!');
  console.log(`
📊 Resumo:
- 1 usuário admin criado
- ${sampleProducts.length} produtos criados
- 1 pedido de exemplo criado
- Login admin: admin@habbostore.com
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 