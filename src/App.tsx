import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Wallet, 
  Globe, 
  Check,
  X,
  Users,
  MessageCircleMore
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PikshiveLandingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  // Image data with sources
  const creatorImages = [
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-rsekoua-2402239.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-planeteelevene-16197729.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-planeteelevene-30730014.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-alameenng-30743705.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-planeteelevene-30756897.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-mwabonje-1820919.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-nappy-3063910.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    },
    {
      url: "https://pixhive.s3.us-east-2.amazonaws.com/images/pexels-edson-habacuc-rafael-317292-904332.jpg",
      source: "https://www.pexels.com/search/nigerian/"
    }
  ];

  // Improved scrolling logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = creatorImages.length * 320; // 300px width + 20px gap
    let currentPosition = 0;
    
    const scroll = () => {
      currentPosition = (currentPosition + 1) % totalWidth;
      setScrollPosition(currentPosition);

      // Reset when reaching the end
      if (currentPosition >= totalWidth / 2) {
        currentPosition = 0;
        setScrollPosition(0);
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [creatorImages.length]);

  // Image lazy loading
  const imageObserver = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    imageObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          if (imageObserver.current) {
            imageObserver.current.unobserve(img);
          }
        }
      });
    });
  }, []);

  // Fetch waitlist count on component mount
  useEffect(() => {
    fetchWaitlistStats();
  }, []);

  const fetchWaitlistStats = async () => {
    try {
      const response = await fetch("https://satisfactory-sheela-sten-2711061c.koyeb.app/api/v1/waitlist/stats/");
      const data = await response.json();
      if (data && data.total_entries) {
        setWaitlistCount(data.total_entries);
      }
    } catch (error) {
      console.error("Failed to fetch waitlist stats:", error);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://satisfactory-sheela-sten-2711061c.koyeb.app/api/v1/waitlist/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      
      if (response.ok) {
        // Refresh waitlist count after successful submission
        fetchWaitlistStats();
        
        // Open modal after submission
        setIsModalOpen(true);
        
        // Reset phone number
        setPhoneNumber('');
      } else {
        const errorData = await response.json();
        if (errorData.phone_number) {
          toast.error(errorData.phone_number[0]);
        } else {
          toast.error("Failed to join waitlist. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting phone number:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
              We've added you to our exclusive Pikshive waitlist. Join our WhatsApp group to stay updated.
            </p>
            
            <a 
              href="https://chat.whatsapp.com/DOhYvCwFlilFvhIE2nrOGp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#5e3cd1] px-6 py-3 rounded-full hover:opacity-90 transition flex items-center justify-center space-x-2"
            >
              <MessageCircleMore className="w-6 h-6" />
              <span>Join WhatsApp Community</span>
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
    <div className="min-h-screen bg-black text-white">
      <ToastContainer />
      {isModalOpen && <WhatsAppModal />}
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">Pikshive</div>
          <div className="space-x-4">
            <a 
              href="https://chat.whatsapp.com/DOhYvCwFlilFvhIE2nrOGp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition flex items-center space-x-2"
            >
              <MessageCircleMore className="w-6 h-6" />
              <span>Join</span>
            </a>
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

          <form onSubmit={handlePhoneSubmit} className="max-w-md mx-auto flex space-x-2">
            <input 
              type="tel" 
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-grow px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
              required
              pattern="^[0-9+\s\-()]+$"
              title="Please enter a valid phone number"
            />
            <button 
              type="submit" 
              className="bg-white text-[#5e3cd1] px-6 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        </div>

        <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Showcase Your Creativity 🌟</h2>
          <div className="relative overflow-hidden rounded-xl">
            <div 
              ref={scrollRef}
              className="flex gap-5 transition-transform duration-500 ease-linear"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                width: `${creatorImages.length * 320}px`
              }}
            >
              {[...creatorImages, ...creatorImages].map((image, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 rounded-lg overflow-hidden w-[300px] h-[400px] bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <img 
                    data-src={image.url}
                    alt={`Creator ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    ref={el => {
                      if (el) {
                        if (imageObserver.current) {
                          imageObserver.current.observe(el);
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <a 
                      href={image.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:underline"
                    >
                      Source: Pexels
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        <div className="mt-24 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Get Elevated 🤘🚀</h2>
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
              "Pikshive will transform how you showcase and monetize your photography work."
            </p>
            <p className="text-center font-bold text-white/80">
              - Meso Shot, Professional Photographer
            </p>
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Showcase Your Creativity</h2>
          <div className="relative overflow-hidden rounded-xl">
            <div 
              ref={scrollRef}
              className="flex gap-5 transition-transform duration-500 ease-linear"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                width: `${creatorImages.length * 320}px`
              }}
            >
              {[...creatorImages, ...creatorImages].map((image, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 rounded-lg overflow-hidden w-[300px] h-[400px] bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <img 
                    data-src={image.url}
                    alt={`Creator ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    ref={el => {
                      if (el) {
                        if (imageObserver.current) {
                          imageObserver.current.observe(el);
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <a 
                      href={image.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:underline"
                    >
                      Source: Pexels
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <footer className="container mx-auto px-4 py-12 text-center">
        <p>&copy; 2025 Pikshive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PikshiveLandingPage;