import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isWishlisted,
  cartQuantity = 0,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const badgeColorMap: Record<string, string> = {
    'ویژه': 'bg-amber-500 text-white',
    'پرفروش': 'bg-rose-500 text-white',
    'جدید': 'bg-emerald-600 text-white',
    'پیشنهاد رادبیوتی': 'bg-[#7A1C2C] text-white',
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl border border-stone-200/80 hover:border-rose-300 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Media Section */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-50 mb-3.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs ${badgeColorMap[product.badge] || 'bg-stone-800 text-white'}`}>
              {product.badge}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-red-600 text-white shadow-xs self-start" dir="ltr">
              -{toPersianDigits(product.discountPercent)}%
            </span>
          )}
        </div>

        {/* Action Buttons Overlay (Wishlist & Quick View) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white/90 text-stone-600 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            title={isWishlisted ? 'در لیست علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-xl bg-white/90 text-stone-600 hover:text-[#7A1C2C] hover:bg-white backdrop-blur-md transition-all shadow-sm cursor-pointer opacity-90 group-hover:opacity-100"
            aria-label="مشاهده سریع"
            title="مشاهده سریع جزئیات"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Volume / Size Pill */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="text-[10px] font-medium text-stone-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-stone-200/50 shadow-xs">
            {toPersianDigits(product.volume)}
          </span>
        </div>
      </div>

      {/* Middle Details Section */}
      <div className="flex-1 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="font-bold text-[#7A1C2C] tracking-wide text-[11px] uppercase">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-stone-700 text-xs">
              {toPersianDigits(product.rating)}
            </span>
            <span className="text-[10px] text-stone-400">
              ({toPersianDigits(product.reviewCount)})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2 min-h-[2.6rem] mb-2 group-hover:text-[#7A1C2C] transition-colors">
          {product.name}
        </h3>

        {/* Short Feature Excerpt */}
        <p className="text-[11px] text-stone-500 line-clamp-1 mb-3">
          {product.shortDesc}
        </p>
      </div>

      {/* Bottom Pricing & Add to Cart Section */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
        {/* Prices */}
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-stone-400 line-through decoration-rose-400/60 -mb-0.5">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-sm sm:text-base font-black text-[#7A1C2C]">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : cartQuantity > 0
              ? 'bg-[#5C1420] hover:bg-[#481019] text-white'
              : 'bg-[#7A1C2C] hover:bg-[#641423] text-white hover:shadow-md'
          }`}
          aria-label={`افزودن ${product.name} به سبد خرید`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 animate-scale-up" />
              <span>اضافه شد</span>
            </>
          ) : cartQuantity > 0 ? (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{toPersianDigits(cartQuantity)} در سبد</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>خرید</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
