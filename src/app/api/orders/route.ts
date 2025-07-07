import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};
    
    if (status) {
      where.status = status;
    }

    // Buscar pedidos
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
          user: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userName, userEmail, items, total } = body;

    // Validação básica
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Items do pedido são obrigatórios' },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { success: false, error: 'Total do pedido deve ser maior que zero' },
        { status: 400 }
      );
    }

    // Verificar se todos os produtos existem e têm estoque
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { success: false, error: 'Alguns produtos não foram encontrados' },
        { status: 400 }
      );
    }

    // Verificar estoque
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Produto ${item.productId} não encontrado` },
          { status: 400 }
        );
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Estoque insuficiente para ${product.name}` },
          { status: 400 }
        );
      }
    }

    // Criar pedido e itens em uma transação
    const order = await prisma.$transaction(async (tx) => {
      // Criar o pedido
      const newOrder = await tx.order.create({
        data: {
          userId,
          userName,
          userEmail,
          total,
          status: 'PENDING',
        },
      });

      // Criar os itens do pedido
      await tx.orderItem.createMany({
        data: items.map((item: any) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // Atualizar estoque dos produtos
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    // Buscar o pedido criado com os itens
    const createdOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: createdOrder,
      message: 'Pedido criado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 