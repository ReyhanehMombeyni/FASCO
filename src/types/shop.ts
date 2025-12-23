import { Name, Size, Color, FilterParams } from "./core";
import { ProductWithCategory, ShopProduct } from "./products";

export interface ItemsFilter {
  sizes: Size[] | [];
  collections: Name[] | [];
  brands: Name[] | [];
  colors: Color[] | [];
  tags: Name[] | [];
}

export interface GetFilteredProducts {
  products: ShopProduct[];
  count: number;
}

export interface PaginatedData {
  products: ProductWithCategory[];
  totalCount: number;
}

export interface ShopPageProps extends FilterParams {
    page: string | null;
}

export interface SearchParams {
  searchParams: Promise<ShopPageProps>;
}

export interface GetFilteredProductsProps {
  filters: FilterParams;
  currentPage: number;
  ITEMS_PER_PAGE: number;
}


//shops.ts
// import { Product } from "../types/products";

// export interface Name {
//   id: string;
//   name: string;
// }
// export interface Size {
//   id: string;
//   name: string;
//   symbol: string;
// }
// export interface Color {
//   id: string;
//   name: string;
//   code: string;
// }

// export interface ItemsFilter {
//   sizes: Size[] | [];
//   collections: Name[] | [];
//   brands: Name[] | [];
//   colors: Color[] | [];
//   tags: Name[] | [];
// }
// export interface FilterParams {
//   size: string | null;
//   color: string | null;
//   brand: string | null;
//   collection: string | null;
//   tag: string | null;
//   range: string | null;
// }

// export interface GetFilteredProductsProps {
//   filters: FilterParams;
//   currentPage: number;
//   ITEMS_PER_PAGE: number;
// }

// export interface GetFilteredProducts {
//   products: Product[];
//   count: number;
// }

// export interface ShopPageProps {
//   brand?: string;
//   size?: string;
//   color?: string;
//   collection?: string;
//   tag?: string;
//   page?: string;
//   range?: string;
// }
