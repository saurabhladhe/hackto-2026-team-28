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
