export type ProductCategory =
  | 'Sneakers'
  | 'Sports Shoes'
  | 'Running Shoes'
  | 'Casual Shoes'
  | 'Lifestyle Footwear';

export type Gender = 'Men' | 'Women' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  gallery: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  gender: Gender;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  features: string[];
  specs: {
    weight: string;
    upperMaterial: string;
    midsole: string;
    soleGrip: string;
    origin: string;
  };
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  colors: ProductColor[];
  availableSizes: number[]; // UK / India sizes e.g. 6, 7, 8, 9, 10, 11
  inStock: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: number;
  quantity: number;
}

export interface FilterState {
  category: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  sizes: number[];
  colors: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  searchQuery: string;
}

export type ActiveView = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'about'
  | 'contact'
  | 'checkout';
