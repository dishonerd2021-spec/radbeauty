import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals, FREE_SHIPPING_THRESHOLD, VALID_COUPONS } from '../utils/cart';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, appliedCoupon);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('کد تخفیف نامعتبر است یا منقضی شده است. کد RADBEAUTY را امتحان کنید.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7A1C2C] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">سبد خرید شما</h2>
                <span className="text-xs text-stone-500">
                  {items.length === 0 ? 'سبد خالی است' : `${toPersianDigits(totals.totalItemCount)} کالا`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="بستن سبد خرید"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {items.length > 0 && (
            <div className="px-5 py-3.5 bg-rose-50/70 border-b border-rose-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#7A1C2C]">
                  <Truck className="w-4 h-4" />
                  {totals.isFreeShipping ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ارسال سفارش شما کاملاً رایگان است!
                    </span>
                  ) : (
                    <span>
                      تنها {formatPrice(totals.amountNeededForFreeShipping)} تا ارسال رایگان
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-stone-500">
                  {toPersianDigits(totals.freeShippingProgress)}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    totals.isFreeShipping ? 'bg-emerald-500' : 'bg-[#7A1C2C]'
                  }`}
                  style={{ width: `${totals.freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center text-[#7A1C2C]">
                  <ShoppingBag className="w-10 h-10 opacity-60" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">سبد خرید شما خالی است</h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  می‌توانید از بخش محصولات پوست، مو یا بدن، کالای مورد نظر خود را انتخاب کرده و به سبد اضافه کنید.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#7A1C2C] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#641423] transition-colors cursor-pointer"
                >
                  مشاهده و انتخاب محصولات
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-stone-200/80 hover:border-rose-200 bg-white transition-all shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-50 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer shrink-0"
                          aria-label={`حذف ${item.product.name} از سبد`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-500 font-medium">
                        {item.product.brand} · {toPersianDigits(item.product.volume)}
                      </span>
                    </div>

                    {/* Price and Quantity Adjuster */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-extrabold text-[#7A1C2C]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-[#7A1C2C] transition-colors cursor-pointer"
                          aria-label="افزایش تعداد"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-[#7A1C2C] transition-colors cursor-pointer"
                          aria-label="کاهش تعداد"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout Section */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/80 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>کد {appliedCoupon} فعال شد ({VALID_COUPONS[appliedCoupon]?.description})</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-stone-400 hover:text-red-500 font-bold text-[11px] cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="کد تخفیف (مثلاً RADBEAUTY)"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#7A1C2C] focus:ring-1 focus:ring-[#7A1C2C]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      اعمال
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
                <div className="flex items-center justify-between">
                  <span>جمع سبد خرید:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(totals.subtotal)}</span>
                </div>

                {totals.totalSavings > 0 && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>تخفیف ویژه کالاها:</span>
                    <span className="font-bold">-{formatPrice(totals.totalSavings)}</span>
                  </div>
                )}

                {totals.couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>تخفیف کوپن ({appliedCoupon}):</span>
                    <span className="font-bold">-{formatPrice(totals.couponDiscount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>هزینه ارسال:</span>
                  <span className="font-semibold text-stone-800">
                    {totals.isFreeShipping ? (
                      <span className="text-emerald-700 font-bold">رایگان</span>
                    ) : (
                      formatPrice(totals.shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-base text-[#7A1C2C]">{formatPrice(totals.finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#7A1C2C] hover:bg-[#641423] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ادامه ثبت سفارش و تسویه</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-center text-xs text-stone-500 hover:text-stone-800 py-1 transition-colors cursor-pointer"
                >
                  ادامه خرید در فروشگاه
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
