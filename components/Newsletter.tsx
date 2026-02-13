
import React from 'react';

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
      <div className="max-w-4xl mx-auto bg-lavender/30 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blush/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cream/50 rounded-full blur-3xl"></div>
        
        <h2 className="text-3xl sm:text-4xl font-serif text-charcoal mb-4">Join the Inner Circle</h2>
        <p className="text-charcoal/60 max-w-md mx-auto mb-8 font-light">
          Get 15% off your first order and exclusive access to new collection drops.
        </p>

        {subscribed ? (
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl animate-in zoom-in-95 duration-300">
            <p className="text-blush font-medium text-lg">Thank you for joining us! 🌙✨</p>
            <p className="text-charcoal/60 text-sm mt-1">Check your inbox for your welcome discount.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-8 py-4 rounded-full bg-white border border-transparent focus:border-blush focus:outline-none transition-all"
              required
            />
            <button
              type="submit"
              className="bg-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-blush hover:text-charcoal transition-all shadow-lg whitespace-nowrap"
            >
              Sign Me Up
            </button>
          </form>
        )}
        
        <p className="mt-8 text-[10px] text-charcoal/40 uppercase tracking-widest">
          By signing up, you agree to our privacy policy and terms.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
