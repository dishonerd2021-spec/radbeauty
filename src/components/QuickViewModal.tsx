import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'how' | 'ingredients'>('desc');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-stone-100 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/90 text-stone-500 hover:text-stone-900 hover:bg-white shadow-md transition-all cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media / Image Column */}
        <div className="md:w-1/2 p-6 bg-stone-50/80 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-stone-200/80 relative">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-white relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs" dir="ltr">
                -{toPersianDigits(product.discountPercent)}%
              </span>
            )}
          </div>

          {/* Quick guarantees */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 text-[11px] text-stone-600 text-center font-medium">
            <div className="p-2 rounded-xl bg-white border border-stone-200/60 flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>اصالت تضمینی</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/60 flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>ارسال سریع</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/60 flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-amber-600" />
              <span>ضمانت بازگشت</span>
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[90vh]">
          <div>
            {/* Brand & Category & Wishlist */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#7A1C2C] bg-rose-50 px-2.5 py-1 rounded-lg">
                {product.brand} · {product.categoryLabel}
              </span>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200'
                }`}
                title="افزودن به علاقه‌مندی‌ها"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-snug mb-1">
              {product.name}
            </h2>

            {product.englishName && (
              <p className="text-xs text-stone-400 font-mono mb-3" dir="ltr">
                {product.englishName}
              </p>
            )}

            {/* Rating & Volume */}
            <div className="flex items-center gap-3 text-xs text-stone-600 mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-stone-800">{toPersianDigits(product.rating)}</span>
                <span className="text-stone-400">({toPersianDigits(product.reviewCount)} نظر ثبت‌شده)</span>
              </div>
              <span>•</span>
              <span>حجم: {toPersianDigits(product.volume)}</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-5 p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="text-xl font-black text-[#7A1C2C]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Tabs (Description, How to use, Ingredients) */}
            <div className="mb-4">
              <div className="flex border-b border-stone-200 gap-4 text-xs font-bold mb-3">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'desc'
                      ? 'border-[#7A1C2C] text-[#7A1C2C]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  مشخصات کلی
                </button>
                <button
                  onClick={() => setActiveTab('how')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'how'
                      ? 'border-[#7A1C2C] text-[#7A1C2C]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  طریقه مصرف
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-[#7A1C2C] text-[#7A1C2C]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  ترکیبات اصلی
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-stone-600 leading-relaxed min-h-[90px]">
                {activeTab === 'desc' && (
                  <div className="space-y-2">
                    <p>{product.shortDesc}</p>
                    <ul className="space-y-1 pt-1">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'how' && (
                  <p className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                    {product.howToUse || 'صبح یا شب روی پوست تمیز به آرامی ماساژ داده شود.'}
                  </p>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.ingredients?.map((ing, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-mono text-[11px]" dir="ltr">
                        {ing}
                      </span>
                    )) || <span>فرمولاسیون گیاهی و عصاره‌های استاندارد دارویی</span>}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Controls: Quantity + Add to Cart */}
          <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-stone-300 rounded-2xl bg-stone-50 px-2 py-1.5">
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-1.5 text-stone-600 hover:text-[#7A1C2C] cursor-pointer"
                aria-label="افزایش تعداد"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-stone-900">
                {toPersianDigits(quantity)}
              </span>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1.5 text-stone-600 hover:text-[#7A1C2C] cursor-pointer"
                aria-label="کاهش تعداد"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#7A1C2C] hover:bg-[#641423] text-white hover:shadow-lg'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>با موفقیت افزوده شد!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد ({formatPrice(product.price * quantity)})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
