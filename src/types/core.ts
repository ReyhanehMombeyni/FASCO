
export interface Name {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Size extends Name {
  symbol: string;
}

export interface Color extends Name {
  code: string;
}

export interface FilterParams {
  size: string | null;
  color: string | null;
  brand: string | null;
  collection: string | null;
  tag: string | null;
  range: string | null;
}