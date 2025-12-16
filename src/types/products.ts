import { Name, Color, Size, Category } from "./core";

interface ColorsProduct {
  colors: Color;
}

interface SizesProduct {
  sizes: Size;
}

interface StockSummary {
  total_stock: number;
}

export interface ProductInventory {
  size_id: string;
  color_id: string;
  stock_quantity: number;
}

export interface DiscountedProduct {
    id: string;
    name: string;
    image_url: string;
    discount_percentage: number;
};

export interface Product extends DiscountedProduct {
  description: string;
  price: number;
  rating: number;
  reviews: number;
  brands: Name;
  stock_summary: StockSummary[] | []; 
}

export interface ProductDetailType extends Product {
  product_colors: ColorsProduct[] | [];
  product_sizes: SizesProduct[] | [];
  product_inventory: ProductInventory[] | [];
}

export interface ProductsSectionProps {
  categories: Category[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface ParamsId {
  params: Promise<{ id: string }>;
}

export interface ProductDetailProps {
  product: ProductDetailType;
  discountAmount: number;
  campaignEndDate: string;
}

export interface SizeColorSectionProps {
  sizes: SizesProduct[];
  size: string | null;
  sizeHandler: (id: string) => void;
  colors: ColorsProduct[];
  color: string | null;
  colorHandler: (id: string) => void;
}

export interface ProductHeaderProps {
  name: string;
  rating: number;
  reviews: number;
}

export interface PriceDisplayProps {
  price: number;
  discountedPrice: string;
  discount_percentage: number;
}

export interface StockAlertProps {
  currentStock: number;
  LOW_STOCK_THRESHOLD: number;
}

//products.ts
// import { Color, Size } from "./shop";

// export interface BaseProduct {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   image_url: string;
//   discount_percentage: number;
//   reviews: number; 
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   reviews: number;
//   discount_percentage: number;
//   image_url: string;
//   brands: {
//       name: string;
//   },
//   stock_summary: StockSummary[] | []
//   product_colors: ColorsProduct[] | [];
// }

// export interface CategoryDetails {
//   name: string;
// }

// export interface ProductWithCategory extends Product {
//   category: CategoryDetails;
// }

// export interface ProductInventory {
//   size_id: string;
//   color_id: string;
//   stock_quantity: number;
// }

// export interface ProductDetailType {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   image_url: string;
//   discount_percentage: number;
//   reviews: number;
//   product_colors: ColorsProduct[] | [];
//   product_sizes: SizesProduct[] | [];
//   product_inventory: ProductInventory[] | []
// }

// export interface PaginatedData {
//   products: ProductWithCategory[];
//   totalCount: number;
// }