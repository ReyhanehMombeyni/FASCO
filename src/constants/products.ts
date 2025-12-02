import dress1 from '@/public/images/homepage/dress1.jpg'
import dress2 from '@/public/images/homepage/dress2.jpg'
import dress3 from '@/public/images/homepage/dress3.jpg'
import dress4 from '@/public/images/homepage/dress4.jpg'
import dress5 from '@/public/images/homepage/dress5.jpg'
import dress6 from '@/public/images/homepage/dress6.jpg'
import { StaticImageData } from 'next/image'

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number; // مثلاً از 1 تا 5
  reviews: number;
  imageUrl: StaticImageData;
  status: 'In Stock' | 'Almost Sold Out' | 'Sold Out';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Shiny Dress',
    category: 'Women\'s Fashion',
    description: 'A stylish and elegant dress.',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress1,
    status: 'Almost Sold Out',
  },
{
    id: '2',
    name: 'Shiny Dress2',
    category: 'Women\'s Fashion2',
    description: 'A stylish and elegant dress.2',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress2, // مسیر عکس شما
    status: 'Almost Sold Out',
  },{
    id: '3',
    name: 'Shiny Dress3',
    category: 'Women\'s Fashion3',
    description: 'A stylish and elegant dress.3',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress3, // مسیر عکس شما
    status: 'Almost Sold Out',
  },{
    id: '4',
    name: 'Shiny Dress4',
    category: 'Women\'s Fashion4',
    description: 'A stylish and elegant dress.4',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress4, // مسیر عکس شما
    status: 'Almost Sold Out',
  },{
    id: '5',
    name: 'Shiny Dress5',
    category: 'Women\'s Fashion5',
    description: 'A stylish and elegant dress.5',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress5, // مسیر عکس شما
    status: 'Almost Sold Out',
  },{
    id: '6',
    name: 'Shiny Dress6',
    category: 'Women\'s Fashion6',
    description: 'A stylish and elegant dress.6',
    price: 95.50,
    rating: 4,
    reviews: 48,
    imageUrl: dress6, // مسیر عکس شما
    status: 'Almost Sold Out',
  },
];