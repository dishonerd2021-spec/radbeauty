import React from 'react';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface PromoBannersProps {
  onSelectCategory: (category: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1: Hair Care */}
        <div 
          onClick={() => {
            onSelectCategory('hair');
            document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EDF5F1] to-[#E3EFE9] border border-emerald-200/80 p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="space-y-3 z-10 max-w-[60%]">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 inline-block">
              مراقبت روزانه و تخصصی
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              یک روز خوب برای موهای شما
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              ماسک‌های تقویت‌کننده و اسپری‌های ۱۷ کاره بدون آبکشی فابرلیک
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 group-hover:gap-2.5 transition-all pt-1">
              <span>مشاهده و خرید محصولات مو</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg bg-white p-1 border border-white/80 group-hover:scale-105 transition-transform shrink-0">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
              alt="مراقبت مو"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Banner 2: Body Care */}
        <div 
          onClick={() => {
            onSelectCategory('body');
            document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF4EB] to-[#FDEBDD] border border-amber-200/80 p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="space-y-3 z-10 max-w-[60%]">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 inline-block">
              طراوت و درخشش طبیعی
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              مراقبت از پوست بدن
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              اسکراب‌های نمک دریایی وکالی و ژل روغن‌های غنی‌شده وازلین
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 group-hover:gap-2.5 transition-all pt-1">
              <span>مشاهده و خرید محصولات بدن</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg bg-white p-1 border border-white/80 group-hover:scale-105 transition-transform shrink-0">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
              alt="مراقبت بدن"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
