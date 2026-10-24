import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenNewsletterModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#1E0B10] text-rose-100/90 pt-16 pb-10 border-t border-[#3B151E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Box */}
        <div className="bg-[#2B1017] rounded-3xl p-6 sm:p-10 mb-14 border border-[#4D1825] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-right">
            <span className="text-xs font-bold text-rose-400 tracking-wider">تازه‌های دنیای زیبایی</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              از جدیدترین تخفیف‌ها و پیشنهادهای ویژه رادبیوتی باخبر شوید
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/70">
              با عضویت در خبرنامه، کد تخفیف ۱۰٪ خرید اول را بلافاصله دریافت نمایید.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md shrink-0">
            <div className="relative flex-1">
              <input
                type="text"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="شماره موبایل یا ایمیل شما..."
                className="w-full sm:w-64 bg-[#1E0B10] border border-[#521C29] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400"
              />
            </div>
            <button
              type="submit"
              className="bg-[#8B1E34] hover:bg-[#A3253F] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ثبت شد!</span>
                </>
              ) : (
                <>
                  <span>عضویت در خبرنامه</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & About (Col 1 & 2) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[#8B1E34] flex items-center justify-center text-white font-bold text-lg">
                <span>ر</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-200">راد</span>
                <span className="text-2xl font-black text-white">بیوتی</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-rose-200/70 leading-relaxed max-w-sm">
              فروشگاه تخصصی محصولات آرایشی، بهداشتی و مراقبت پوست و مو رادبیوتی، با تمرکز بر اصالت قطعی کالا، ضمانت بازگشت وجه و ارائه تجربه‌ای لوکس و مطمئن در کنار شماست.
            </p>

            <div className="space-y-2 text-xs text-rose-200/80 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>پشتیبانی تلفنی و واتساپ: </span>
                <a href="tel:09925734421" className="font-bold text-white hover:text-rose-300 dir-ltr">۰۹۹۲ ۵۷۳ ۴۴۲۱</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>ایمیل: info@radbeauty.ir</span>
              </div>
            </div>
          </div>

          {/* Col 3: خرید */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white">خرید آنلاین</h4>
            <ul className="space-y-2 text-xs text-rose-200/70">
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">
                  همه محصولات
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('skin')} className="hover:text-white transition-colors cursor-pointer">
                  محصولات جدید
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">
                  پرفروش‌ترین‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">
                  تخفیف‌های ویژه فصل
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: دسته‌بندی‌ها */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-xs text-rose-200/70">
              <li>
                <button onClick={() => onSelectCategory('skin')} className="hover:text-white transition-colors cursor-pointer">
                  مراقبت پوست (سرم و فوم)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hair')} className="hover:text-white transition-colors cursor-pointer">
                  مراقبت مو (ماسک و اسپری)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('body')} className="hover:text-white transition-colors cursor-pointer">
                  مراقبت بدن (اسکراب و روغن)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('makeup')} className="hover:text-white transition-colors cursor-pointer">
                  لوازم آرایشی اورجینال
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: راهنما و قوانین */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white">خدمات و راهنما</h4>
            <ul className="space-y-2 text-xs text-rose-200/70">
              <li><a href="#rad-magazine" className="hover:text-white transition-colors">مجله رادبیوتی</a></li>
              <li><span className="hover:text-white cursor-pointer">سؤالات متداول خرید</span></li>
              <li><span className="hover:text-white cursor-pointer">شرایط ارسال و تحویل</span></li>
              <li><span className="hover:text-white cursor-pointer">قوانین ضمانت بازگشت</span></li>
              <li><span className="hover:text-white cursor-pointer">حفظ حریم خصوصی</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-[#3B151E] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/60 gap-4">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به <span className="text-rose-200 font-bold">رادبیوتی</span> می‌باشد. © {toPersianDigits('۱۴۰۳')}
          </p>
          <div className="flex items-center gap-2">
            <span>طراحی و راه‌اندازی:</span>
            <span className="text-rose-200 font-medium">معین یوسفی</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
