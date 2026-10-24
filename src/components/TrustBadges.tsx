import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'ضمانت ۱۰۰٪ اصالت کالا',
      desc: 'تمامی محصولات دارای بچ‌کد قابل استعلام و ضمانت بازگشت وجه',
      iconColor: 'text-rose-700 bg-rose-50',
    },
    {
      icon: Truck,
      title: 'ارسال سریع به سراسر کشور',
      desc: 'تحویل در کمترین زمان با پست پیشتاز و ارسال رایگان بالای ۲ م.ت',
      iconColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      icon: CreditCard,
      title: 'پرداخت امن اینترنتی',
      desc: 'امکان پرداخت آنلاین مطمئن از طریق کلیه کارت‌های عضو شتاب',
      iconColor: 'text-blue-700 bg-blue-50',
    },
    {
      icon: Headphones,
      title: 'مشاوره تخصصی پوست و مو',
      desc: 'پشتیبانی و پاسخگویی به سوالات روتین مراقبتی در تمام ایام',
      iconColor: 'text-amber-700 bg-amber-50',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${badge.iconColor}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
