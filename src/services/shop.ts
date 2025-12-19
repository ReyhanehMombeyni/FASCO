'use server'
import { createClient } from "@/src/supabase/server";
import { GetFilteredProducts, GetFilteredProductsProps, ItemsFilter } from "../types/shop";
import { FilterParams } from "../types/core";


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

export async function getFilteredProducts(
  props: GetFilteredProductsProps
): Promise<GetFilteredProducts> {
  const supabase = await createClient();
  const { filters, currentPage: page, ITEMS_PER_PAGE: limit } = props;

  const start = (page - 1) * limit;
  const end = page * limit - 1;

  let min_price: number | null = null;
  let max_price: number | null = null;
  const rangeFilterValue = filters.range;

  if (rangeFilterValue) {
    const rangeNumber = Number(rangeFilterValue);
    
    if (rangeNumber >= 1 && rangeNumber <= 4) {
      min_price = rangeNumber * 50 - 50;
      max_price = rangeNumber * 50;
    } else if (rangeNumber === 5) {
      min_price = 200;
      max_price = 300;      
    } else if(rangeNumber === 6) {
      min_price = 300;
      max_price = 400;      
    }
  }

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
      if (filterKey === "range") continue;
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

  if (min_price !== null) {
      query = query.gte('price', min_price);
  }
  if (max_price !== null) {
      query = query.lte('price', max_price);
  }

  const { data: products, error, count } = await query.range(start, end);

  if (error) {
    console.error("Error fetching filtered products:", error);
    return { products: [], count: 0 };
  }

  return { products: products || [], count: count || 0 };
}
