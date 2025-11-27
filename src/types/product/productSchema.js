import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),

    price: z.coerce
        .number()
        .min(0.01, "O preço deve ser maior que zero"),

    category: z.string().min(1, "Selecione uma categoria"),

    stock: z.coerce
        .number()
        .int("O estoque deve ser um número inteiro")
        .min(0, "Estoque não pode ser negativo")
        .default(0),

    sizes: z.string().optional(),
    colors: z.string().optional(),
});