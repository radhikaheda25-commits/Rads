import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1634128221971-89e47d4e5114?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">Luna Lifestyle</h2>
          <h3 className="text-3xl sm:text-4xl font-serif text-charcoal">Tag us @LunaLoops</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((src, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden rounded-3xl group ${i % 2 === 0 ? 'mt-0' : 'md:mt-12'}`}
            >
              <img 
                src={src} 
                alt="Lifestyle" 
                className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blush/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;