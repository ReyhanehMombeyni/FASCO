import { Category } from "@/src/types/core";
import { Product } from "@/src/types/products";

export interface ProductsState {
  products: Product[];
  currentCategory: Category;
  offset: number;
  total: number;
  isLoadingMore: boolean;
}

export type ProductsAction =
  | { type: "CHANGE_CATEGORY"; category: Category; products: Product[]; total: number }
  | { type: "LOAD_MORE_START" }
  | { type: "LOAD_MORE_SUCCESS"; products: Product[] }
  | { type: "LOAD_MORE_FINAL" };

export const initialProductsState = ({initialCategory, initialProducts, initialTotal}: {
    initialCategory: Category;
    initialProducts: Product[];
    initialTotal: number;
  }): ProductsState => ({
    products: initialProducts,
  currentCategory: initialCategory,
  offset: initialProducts.length,
  total: initialTotal,
  isLoadingMore: false
  });

export const productsReducer = (state: ProductsState, action: ProductsAction): ProductsState => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return {
        ...state,
        currentCategory: action.category,
        products: action.products,
        total: action.total,
        offset: action.products.length,
      };
      
    case "LOAD_MORE_START":
      return {
        ...state,
        isLoadingMore: true
      };
      
    case "LOAD_MORE_SUCCESS":
      return {
        ...state,
        products: [...state.products, ...action.products],
        offset: state.offset + action.products.length,
        isLoadingMore: false,
      };
      
    case "LOAD_MORE_FINAL":
      return {
        ...state,
        isLoadingMore: false
      };
      
    default:
      return state;
  }
};