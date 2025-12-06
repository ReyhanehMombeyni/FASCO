import { Card, CardContent } from "@/components/ui";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  colors?: string[];
  sizes?: string[];
}

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="rounded-none border-none shadow-none p-0 m-0">
    <CardContent className="p-0 m-0">
      <div className="relative h-35 w-full bg-yellow-900 overflow-hidden">
        {/* <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        /> */}
        {/* شما می‌توانید هدر "New" یا "Sale" را اینجا اضافه کنید */}
      </div>

      <div className="pl-1 py-1 m-0">
        {/* <h4 className="text-[8px] font-light text-gray-500 mb-1">Category Name</h4> */}
        <h1 className="text-[8px] tracking-tighter hover:text-gray-500 transition-colors cursor-pointer">
          {product.name}
        </h1>
        <p className="text-[8px]">
          {product.oldPrice && (
            <span className="line-through text-gray-400 mr-2">${product.oldPrice.toFixed(2)}</span>
          )}
          <span className="text-black">${product.price.toFixed(2)}</span>
        </p>
        
        {(product.colors || product.sizes) && (
          <div className="flex mt-1 space-x-0.5">
            {product.colors && product.colors.map((color) => (
              <span 
                key={color} 
                className="w-2.5 h-2.5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              ></span>
            ))}
            {/* {product.sizes && product.sizes.map((size) => (
              <span 
                key={size} 
                className="text-xs text-gray-500"
              >
                {size}
              </span>
            ))} */}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);


export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}