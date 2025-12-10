import { createClient } from "@/src/supabase/server";
interface Name {
  id: string;
  name: string;
}
interface Size {
  id: string;
  name: string;
  symbol: string;
}
interface Color {
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

export async function getFilteredProducts(filters: FilterParams) {
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  const filterMap: { [key in keyof FilterParams]: string } = {
    size: "size_id",
    color: "color_id",
    brand: "brand_id",
    collection: "collection_id",
    tag: "tag_id",
  };

  for (const key in filters) {
    const filterKey = key as keyof FilterParams; 
    const filterValue = filters[filterKey]; 
    const columnName = filterMap[filterKey];

    if (filterValue) {
      query = query.eq(columnName, filterValue);
    }
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching filtered products:", error);
    return [];
  }

  return products || [];
}
