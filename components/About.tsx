import React from 'react';
import { Heart, Sparkles, Leaf } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart size={32} className="text-blush" />,
      title: 'Hair Friendly',
      desc: 'No kinks, no pulls. Designed to protect your hair from breakage.'
    },
    {
      icon: <Sparkles size={32} className="text-lavender" />,
      title: 'Handmade with Love',
      desc: 'Each piece is carefully crafted for the perfect loop and lasting quality.'
    },
    {
      icon: <Leaf size={32} className="text-mint" />,
      title: 'Sustainable Choice',
      desc: 'We use high-quality, long-lasting fabrics to reduce hair accessory waste.'
    }
  ];

  return (
    <section className="py-20 bg-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">Our Story</h2>
        <h3 className="text-3xl sm:text-4xl font-serif text-charcoal mb-12">The Luna Loops Promise</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {values.map((v, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 transition-transform duration-300 group-hover:-translate-y-2">
                {v.icon}
              </div>
              <h4 className="text-xl font-serif text-charcoal mb-3">{v.title}</h4>
              <p className="text-charcoal/60 leading-relaxed font-light">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="relative">
            <div className="absolute inset-0 bg-blush/20 rounded-full translate-x-4 translate-y-4 -z-10"></div>
            <img src="https://images.unsplash.com/photo-1611095973763-4140195a243d?auto=format&fit=crop&q=80&w=600" alt="Luna Loops Aesthetic" className="w-64 h-64 rounded-full object-cover shadow-xl border-8 border-white" />
          </div>
          <div className="text-left">
            <p className="text-charcoal/80 italic text-lg leading-relaxed mb-4">
              "Luna Loops started as a solution for my own hair journey. I wanted something that looked like jewelry for the hair, but acted like a protective barrier."
            </p>
            <p className="font-serif text-charcoal">— Sarah, Founder of Luna Loops</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;