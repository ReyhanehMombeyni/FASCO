import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search } from "lucide-react";
import { createClient } from "@/src/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { ProductSearch } from "@/src/types/products";

export function SearchDrawer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearch[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.rpc("global_search", {
          search_query: query,
        });
        if (!error) {
          setResults(data);
          console.log(data);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const clickHandler = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <Search className="h-5 w-5 text-gray-700 hover:text-black" />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" /> Global Search
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 relative shadow-2xl">
          <Input
            placeholder="search Name, Brand, Color Or Tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-3 animate-spin w-4 h-4 text-gray-400" />
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-150px)] mt-6 pr-4">
          <div className="space-y-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block p-2 border rounded-lg hover:bg-accent"
                onClick={clickHandler}
              >
                <div className="grid grid-cols-4 gap-3 items-center">
                  <div className="col-span-1 relative h-20 w-16">
                    <Image src={product.image_url || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col col-span-3">
                    <span className="font-medium text-sm line-clamp-1">{product.name}</span>
                    {product.brand_name && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {product.brand_name}
                      </span>
                    )}
                    {product.collection_name && (
                      <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {product.collection_name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            {query.length > 2 && results.length === 0 && !loading && (
              <p className="text-center text-sm text-muted-foreground">
                Not Founde Result!
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
