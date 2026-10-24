import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">لیست علاقه‌مندی‌ها</h2>
                <span className="text-xs text-stone-500">
                  {wishlist.length === 0 ? 'هیچ کالایی ذخیره نشده' : `${toPersianDigits(wishlist.length)} کالا`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="بستن لیست علاقه‌مندی‌ها"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <Heart className="w-10 h-10 opacity-60" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">لیست علاقه‌مندی‌های شما خالی است</h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  با کلیک روی آیکون قلب روی هر کالا، آن را برای بررسی یا خرید بعدی در این بخش ذخیره کنید.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#7A1C2C] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#641423] cursor-pointer"
                >
                  مرور محصولات فروشگاه
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-stone-200 bg-white shadow-2xs hover:border-rose-200 transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-50 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                          aria-label={`حذف ${product.name} از علاقه‌مندی‌ها`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#7A1C2C] font-bold">
                        {product.brand}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-black text-[#7A1C2C]">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7A1C2C] hover:bg-[#641423] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>انتقال به سبد</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-stone-200 bg-stone-50">
            <button
              onClick={onClose}
              className="w-full text-center text-xs font-bold text-stone-600 hover:text-stone-900 py-2 cursor-pointer"
            >
              بستن و ادامه خرید
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
