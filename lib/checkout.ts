import { z } from 'zod';

export const CheckoutSchema = z.object({
  name: z.string().min(2, 'نام را کامل وارد کنید'),
  email: z.string().email('ایمیل نامعتبر است'),
  address: z.string().min(8, 'آدرس خیلی کوتاه است'),
  note: z.string().max(500).optional().or(z.literal('')),
});
export type CheckoutInput = z.infer<typeof CheckoutSchema>;
