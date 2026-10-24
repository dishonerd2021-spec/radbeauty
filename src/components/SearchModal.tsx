import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  const quickKeywords = [
    'وکالی',
    'فابرلیک',
    'ویتامین C',
    'اسکراب نمک بدن',
    'وازلین',
    'ماسک مو',
    'کلاژن',
    'نیاسینامید',
  ];

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 z-10 animate-in fade-in-90 zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50/50">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام محصول، برند (وکالی، فابرلیک)، دسته‌بندی..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-stone-800 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 text-xs px-2 py-1 rounded-lg bg-stone-200/60 cursor-pointer"
            >
              پاک کردن
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="بستن جستجو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="px-5 py-3 border-b border-stone-100 bg-white">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span>جستجوهای پرطرفدار:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                className="px-3 py-1 rounded-xl text-xs bg-stone-100 hover:bg-rose-50 hover:text-[#7A1C2C] text-stone-700 transition-colors cursor-pointer"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              عبارت مورد نظر خود را تایپ کنید تا نتایج به صورت لحظه‌ای نمایش داده شوند.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-bold text-stone-700">نتیجه‌ای برای «{query}» یافت نشد</p>
              <p className="text-xs text-stone-500">
                لطفاً املای کلمه را بررسی کنید یا دسته‌بندی‌های دیگر را امتحان نمایید.
              </p>
            </div>
          ) : (
            <>
              <div className="text-xs font-bold text-stone-500 px-2">
                {toPersianDigits(filteredProducts.length)} محصول یافت شد
              </div>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#7A1C2C]">{p.brand}</span>
                      <h4 className="text-xs font-bold text-stone-800 line-clamp-1 group-hover:text-[#7A1C2C] transition-colors">
                        {p.name}
                      </h4>
                      <div className="text-xs font-extrabold text-[#7A1C2C] mt-0.5">
                        {formatPrice(p.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="p-2 rounded-xl bg-rose-50 text-[#7A1C2C] hover:bg-[#7A1C2C] hover:text-white transition-colors cursor-pointer"
                      title="افزودن به سبد"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:text-stone-700 group-hover:-translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
