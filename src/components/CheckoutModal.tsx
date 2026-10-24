import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  User, 
  Phone, 
  ArrowLeft 
} from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals } from '../utils/cart';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [fullName, setFullName] = useState('مریم رضایی');
  const [phoneNumber, setPhoneNumber] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [province, setProvince] = useState('تهران');
  const [address, setAddress] = useState('خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲');
  const [postalCode, setPostalCode] = useState('۱۹۹۴۸۲۳۴۵۱');
  const [paymentGateway, setPaymentGateway] = useState('saman');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const mockOrderId = `RAD-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setCompletedOrder(mockOrderId);
      onOrderSuccess(mockOrderId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-stone-100 max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          aria-label="بستن پنجره پرداخت"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Complete State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-stone-900">
              سفارش شما با موفقیت ثبت شد!
            </h3>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 max-w-sm mx-auto space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>کد پیگیری سفارش:</span>
                <span className="font-bold text-[#7A1C2C] font-mono">{toPersianDigits(completedOrder)}</span>
              </div>
              <div className="flex justify-between">
                <span>مبلغ پرداخت‌شده:</span>
                <span className="font-bold text-stone-900">{formatPrice(totals.finalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>روش ارسال:</span>
                <span className="font-semibold text-emerald-700">پست پیشتاز سراسری</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              پیامک تأیید و شناسه رهگیری پستی به شماره {toPersianDigits(phoneNumber)} ارسال خواهد شد.
            </p>

            <button
              onClick={onClose}
              className="bg-[#7A1C2C] text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-[#641423] transition-colors cursor-pointer"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-[#7A1C2C]">تسویه حساب امن رادبیوتی</span>
              <h2 className="text-xl font-black text-stone-900 mt-1">مشخصات تحویل گیرنده و پرداخت</h2>
            </div>

            {/* Recipient info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">نام و نام خانوادگی:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7A1C2C]"
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">شماره تماس همراه:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7A1C2C]"
                    dir="ltr"
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">استان:</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7A1C2C]"
                  >
                    <option value="تهران">تهران</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="فارس">فارس (شیراز)</option>
                    <option value="خراسان رضوی">خراسان رضوی (مشهد)</option>
                    <option value="آذربایجان شرقی">آذربایجان شرقی (تبریز)</option>
                    <option value="البرز">البرز (کرج)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">کد پستی (۱۰ رقمی):</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#7A1C2C]"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">آدرس کامل پستی:</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#7A1C2C]"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">انتخاب درگاه بانکی شاپرک:</label>
              <div className="grid grid-cols-2 gap-2">
                <label 
                  onClick={() => setPaymentGateway('saman')}
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentGateway === 'saman' 
                      ? 'bg-rose-50 border-[#7A1C2C] text-[#7A1C2C] font-bold' 
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs">درگاه پرداخت سامان کیش</span>
                </label>

                <label 
                  onClick={() => setPaymentGateway('mellat')}
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentGateway === 'mellat' 
                      ? 'bg-rose-50 border-[#7A1C2C] text-[#7A1C2C] font-bold' 
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs">درگاه پرداخت به‌پرداخت ملت</span>
                </label>
              </div>
            </div>

            {/* Total invoice strip */}
            <div className="p-3.5 rounded-2xl bg-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">مبلغ کل قابل پرداخت:</span>
              <span className="text-base font-black text-[#7A1C2C]">{formatPrice(totals.finalTotal)}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7A1C2C] hover:bg-[#641423] disabled:bg-stone-400 text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>در حال اتصال به درگاه بانکی...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>پرداخت اینترنتی و ثبت نهایی سفارش</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
