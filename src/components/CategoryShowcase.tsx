import React from 'react';
import { ArrowLeft, Sparkles, Feather, HeartHandshake, Smile } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const categories = [
    {
      id: 'skin',
      title: 'مراقبت پوست',
      subtitle: 'انتخابی برای هر روز',
      desc: 'سرم‌های جوانساز، فوم‌های پاک‌کننده منافذ و لوسیون‌های مرطوب‌کننده',
      count: '۲۸ محصول',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-gradient-to-br from-[#FDF0F3] to-[#FCE2E7]',
      borderColor: 'border-rose-200/60',
      tagColor: 'bg-rose-100 text-[#7A1C2C]',
    },
    {
      id: 'hair',
      title: 'مراقبت مو',
      subtitle: 'لطافت و استحکام بیشتر',
      desc: 'ماسک‌های درمانی گرمابخش، اسپری‌های ضد حرارت ۱۷ کاره و روغن‌های احیاکننده',
      count: '۱۹ محصول',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-gradient-to-br from-[#EDF7F2] to-[#E0F0E7]',
      borderColor: 'border-emerald-200/60',
      tagColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'body',
      title: 'مراقبت بدن',
      subtitle: 'درخشش و لطافت روزانه',
      desc: 'اسکراب نمک معدنی دریای مرده، روغن‌های بدن کاکائو و بالم‌های تسکین‌بخش',
      count: '۲۴ محصول',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-gradient-to-br from-[#FFF7ED] to-[#FDEFD8]',
      borderColor: 'border-amber-200/60',
      tagColor: 'bg-amber-100 text-amber-900',
    },
  ];

  const quickBadges = [
    { id: 'all', label: 'همه دسته‌ها', icon: '✨' },
    { id: 'skin', label: 'مراقبت پوست', icon: '🌸' },
    { id: 'hair', label: 'مراقبت مو', icon: '🌿' },
    { id: 'body', label: 'مراقبت بدن', icon: '🧴' },
    { id: 'makeup', label: 'لوازم آرایشی', icon: '💄' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Quick Category Bubbles / Story Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {quickBadges.map((badge) => {
          const isSelected = activeCategory === badge.id;
          return (
            <button
              key={badge.id}
              onClick={() => {
                onSelectCategory(badge.id);
                document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                isSelected
                  ? 'bg-[#7A1C2C] text-white border-[#7A1C2C] shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300 hover:bg-rose-50/50'
              }`}
            >
              <span className="text-base">{badge.icon}</span>
              <span>{badge.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3 Featured Category Cards (Replacing clumsy repeating boxes with sleek modern banners) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              onSelectCategory(cat.id);
              document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group relative overflow-hidden rounded-3xl ${cat.bgColor} border ${cat.borderColor} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
          >
            <div>
              {/* Category Tag & Count */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${cat.tagColor}`}>
                  {cat.subtitle}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {toPersianDigits(cat.count)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
                {cat.title}
              </h2>

              {/* Description */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                {cat.desc}
              </p>
            </div>

            {/* Thumbnail + CTA Button */}
            <div className="flex items-end justify-between pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1C2C] group-hover:gap-2.5 transition-all">
                <span>مشاهده و خرید</span>
                <ArrowLeft className="w-4 h-4" />
              </span>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md bg-white p-1 border border-white/80 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
