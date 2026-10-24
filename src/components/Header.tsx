import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  ChevronDown,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { toPersianDigits, formatPrice } from '../utils/formatters';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  activeCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'skin', label: 'مراقبت پوست' },
    { id: 'hair', label: 'مراقبت مو' },
    { id: 'body', label: 'مراقبت بدن' },
    { id: 'makeup', label: 'آرایشی' },
    { id: 'brands', label: 'برندها' },
    { id: 'magazine', label: 'مجله رادبیوتی' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#5C1420] text-white text-xs sm:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-300 animate-pulse" />
            <span className="font-medium tracking-wide">
              ارسال رایگان برای تمام سفارش‌های بالای {toPersianDigits('۲,۰۰۰,۰۰۰')} تومان
            </span>
          </div>

          <div className="flex items-center gap-4 text-rose-100 text-xs">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ضمانت ۱۰۰٪ اصالت کلیه کالاها
            </span>
            <span className="hidden md:inline-block text-rose-300/40">|</span>
            <a 
              href="tel:09925734421" 
              className="hidden md:flex items-center gap-1 text-rose-200 hover:text-white transition-colors"
              dir="ltr"
            >
              <span>۰۹۹۲ ۵۷۳ ۴۴۲۱</span>
              <Phone className="w-3 h-3 text-rose-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-stone-200' : 'border-b border-stone-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Right Section: Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#7A1C2C]"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Rad Beauty Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7A1C2C] to-[#992237] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <span>ر</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#7A1C2C] tracking-tight">راد</span>
                  <span className="text-2xl font-black text-stone-800 tracking-tight">بیوتی</span>
                </div>
                <span className="text-[10px] text-stone-500 font-medium tracking-widest -mt-1">RAD BEAUTY</span>
              </div>
            </a>
          </div>

          {/* Center Section: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'magazine') {
                      document.getElementById('rad-magazine')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.id === 'brands') {
                      document.getElementById('rad-brands')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onSelectCategory(item.id);
                      document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative ${
                    isActive 
                      ? 'text-[#7A1C2C] bg-rose-50/70 font-bold' 
                      : 'text-stone-700 hover:text-[#7A1C2C] hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#7A1C2C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Left Section: Action Icons (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-stone-700 hover:text-[#7A1C2C] hover:bg-stone-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="جستجوی محصولات"
              title="جستجوی سریع محصولات"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-xl text-stone-700 hover:text-[#7A1C2C] hover:bg-stone-100 transition-colors relative focus:outline-none cursor-pointer"
              aria-label="لیست علاقه‌مندی‌ها"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {toPersianDigits(wishlistCount)}
                </span>
              )}
            </button>

            {/* Cart Button with Total Preview */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#7A1C2C] hover:bg-[#641423] text-white px-3.5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md cursor-pointer group"
              aria-label="سبد خرید"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black flex items-center justify-center">
                    {toPersianDigits(cartItemCount)}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold">
                {cartItemCount === 0 ? 'سبد خرید' : formatPrice(cartTotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.id === 'magazine') {
                      document.getElementById('rad-magazine')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.id === 'brands') {
                      document.getElementById('rad-brands')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onSelectCategory(item.id);
                      document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-right p-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === item.id 
                      ? 'bg-rose-50 text-[#7A1C2C] font-bold' 
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-3 flex flex-col gap-2 text-xs text-stone-600">
              <div className="flex items-center justify-between py-1">
                <span className="font-medium">پشتیبانی و مشاوره تلفنی:</span>
                <a href="tel:09925734421" className="font-bold text-[#7A1C2C] dir-ltr">۰۹۹۲ ۵۷۳ ۴۴۲۱</a>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>ضمانت بازگشت و اصالت کالا</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
