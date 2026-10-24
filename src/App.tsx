import React, { useState, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  HeroSlider 
} from './components/HeroSlider';
import { 
  CategoryShowcase 
} from './components/CategoryShowcase';
import { 
  ProductCard 
} from './components/ProductCard';
import { 
  CartDrawer 
} from './components/CartDrawer';
import { 
  QuickViewModal 
} from './components/QuickViewModal';
import { 
  WishlistDrawer 
} from './components/WishlistDrawer';
import { 
  SearchModal 
} from './components/SearchModal';
import { 
  BrandStrip 
} from './components/BrandStrip';
import { 
  PromoBanners 
} from './components/PromoBanners';
import { 
  MagazineSection 
} from './components/MagazineSection';
import { 
  TrustBadges 
} from './components/TrustBadges';
import { 
  Footer 
} from './components/Footer';
import { 
  CheckoutModal 
} from './components/CheckoutModal';

import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { calculateCartTotals } from './utils/cart';
import { toPersianDigits } from './utils/formatters';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Check } from 'lucide-react';

export default function App() {
  // State management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Seed initial demo items matching store context
    { product: PRODUCTS[0], quantity: 1 }, // اسکراب نمک بدن وکالی (780,000)
    { product: PRODUCTS[2], quantity: 1 }, // فوم کلاژن طلایی وکالی (550,000)
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1], PRODUCTS[6]]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  
  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`«${product.name.slice(0, 30)}...» به سبد خرید اضافه شد`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('کالا از سبد خرید حذف شد');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast('از لیست علاقه‌مندی‌ها حذف شد');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast('به لیست علاقه‌مندی‌ها افزوده شد');
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (selectedBrand) {
      result = result.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.badge === 'جدید' ? 1 : -1));
    } else {
      // featured / rating
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, selectedBrand, sortBy]);

  // Specific groups
  const bestSellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.badge === 'پرفروش' || p.rating >= 4.8);
  }, []);

  const latestProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.badge === 'جدید' || p.discountPercent);
  }, []);

  const cartTotals = calculateCartTotals(cartItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-stone-900 selection:bg-[#7A1C2C] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E0B10] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-rose-900/60 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartItemCount={cartTotals.totalItemCount}
        cartTotal={cartTotals.finalTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedBrand(null);
        }}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider
          onShopClick={(cat) => {
            if (cat) setActiveCategory(cat);
            document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Category Showcase */}
        <CategoryShowcase
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSelectedBrand(null);
          }}
          activeCategory={activeCategory}
        />

        {/* Main Product Showcase Section */}
        <section id="rad-products" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-6 bg-[#7A1C2C] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {selectedBrand 
                    ? `محصولات برند ${selectedBrand}` 
                    : activeCategory === 'all' 
                    ? 'پیشنهادهای فروشگاه رادبیوتی' 
                    : `محصولات دسته ${
                        activeCategory === 'skin' ? 'مراقبت پوست' : 
                        activeCategory === 'hair' ? 'مراقبت مو' : 
                        activeCategory === 'body' ? 'مراقبت بدن' : 'آرایشی'
                      }`}
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                نمایش {toPersianDigits(filteredProducts.length)} محصول برگزیده با ضمانت اصالت کالا
              </p>
            </div>

            {/* Filter and Sort Toolbar */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {selectedBrand && (
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-xs font-bold bg-rose-100 text-[#7A1C2C] px-3 py-1.5 rounded-xl hover:bg-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>فیلتر برند: {selectedBrand} (حذف)</span>
                  <span>×</span>
                </button>
              )}

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2 text-xs text-stone-700 shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium text-stone-500">مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">محبوب‌ترین‌ها و امتیاز</option>
                  <option value="newest">جدیدترین محصولات</option>
                  <option value="price-asc">ارزان‌ترین قیمت</option>
                  <option value="price-desc">گران‌ترین قیمت</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid (Responsive: 1 col on xs, 2 on sm, 3 on md, 4 on xl) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-8">
            {filteredProducts.map((product) => {
              const inCartItem = cartItems.find((i) => i.product.id === product.id);
              const isWishlisted = wishlist.some((p) => p.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  isWishlisted={isWishlisted}
                  cartQuantity={inCartItem?.quantity || 0}
                />
              );
            })}
          </div>

        </section>

        {/* Promo Banners */}
        <PromoBanners
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSelectedBrand(null);
          }}
        />

        {/* Latest Arrivals Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-[#7A1C2C] rounded-full" />
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                جدیدترین محصولات
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortBy('newest');
                document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#7A1C2C] hover:text-[#5C1420] transition-colors cursor-pointer"
            >
              مشاهده همه جدیدها ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {latestProducts.slice(0, 4).map((product) => {
              const inCartItem = cartItems.find((i) => i.product.id === product.id);
              const isWishlisted = wishlist.some((p) => p.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  isWishlisted={isWishlisted}
                  cartQuantity={inCartItem?.quantity || 0}
                />
              );
            })}
          </div>
        </section>

        {/* Brands Section */}
        <BrandStrip
          onSelectBrand={(brand) => {
            setSelectedBrand(brand || null);
          }}
          activeBrand={selectedBrand}
        />

        {/* Best Sellers Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-[#7A1C2C] rounded-full" />
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                پرفروش‌ترین‌های رادبیوتی
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortBy('featured');
                document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#7A1C2C] hover:text-[#5C1420] transition-colors cursor-pointer"
            >
              مشاهده لیست کامل پرفروش‌ها ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellers.slice(0, 4).map((product) => {
              const inCartItem = cartItems.find((i) => i.product.id === product.id);
              const isWishlisted = wishlist.some((p) => p.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  isWishlisted={isWishlisted}
                  cartQuantity={inCartItem?.quantity || 0}
                />
              );
            })}
          </div>
        </section>

        {/* Rad Beauty Magazine */}
        <MagazineSection />

        {/* Trust Badges */}
        <TrustBadges />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          document.getElementById('rad-products')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem => handleRemoveFromCart(handleRemoveCartItem)}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(orderId) => {
          handleClearCart();
          showToast(`سفارش با کد ${orderId} با موفقیت ثبت شد`);
        }}
      />

    </div>
  );
}
