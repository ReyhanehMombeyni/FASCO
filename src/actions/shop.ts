import { createClient } from "@/src/supabase/server";
import { Product } from "./products";
interface Name {
  id: string;
  name: string;
}
interface Size {
  id: string;
  name: string;
  symbol: string;
}
export interface Color {
  id: string;
  name: string;
  code: string;
}

export interface ItemsFilter {
  sizes: Size[] | [];
  collections: Name[] | [];
  brands: Name[] | [];
  colors: Color[] | [];
  tags: Name[] | [];
}
interface FilterParams {
  size: string | null;
  color: string | null;
  brand: string | null;
  collection: string | null;
  tag: string | null;
}

interface GetFilteredProductsProps {
  filters: FilterParams;
  currentPage: number;
  ITEMS_PER_PAGE: number;
}

interface GetFilteredProducts {
  products: Product[];
  count: number;
}

export async function getItemsFilter(): Promise<ItemsFilter> {
  const supabase = await createClient();
  const { data: sizes, error: sizesError } = await supabase
    .from("sizes")
    .select("*");
  const { data: collections, error: collectionsError } = await supabase
    .from("collections")
    .select("*");
  const { data: brands, error: brandsError } = await supabase
    .from("brands")
    .select("*");
  const { data: colors, error: colorsError } = await supabase
    .from("colors")
    .select("*");
  const { data: tags, error: tagsError } = await supabase
    .from("tags")
    .select("*");

  if (
    sizesError ||
    collectionsError ||
    brandsError ||
    colorsError ||
    tagsError
  ) {
    console.error("Error fetching filters:", {
      sizesError,
      collectionsError,
      brandsError,
      colorsError,
      tagsError,
    });
    return {
      sizes: [],
      collections: [],
      brands: [],
      colors: [],
      tags: [],
    };
  }
  return {
    sizes: sizes || [],
    collections: collections || [],
    brands: brands || [],
    colors: colors || [],
    tags: tags || [],
  } as ItemsFilter;
}

export async function getFilteredProducts(props: GetFilteredProductsProps): Promise<GetFilteredProducts> {

  const supabase = await createClient();
  const {filters, currentPage: page, ITEMS_PER_PAGE: limit}= props;

  const start = (page - 1) * limit;
  const end = page * limit - 1;
  
  let query = supabase
    .from("products")
    .select(
      `*, product_sizes!inner(*), product_colors!inner(
    colors (
      id,
      name,
      code
    )
  ), product_tags!inner(*)`,
      { count: "exact" }
    )
    .range(start, end);

  const singleValueMap: { [key: string]: string } = {
    brand: "brand_id",
    collection: "collection_id",
  };

  const multiValueMap: { [key: string]: string } = {
    size: "product_sizes.size_id",
    color: "product_colors.color_id",
    tag: "product_tags.tag_id",
  };

  for (const key in filters) {
    const filterKey = key as keyof FilterParams;
    const filterValue = filters[filterKey];

    if (filterValue) {
      if (
        filterKey === "size" ||
        filterKey === "color" ||
        filterKey === "tag"
      ) {
        const joinSyntax = multiValueMap[filterKey];
        query = query.filter(joinSyntax, "eq", filterValue);

        console.log(`Applying Join Filter: ${joinSyntax} = ${filterValue}`);
      } else if (filterKey === "brand" || filterKey === "collection") {
        const columnName = singleValueMap[filterKey];
        query = query.eq(columnName, filterValue);

        console.log(`Applying EQ Filter: ${columnName} = ${filterValue}`);
      }
    }
  }

  const { data: products, error, count } = await query;

  if (error) {
    console.error("Error fetching filtered products:", error);
    return { products: [], count: 0 };
  }

  return { products: products || [], count: count || 0 };
}
