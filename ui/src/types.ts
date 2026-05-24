export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface NikeCatalogData {
  type: "nike-catalog";
  products: Product[];
}
