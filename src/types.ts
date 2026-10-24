export interface Product {
  id: string;
  name: string;
  englishName?: string;
  category: 'skin' | 'hair' | 'body' | 'makeup';
  categoryLabel: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  volume: string;
  badge?: 'ویژه' | 'پرفروش' | 'جدید' | 'پیشنهاد رادبیوتی';
  shortDesc: string;
  features: string[];
  inStock: boolean;
  howToUse?: string;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
}

export interface Brand {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  origin: string;
  logoText: string;
}
