export type View = 'web' | 'app';
export type RentalStep = 'detail' | 'checkout' | 'success' | null;

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  buyPrice: number;
  retail: number;
  days: number;
  image: string;
  tag: string;
  liked: boolean;
  eco: boolean;
  rating: number;
  sizes: string[];
  material: string;
  match: number;
  modelNo?: string;
  releaseDate?: string;
  color?: string;
}

export interface Brand {
  name: string;
  type: string;
  items: number;
  co2: string;
  img: string;
  esg: boolean;
}