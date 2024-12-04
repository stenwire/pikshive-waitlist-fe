import React, { useState } from 'react';
import { 
  Camera, 
  Wallet, 
  Globe, 
  Check,
  X,
  Users 
} from 'lucide-react';

const PikshiveLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(1247);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate waitlist submission
    setWaitlistCount(prevCount => prevCount + 1);
    
    // Open modal after submission
    setIsModalOpen(true);
    
    // Reset email
    setEmail('');
  };

  const WhatsAppModal = () => {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl max-w-md w-full relative">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center text-white">
            <Check className="w-16 h-16 mx-auto text-green-400 mb-4" />
            <h2 className="text-3xl font-bold mb-4">You're on the Waitlist!</h2>
            <p className="text-white/80 mb-6">
              We've added you to our exclusive Pikshive community. Join our WhatsApp group to stay updated.
            </p>
            
            <a 
              href="https://whatsapp.com/pikshive-community" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#5e3cd1] px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              Join WhatsApp Group
            </a>
            
            <p className="text-xs text-white/50 mt-4">
              By joining, you'll get:
              • Early access updates
              • Community insights
              • Exclusive creator tips
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5e3cd1] via-[#4a5fd8] to-[#36a1e3] text-white">
      {isModalOpen && <WhatsAppModal />}
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">Pikshive</div>
          <div className="space-x-4">
            <a href="#features" className="text-white/80 hover:text-white">Features</a>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Unleash Your Creative Potential
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Pikshive is the ultimate platform for photographers, designers, and visual creators to showcase, monetize, and grow their digital portfolios.
          </p>

          <div className="flex items-center justify-center mb-4">
            <Users className="w-6 h-6 mr-2" />
            <span className="text-lg">{waitlistCount.toLocaleString()} creators already joined</span>
          </div>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-[#5e3cd1] px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              Join Waitlist
            </button>
          </form>
        </div>

        <div className="mt-24 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-12 h-12" />,
                title: "Portfolio Showcase",
                description: "Create stunning digital galleries that highlight your unique style."
              },
              {
                icon: <Wallet className="w-12 h-12" />,
                title: "Monetize Creativity",
                description: "Receive payments and donations directly through your profile."
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Build Your Brand",
                description: "Grow your online presence in the creator economy."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">For Creatives, By Creatives</h2>
            <ul className="space-y-4">
              {[
                "Professional Portfolio Management",
                "Secure Payment Processing",
                "Customizable Digital Galleries",
                "Client and Public Collection Sharing"
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl">
            <p className="italic text-center mb-4">
              "Pikshive will transform how ypu showcase and monetize your photography work."
            </p>
            <p className="text-center font-bold text-white/80">
              - Meso Shot, Professional Photographer
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Real Creators, Real Stories</h2>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl">
            <iframe 
              width="100%" 
              height="500" 
              src="https://www.youtube.com/embed/CMqw9usH8-8" 
              title="Creator Showcase Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            <p className="mt-4 text-center text-white/80">
              Clip created by: <a 
                href="https://www.youtube.com/@fakeplastictree1553" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-white"
              >
                @fakeplastictree1553
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 text-center">
        <p>&copy; 2024 Pikshive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PikshiveLandingPage;