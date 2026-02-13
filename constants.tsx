import { Product, Review } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Satin Loop',
    price: 499,
    category: 'Satin',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1620331311520-246422ff83f9?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: 'A luxurious black satin scrunchie that glides effortlessly over your hair.'
  },
  {
    id: '2',
    name: 'Blush Silk Whisper',
    price: 999,
    category: 'Silk',
    color: 'Pink',
    image: 'https://images.unsplash.com/photo-1630138222108-1f514750616b?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: '100% pure Mulberry silk for ultimate hair protection and elegance.'
  },
  {
    id: '3',
    name: 'Lavender Velvet Cloud',
    price: 649,
    category: 'Velvet',
    color: 'Lavender',
    image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Soft, plush velvet in a dreamy lavender hue.'
  },
  {
    id: '4',
    name: 'Champagne Satin Dream',
    price: 499,
    category: 'Satin',
    color: 'Cream',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    description: 'A glowing cream satin scrunchie perfect for everyday wear.'
  },
  {
    id: '5',
    name: 'Rose Silk Luxe',
    price: 1299,
    category: 'Silk',
    color: 'Rose',
    image: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Rich rose silk that adds a touch of royalty to any hairstyle.'
  },
  {
    id: '6',
    name: 'Sage Velvet Loop',
    price: 649,
    category: 'Velvet',
    color: 'Sage',
    image: 'https://images.unsplash.com/photo-1634128221971-89e47d4e5114?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    description: 'Earth-toned velvet for a grounded, stylish look.'
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