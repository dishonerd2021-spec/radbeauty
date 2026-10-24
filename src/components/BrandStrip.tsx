import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { BRANDS } from '../data/products';

interface BrandStripProps {
  onSelectBrand: (brandName: string) => void;
  activeBrand: string | null;
}

export const BrandStrip: React.FC<BrandStripProps> = ({
  onSelectBrand,
  activeBrand,
}) => {
  return (
    <section id="rad-brands" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#7A1C2C] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            برندهای محبوب و معتبر
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium hidden sm:inline-block">
          تضمین اصالت و پچ‌کد معتبر جهانی
        </span>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {BRANDS.map((brand) => {
          const isSelected = activeBrand === brand.englishName;
          return (
            <div
              key={brand.id}
              onClick={() => {
                onSelectBrand(isSelected ? '' : brand.englishName);
                document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between min-h-[140px] group ${
                isSelected
                  ? 'bg-rose-50 border-[#7A1C2C] shadow-md scale-102'
                  : 'bg-white border-stone-200/80 hover:border-rose-300 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <div className="w-full flex justify-end">
                <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 group-hover:bg-rose-100 group-hover:text-[#7A1C2C] px-2 py-0.5 rounded-md transition-colors">
                  {brand.origin}
                </span>
              </div>

              <div className="py-2">
                <div className="text-base sm:text-lg font-black tracking-wider text-stone-800 font-serif group-hover:text-[#7A1C2C] transition-colors">
                  {brand.logoText}
                </div>
                <div className="text-xs font-bold text-stone-600 mt-0.5">
                  {brand.name}
                </div>
              </div>

              <p className="text-[10px] text-stone-600 line-clamp-1 leading-normal">
                {brand.tagline}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
