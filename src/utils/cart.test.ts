import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, calculateDiscountPercent, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from './cart';
import { toPersianDigits, formatPrice } from './formatters';
import { Product, CartItem } from '../types';

const sampleProductA: Product = {
  id: 'prod-1',
  name: 'اسکراب نمک بدن وکالی',
  category: 'body',
  categoryLabel: 'مراقبت بدن',
  brand: 'وکالی',
  price: 780000,
  originalPrice: 920000,
  rating: 4.8,
  reviewCount: 42,
  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03',
  volume: '380 گرم',
  shortDesc: 'اسکراب طبیعی حاوی نمک دریای مرده',
  features: ['لایه‌بردار', 'مرطوب‌کننده'],
  inStock: true,
};

const sampleProductB: Product = {
  id: 'prod-2',
  name: 'بالم مالشی فابرلیک',
  category: 'body',
  categoryLabel: 'مراقبت بدن',
  brand: 'فابرلیک',
  price: 1300000,
  rating: 4.9,
  reviewCount: 67,
  image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
  volume: '75 میلی‌لیتر',
  shortDesc: 'بالم تسکین‌دهنده ارگانیک',
  features: ['تسکین‌دهنده'],
  inStock: true,
};

test('toPersianDigits converts ASCII numbers to Persian numerals', () => {
  assert.equal(toPersianDigits(1234567890), '۱۲۳۴۵۶۷۸۹۰');
  assert.equal(toPersianDigits('2,000,000'), '۲,۰۰۰,۰۰۰');
});

test('formatPrice formats with commas and تومان label', () => {
  assert.equal(formatPrice(1200000), '۱,۲۰۰,۰۰۰ تومان');
  assert.equal(formatPrice(780000, false), '780,000 تومان');
});

test('calculateDiscountPercent calculates correct discount percentage', () => {
  const discount = calculateDiscountPercent(780000, 1000000);
  assert.equal(discount, 22);
  assert.equal(calculateDiscountPercent(500, 500), 0);
  assert.equal(calculateDiscountPercent(600, 500), 0);
});

test('calculateCartTotals calculates empty cart correctly', () => {
  const result = calculateCartTotals([]);
  assert.equal(result.subtotal, 0);
  assert.equal(result.totalItemCount, 0);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.finalTotal, 0);
  assert.equal(result.isFreeShipping, true);
});

test('calculateCartTotals applies standard shipping when under 2,000,000 threshold', () => {
  const items: CartItem[] = [{ product: sampleProductA, quantity: 1 }]; // 780,000
  const result = calculateCartTotals(items);
  
  assert.equal(result.subtotal, 780000);
  assert.equal(result.totalSavings, 140000); // 920000 - 780000
  assert.equal(result.isFreeShipping, false);
  assert.equal(result.shippingFee, STANDARD_SHIPPING_FEE);
  assert.equal(result.amountNeededForFreeShipping, FREE_SHIPPING_THRESHOLD - 780000);
  assert.equal(result.finalTotal, 780000 + STANDARD_SHIPPING_FEE);
});

test('calculateCartTotals grants free shipping when reaching or exceeding threshold', () => {
  // 780,000 + 1,300,000 = 2,080,000 (exceeds 2,000,000)
  const items: CartItem[] = [
    { product: sampleProductA, quantity: 1 },
    { product: sampleProductB, quantity: 1 }
  ];
  const result = calculateCartTotals(items);

  assert.equal(result.subtotal, 2080000);
  assert.equal(result.isFreeShipping, true);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.freeShippingProgress, 100);
  assert.equal(result.amountNeededForFreeShipping, 0);
  assert.equal(result.finalTotal, 2080000);
});

test('calculateCartTotals applies coupon code discounts correctly', () => {
  const items: CartItem[] = [{ product: sampleProductB, quantity: 2 }]; // 2,600,000
  const result = calculateCartTotals(items, 'RADBEAUTY'); // 10% coupon
  
  assert.equal(result.subtotal, 2600000);
  assert.equal(result.couponDiscount, 260000); // 10% of 2,600,000
  assert.equal(result.finalTotal, 2600000 - 260000);
});
