import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar preço em créditos e reais
export function formatPrice(credits: number): { credits: number; reais: string; formattedCredit: string; formattedReal: string } {
  const reaisValue = credits * 0.18;
  
  return {
    credits,
    reais: reaisValue.toFixed(2),
    formattedCredit: `${credits} créditos`,
    formattedReal: `R$ ${reaisValue.toFixed(2).replace('.', ',')}`
  };
}
