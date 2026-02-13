
import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">What Our Loops Say</h2>
          <h3 className="text-3xl sm:text-4xl font-serif text-charcoal">Trusted by Hair Lovers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-cream/20 p-8 rounded-3xl border border-blush/10 hover:shadow-xl transition-all duration-300 group">
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-blush text-blush" />
                ))}
              </div>
              <p className="text-charcoal/80 leading-relaxed mb-6 italic">"{review.comment}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blush/30 rounded-full flex items-center justify-center font-serif text-blush">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">{review.author}</h4>
                  <p className="text-xs text-charcoal/40">Purchased {review.productName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
