/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(input: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

/**
 * Formats a number with comma separators (e.g. 1,200,000) and converts to Persian digits with 'تومان'
 */
export function formatPrice(price: number, withPersianDigits = true): string {
  const formattedWithCommas = Math.round(price).toLocaleString('en-US');
  if (withPersianDigits) {
    return `${toPersianDigits(formattedWithCommas)} تومان`;
  }
  return `${formattedWithCommas} تومان`;
}
