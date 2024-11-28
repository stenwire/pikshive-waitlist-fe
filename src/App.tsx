import React, { useState } from 'react';
import { 
  Globe, 
  Camera, 
  Wallet, 
  Star, 
  Check 
} from 'lucide-react';

const PikshiveLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Camera className="w-12 h-12 text-blue-600" />,
      title: "Showcase Your Work",
      description: "Create private and public collections to display your creative portfolio."
    },
    {
      icon: <Wallet className="w-12 h-12 text-green-600" />,
      title: "Monetize Your Talent",
      description: "Easily receive payments and donations through our integrated digital wallet."
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-600" />,
      title: "Build Your Brand",
      description: "Develop a professional online presence in the creator economy."
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup logic
    alert(`Thank you for your interest, ${email}!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 01-4.176-3.97l-.534-1.902a2 2 0 00-1.908-1.452H4.664a1 1 0 00-.979.796A18.424 18.424 0 003 12c0 5.303 4.084 9.636 9.214 10 3.09-1.09 5.744-3.152 7.244-6.264a2 2 0 00-.03-1.732z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">Pikshive</span>
          </div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Elevate Your Creative Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Pikshive empowers creators to showcase, monetize, and grow their digital presence with an intuitive platform designed for photographers, designers, and visual artists.
        </p>
        
        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex space-x-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Join Waitlist
          </button>
        </form>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Designed for Creators, By Creators
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Pikshive?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-6">
                {[
                  "Professional Portfolio Creation",
                  "Secure Payment Processing",
                  "Customizable Digital Galleries",
                  "Client and Public Collection Management"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-6 h-6 text-green-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-xl backdrop-blur-md">
                <Star className="w-16 h-16 mx-auto text-yellow-300 mb-4" />
                <p className="text-center italic">
                  "Pikshive transformed how I showcase and monetize my creative work."
                </p>
                <p className="text-center mt-2 font-bold text-white/80">
                  - Sarah J., Photographer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Pikshive. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PikshiveLandingPage;