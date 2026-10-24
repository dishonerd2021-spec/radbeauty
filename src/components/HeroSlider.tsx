import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Shield, Heart } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface HeroSliderProps {
  onShopClick: (category?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: '✨ پیشنهاد طلایی فصل رادبیوتی',
      title: 'زیبایی در سبک زندگی شما',
      subtitle: 'مجموعه تخصصی و دست‌چین‌شده از برترین محصولات مراقبت پوست، مو و بدن با تضمین اصالت و ضمانت بازگشت وجه.',
      ctaText: 'مشاهده و خرید محصولات',
      category: 'skin',
      bgColor: 'from-[#FDECEF] via-[#FBF4F1] to-[#F7EAE8]',
      accentColor: '#7A1C2C',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85',
      floatingBadge1: { text: '۱۰۰٪ اورجینال و تست‌شده', icon: Shield },
      floatingBadge2: { text: 'ارسال رایگان بالای ۲ م.ت', icon: CheckCircle2 },
      productHighlight: 'سرم‌ها و لوسیون‌های ویتامین C وکالی و فابرلیک'
    },
    {
      id: 2,
      tag: '🌿 مراقبت تخصصی و درمانی مو',
      title: 'یک روز خوب برای موهای شما',
      subtitle: 'تقویت ریشه، مهار ریزش و درخشش ابریشمی با ماسک‌های درمانی فلفل قرمز فابرلیک و اسپری‌های معجزه‌آسای ۱۷ کاره.',
      ctaText: 'کشف محصولات مراقبت مو',
      category: 'hair',
      bgColor: 'from-[#F3F7F5] via-[#EDF5F2] to-[#E5EFEA]',
      accentColor: '#2D5A46',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
      floatingBadge1: { text: 'فرمول درمانی اروپا', icon: Sparkles },
      floatingBadge2: { text: 'رضایت ۹۸٪ مصرف‌کنندگان', icon: Heart },
      productHighlight: 'ماسک‌های محرک رویش مو و کرم اسپری‌های تقویتی'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.bgColor} border border-rose-100/60 shadow-sm transition-all duration-700 min-h-[460px] md:min-h-[480px] flex items-center`}>
        
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-white/40 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-rose-200/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14">
          
          {/* Text Content (Right side in RTL) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/60 text-xs sm:text-sm font-semibold text-stone-800 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{slide.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-[1.25] tracking-tight">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onShopClick(slide.category)}
                className="bg-[#7A1C2C] hover:bg-[#641423] text-white px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('rad-brands')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/80 hover:bg-white text-stone-800 border border-stone-200 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all hover:shadow-xs cursor-pointer"
              >
                مشاهده برندهای معتبر
              </button>
            </div>

            {/* Trust Micro-Bullet */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{slide.productHighlight} موجود با تخفیف ویژه</span>
            </div>
          </div>

          {/* Visual Showcase (Left side in RTL) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white p-2 border border-white/60">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle gradient overlay at bottom of photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Rad Beauty Watermark Badge (Clean & High End, not amateur) */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-rose-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7A1C2C]" />
                <span className="text-[11px] font-bold text-stone-800">رادبیوتی اصل</span>
              </div>
            </div>

            {/* Floating Trust Badge 1 */}
            <div className="hidden sm:flex absolute -bottom-4 right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-stone-100 items-center gap-2.5 animate-bounce-slow">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#7A1C2C] flex items-center justify-center">
                <slide.floatingBadge1.icon className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-stone-800">{slide.floatingBadge1.text}</div>
                <div className="text-[10px] text-stone-500">بچ‌کد قابل استعلام</div>
              </div>
            </div>

            {/* Floating Trust Badge 2 */}
            <div className="hidden sm:flex absolute -top-3 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-stone-100 items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <slide.floatingBadge2.icon className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-stone-800">{slide.floatingBadge2.text}</div>
                <div className="text-[10px] text-stone-500">پست پیشتاز سراسری</div>
              </div>
            </div>

          </div>

        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="absolute bottom-4 left-6 sm:left-10 z-20 flex items-center gap-3">
          
          {/* Arrow Buttons */}
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md p-1 rounded-xl border border-stone-200/80 shadow-xs">
            <button
              onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              aria-label="اسلاید بعدی"
              title="اسلاید بعدی"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              aria-label="اسلاید قبلی"
              title="اسلاید قبلی"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-7 bg-[#7A1C2C]' 
                    : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`اسلاید ${toPersianDigits(idx + 1)}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
