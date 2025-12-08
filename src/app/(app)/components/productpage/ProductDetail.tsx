'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductDetailType } from '@/src/actions/products';
import { Star, Minus, Plus } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';

interface ProductDetailClientProps {
    product: ProductDetailType;
    // discountPercent: number;
}

export const ProductDetail = ({ product }: ProductDetailClientProps) => {
    // discountPercent
    // const [selectedSize, setSelectedSize] = useState<string | null>(null);
    // const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    
    const handleAddToCart = () => {
        // if (!selectedSize || !selectedColor) {
        //     alert("Please select both size and color.");
        //     return;
        // }
        // console.log({ 
        //     action: 'Add to Cart', 
        //     product: product.name, 
        //     size: selectedSize, 
        //     color: selectedColor, 
        //     qty: quantity 
        // });
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:pt-2 font-serif">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-500">
                    {Array(Math.floor(product.rating)).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-500" />)}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
                <span className="text-2xl lg:text-3xl lg:font-normal font-semibold text-gray-800">${product.price.toFixed(2)}</span>
                {/* {product.oldPrice && (
                    <>
                        <span className="text-lg line-through text-gray-400">${product.oldPrice.toFixed(2)}</span>
                        {discountPercent > 0 && (  <div>SAVE {discountPercent}%</div>
                            // <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                            //     SAVE {discountPercent}%
                            // </Badge>
                        )}
                    </>
                )} */}
            </div>

            <div className='lg:py-4'>
                <p className="text-sm md:text-base text-red-500">Only n item(s) left in stock!</p> 
                {/* {product.stock} */}
                <div className='hidden lg:block lg:h-1 w-full'>for nemodar</div>
            </div>


            <div className="pt-2">
                <p className="text-sm md:text-base font-medium mb-2">Size: <span className="font-normal">none</span></p>
                {/* {selectedSize || 'None'} */}
                <div className="flex space-x-2"> size part
                    {/* {product.availableSizes.map(size => (
                        <Button
                            key={size}
                            variant={selectedSize === size ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-10 h-10"
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))} */}
                </div>
            </div>

            <div className="pt-2">
                <p className="text-sm md:text-base font-medium mb-2">Color: <span className="font-normal">none</span></p> 
                {/* {selectedColor || 'None'} */}
                <div className="flex space-x-2"> color part
                    {/* {product.availableColors.map(color => (
                        <button
                            key={color.name}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                                selectedColor === color.name ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-300 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(color.name)}
                        ></button>
                    ))} */}
                </div>
            </div>
            
            <div className="flex space-x-4 pt-4 lg:pt-8">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center border-y-0 border-x rounded-none h-8 p-0"
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => setQuantity(q => q + 1)}
                        // disabled={quantity >= product.stock}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <Button 
                    size="lg" 
                    className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
                    onClick={handleAddToCart}
                    // disabled={product.stock === 0 || !selectedSize || !selectedColor}
                >
                    Add to cart
                </Button>
            </div>

        </div>
    );
}