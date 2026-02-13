
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="group relative">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-cream relative">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <button onClick={() => onToggleWishlist(product.id)} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-charcoal hover:text-blush">
          <Heart size={20} className={isWishlisted ? 'fill-blush text-blush' : ''} />
        </button>
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-blush text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Best Seller</span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={() => onAddToCart(product)} className="w-full bg-white/90 backdrop-blur-md text-charcoal py-3 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg hover:bg-blush hover:text-white">
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-serif text-charcoal">{product.name}</h3>
        <p className="text-sm text-charcoal/50 mt-1 uppercase tracking-widest">{product.category}</p>
        <p className="mt-2 text-charcoal font-medium">₹{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
