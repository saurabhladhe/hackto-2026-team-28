export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  gallery: string[];
  description: string;
  colors: ProductColor[];
  sizes: string[];
  features: string[];
}

export interface NikeCatalogData {
  type: "nike-catalog";
  products: Product[];
}

export interface CheckoutItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface NikeCheckoutData {
  type: "nike-checkout";
  items: CheckoutItem[];
  checkoutUrl: string;
  stripePaymentLinkId: string;
}

export type AppData = NikeCatalogData | NikeCheckoutData;
