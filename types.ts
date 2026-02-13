
export type FabricType = 'Satin' | 'Silk' | 'Velvet';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: FabricType;
  color: string;
  image: string;
  isBestSeller?: boolean;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  productName: string;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  CHECKOUT = 'CHECKOUT'
}
