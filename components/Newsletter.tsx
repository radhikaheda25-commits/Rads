import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blush/20 flex flex-col lg:flex-row">
        {/* Left Side: Image */}
        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=800" 
            alt="Luna Loops Aesthetic" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blush/10 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
            <div className="max-w-xs">
              <Sparkles className="mx-auto mb-6 text-lavender" size={48} />
              <h3 className="text-3xl font-serif mb-4 leading-tight">Elevate Every Hairstyle</h3>
              <p className="text-sm tracking-widest uppercase opacity-90 font-medium">Exclusive Perks Await</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-cream/20 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-lavender/20 rounded-full blur-[80px] -z-10"></div>
          
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal mb-4">Join the Inner Circle</h2>
            <p className="text-charcoal/60 mb-8 font-light leading-relaxed">
              Get 15% off your first order and stay updated with our newest limited-edition silk and satin drops.
            </p>

            {subscribed ? (
              <div className="bg-blush/10 backdrop-blur-md p-8 rounded-3xl border border-blush/20 text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-blush">
                  <Mail size={32} strokeWidth={1.5} />
                </div>
                <p className="text-charcoal font-serif text-xl mb-1">You're on the list! 🌙✨</p>
                <p className="text-charcoal/60 text-sm">Check your inbox for your 15% welcome gift.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-8 py-5 rounded-full bg-white border border-blush/10 focus:border-blush focus:outline-none transition-all duration-300 shadow-sm pr-16"
                    required
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-blush">
                    <Mail size={20} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-charcoal text-white px-10 py-5 rounded-full font-bold hover:bg-blush hover:text-charcoal transition-all duration-300 shadow-xl uppercase tracking-[0.2em] text-xs"
                >
                  Unlock 15% Off
                </button>
              </form>
            )}
            
            <div className="mt-8 flex items-center justify-center space-x-4 opacity-30">
              <div className="h-px w-8 bg-charcoal"></div>
              <p className="text-[10px] text-charcoal uppercase tracking-[0.3em]">
                Unsubscribe anytime
              </p>
              <div className="h-px w-8 bg-charcoal"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;