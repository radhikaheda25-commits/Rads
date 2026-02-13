
import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Satin Loop',
    price: 12,
    category: 'Satin',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1637715103859-6723b7e42d76?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: 'A luxurious black satin scrunchie that glides effortlessly over your hair.'
  },
  {
    id: '2',
    name: 'Blush Silk Whisper',
    price: 18,
    category: 'Silk',
    color: 'Pink',
    image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: '100% pure Mulberry silk for ultimate hair protection and elegance.'
  },
  {
    id: '3',
    name: 'Lavender Velvet Cloud',
    price: 14,
    category: 'Velvet',
    color: 'Lavender',
    image: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Soft, plush velvet in a dreamy lavender hue.'
  },
  {
    id: '4',
    name: 'Creamy Satin Shine',
    price: 12,
    category: 'Satin',
    color: 'Cream',
    image: 'https://images.unsplash.com/photo-1630138222384-5f56f1a8cc39?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: 'A glowing cream satin scrunchie perfect for everyday wear.'
  },
  {
    id: '5',
    name: 'Emerald Silk Luxe',
    price: 22,
    category: 'Silk',
    color: 'Green',
    image: 'https://images.unsplash.com/photo-1634128221971-89e47d4e5114?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Rich emerald silk that adds a touch of royalty to any hairstyle.'
  },
  {
    id: '6',
    name: 'Ruby Velvet Crush',
    price: 14,
    category: 'Velvet',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1634128221901-443317c805a5?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Bold red velvet for those who love to stand out.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sophie L.',
    rating: 5,
    comment: "The softest scrunchies I've ever owned! No hair breakage at all.",
    productName: 'Blush Silk Whisper'
  },
  {
    id: 'r2',
    author: 'Emma R.',
    rating: 5,
    comment: "Obsessed with the packaging and the quality. Truly aesthetic.",
    productName: 'Midnight Satin Loop'
  },
  {
    id: 'r3',
    author: 'Chloe M.',
    rating: 4,
    comment: "Beautiful colors, fast shipping. The velvet is so plush!",
    productName: 'Lavender Velvet Cloud'
  }
];
