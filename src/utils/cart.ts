import { CartItem } from '../types';

export const FREE_SHIPPING_THRESHOLD = 2000000; // 2,000,000 Tomans
export const STANDARD_SHIPPING_FEE = 49000; // 49,000 Tomans

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
}

export const VALID_COUPONS: Record<string, Coupon> = {
  'RADBEAUTY': { code: 'RADBEAUTY', discountPercentage: 10, description: '۱۰٪ تخفیف خرید اول' },
  'NOWRUZ': { code: 'NOWRUZ', discountPercentage: 15, description: '۱۵٪ جشنواره ویژه' },
  'VIP': { code: 'VIP', discountPercentage: 20, description: '۲۰٪ تخفیف اعضای باشگاه مشتریان' },
};

export interface CartCalculationResult {
  subtotal: number;
  totalSavings: number;
  couponDiscount: number;
  shippingFee: number;
  isFreeShipping: boolean;
  freeShippingProgress: number; // 0 to 100
  amountNeededForFreeShipping: number;
  finalTotal: number;
  totalItemCount: number;
}

export function calculateCartTotals(
  items: CartItem[],
  couponCode?: string | null
): CartCalculationResult {
  let subtotal = 0;
  let totalSavings = 0;
  let totalItemCount = 0;

  for (const item of items) {
    const itemSubtotal = item.product.price * item.quantity;
    subtotal += itemSubtotal;
    totalItemCount += item.quantity;

    if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
      totalSavings += (item.product.originalPrice - item.product.price) * item.quantity;
    }
  }

  // Coupon discount
  let couponDiscount = 0;
  if (couponCode) {
    const normalizedCode = couponCode.trim().toUpperCase();
    const coupon = VALID_COUPONS[normalizedCode];
    if (coupon) {
      couponDiscount = Math.round((subtotal * coupon.discountPercentage) / 100);
    }
  }

  // Free shipping check
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = (items.length === 0 || isFreeShipping) ? 0 : STANDARD_SHIPPING_FEE;
  
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  return {
    subtotal,
    totalSavings,
    couponDiscount,
    shippingFee,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    finalTotal,
    totalItemCount,
  };
}

export function calculateDiscountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
