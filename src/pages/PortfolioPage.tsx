"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(9);
  const [visibleTestimonials, setVisibleTestimonials] = useState(4);

  const portfolioItems = [
    // Commercial Production
    {
      title: "Corporate Brand Film",
      description: "Premium brand storytelling that captures company values and vision through cinematic excellence.",
      youtubeId: "s7e15NOpsVE",
      category: "Commercial",
      tags: ["Brand Film", "Corporate", "Storytelling"]
    },
    {
      title: "Product Launch Campaign",
      description: "Dynamic product showcase highlighting innovation and market positioning.",
      youtubeId: "D65vWyvCnKA",
      category: "Commercial",
      tags: ["Product Video", "Launch", "Marketing"]
    },
    {
      title: "Company Culture Video",
      description: "Authentic portrayal of workplace culture and team dynamics.",
      youtubeId: "qJrh2KorSSg", 
      category: "Commercial",
      tags: ["Corporate", "Culture", "Team"]
    },

    // Music Videos
    {
      title: "Artistic Music Video",
      description: "Creative visual interpretation with artistic direction and dynamic cinematography.",
      youtubeId: "h0t5J59hjT8",
      category: "Music Videos",
      tags: ["Music Video", "Creative", "Artistic"]
    },
    {
      title: "Performance Music Video",
      description: "High-energy performance capture with multi-camera production.",
      youtubeId: "s7e15NOpsVE",
      category: "Music Videos", 
      tags: ["Performance", "Multi-Camera", "Live"]
    },
    {
      title: "Conceptual Music Video",
      description: "Narrative-driven music video with conceptual storytelling elements.",
      youtubeId: "D65vWyvCnKA",
      category: "Music Videos",
      tags: ["Conceptual", "Narrative", "Storytelling"]
    },

    // Event Documentation
    {
      title: "Luxury Wedding Film",
      description: "Cinematic wedding documentation capturing intimate moments and celebration.",
      youtubeId: "qJrh2KorSSg",
      category: "Events",
      tags: ["Wedding", "Cinematic", "Celebration"]
    },
    {
      title: "Corporate Conference",
      description: "Professional event coverage with keynote highlights and networking moments.",
      youtubeId: "h0t5J59hjT8",
      category: "Events",
      tags: ["Conference", "Corporate", "Professional"]
    },
    {
      title: "Gala Event Coverage",
      description: "Elegant documentation of formal gala with award presentations.",
      youtubeId: "s7e15NOpsVE",
      category: "Events",
      tags: ["Gala", "Awards", "Formal"]
    },

    // Documentary Films
    {
      title: "Cultural Documentary",
      description: "In-depth exploration of cultural heritage with authentic storytelling.",
      youtubeId: "D65vWyvCnKA",
      category: "Documentary",
      tags: ["Cultural", "Heritage", "Authentic"]
    },
    {
      title: "Business Success Story",
      description: "Compelling narrative of entrepreneurial journey and business growth.",
      youtubeId: "qJrh2KorSSg",
      category: "Documentary", 
      tags: ["Business", "Success", "Entrepreneurial"]
    },
    {
      title: "Community Impact Film",
      description: "Powerful documentary showcasing community initiatives and social impact.",
      youtubeId: "h0t5J59hjT8",
      category: "Documentary",
      tags: ["Community", "Impact", "Social"]
    }
  ];

  const categories = ['All', 'Commercial', 'Music Videos', 'Events', 'Documentary'];

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMoreItems = filteredItems.length > visibleItems;

  const handleViewMore = () => {
    setVisibleItems(prev => prev + 9);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleItems(9); // Reset to 9 items when changing category
  };

  const handleViewMoreTestimonials = () => {
    setVisibleTestimonials(prev => prev + 4);
  };

  const allTestimonials = [
    {
      quote: "Their portfolio speaks volumes about their artistic vision and technical expertise. Every project exceeds expectations.",
      author: "Sarah Johnson",
      position: "Creative Director, TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Working with Cameroon Phase was transformative. They captured our brand story with unparalleled creativity.",
      author: "Michael Chen", 
      position: "CEO, StartupHub",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The quality of their portfolio convinced us immediately. The final result was beyond our highest expectations.",
      author: "Emma Rodriguez",
      position: "Brand Director, InnovaCorp", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Exceptional storytelling and cinematography. They turned our corporate event into a compelling narrative.",
      author: "David Kim",
      position: "Marketing Director, TechCorp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Professional, creative, and delivered exactly what we envisioned. Highly recommend their video production services.",
      author: "Lisa Wang",
      position: "Founder, Creative Studio",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Outstanding work on our documentary project. They captured the essence of our community beautifully.",
      author: "James Thompson",
      position: "Non-Profit Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Their music video production exceeded all expectations. Creative vision combined with technical excellence.",
      author: "Maria Santos",
      position: "Music Producer",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "From concept to final delivery, the entire process was seamless. True professionals in every sense.",
      author: "Robert Johnson",
      position: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Cameroon Phase brought our wedding day to life in ways we never imagined. Absolutely stunning work.",
      author: "Jennifer Lee",
      position: "Bride",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Their commercial production elevated our brand presence. The ROI on their video content has been incredible.",
      author: "Alex Morgan",
      position: "CMO, RetailPlus",
      avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const displayedTestimonials = allTestimonials.slice(0, visibleTestimonials);
  const hasMoreTestimonials = allTestimonials.length > visibleTestimonials;

  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden gradient-dark">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop"
            alt="Professional video production portfolio showcase"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.2)' }}
            priority
          />
        </div>
        
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 gradient-overlay"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="luxury-heading mb-6 leading-none text-white font-normal text-6xl lg:text-7xl">
            Our Creative<br />
            <span className="text-amber-300 italic">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed font-normal max-w-2xl mx-auto">
            Explore our collection of exceptional video productions that showcase 
            our commitment to visual excellence and compelling storytelling.
          </p>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "150+", label: "Projects Completed", icon: "🎬" },
              { number: "50+", label: "Happy Clients", icon: "🤝" },
              { number: "8", label: "Awards Won", icon: "🏆" },
              { number: "5", label: "Years Experience", icon: "📅" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Filter & Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Featured Works
        </div>
            <h2 className="luxury-heading text-6xl font-normal text-gray-900 mb-8 leading-tight">
              Excellence in<br />
              <span className="text-blue-800 italic">Every Project</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Discover our diverse portfolio spanning commercial productions, music videos, 
              event documentation, and documentary films.
                </p>
              </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
                         {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => handleCategoryChange(category)}
                 className={`px-8 py-3 font-medium transition-all duration-300 ${
                   activeCategory === category
                     ? 'bg-blue-600 text-white shadow-lg'
                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                 }`}
               >
                 {category}
               </button>
             ))}
          </div>

                     {/* Portfolio Grid */}
           <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
             {displayedItems.map((item, index) => (
              <div key={index} className="group animate-fade-in">
                {/* Video Container */}
                <div className="video-container mb-6 rounded-lg overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64"
                  ></iframe>
                </div>
                
                {/* Content */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-normal text-gray-900 luxury-heading mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed font-normal text-sm">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {hasMoreItems && (
            <div className="text-center mt-12">
              <button
                onClick={handleViewMore}
                className="btn-secondary text-lg px-12 py-4 transform hover:scale-105 transition-transform duration-200"
              >
                View More Projects
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Showing {displayedItems.length} of {filteredItems.length} projects
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Showcase */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-400 uppercase mb-4 font-medium">
              Award Winning Work
            </div>
            <h2 className="luxury-heading text-5xl font-normal text-white mb-8 leading-tight">
              Featured<br />
              <span className="text-amber-300 italic">Masterpiece</span>
            </h2>
            </div>
            
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="video-container rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/s7e15NOpsVE?rel=0&modestbranding=1&showinfo=0"
                  title="Award Winning Documentary"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-96"
                ></iframe>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🏆</span>
                <span className="text-amber-300 font-medium text-sm uppercase tracking-wider">
                  Best Documentary 2023
                </span>
              </div>
              
              <h3 className="luxury-heading text-3xl font-normal text-white mb-6 leading-tight">
                Cultural Heritage<br />
                <span className="text-amber-300 italic">Documentary</span>
              </h3>
              
              <p className="text-gray-300 leading-relaxed font-normal mb-8">
                An award-winning exploration of cultural traditions that bridges generations 
                through powerful storytelling and exceptional cinematography. This documentary 
                showcases our ability to capture authentic human experiences.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Best Documentary - Film Festival 2023
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Audience Choice Award
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  International Recognition
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Review Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Share Your Experience
            </div>
            <h2 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
              Leave a<br />
              <span className="text-blue-800 italic">Review</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
              We&apos;d love to hear about your experience working with us. Your feedback helps us 
              continue delivering exceptional video production services.
            </p>
          </div>

          <div className="bg-gray-50 p-8 shadow-lg">
            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Profession */}
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                  Profession <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Creative Director, CEO, Marketing Manager"
                />
              </div>

              {/* Review Content */}
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Share your experience working with Cameroon Phase of Entertainment. What made your project special?"
                ></textarea>
              </div>



              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4 transform hover:scale-105 transition-transform duration-200"
                >
                  Submit Review
                </button>
              </div>

              {/* Privacy Note */}
              <div className="text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By submitting this review, you agree to our privacy policy. 
                  Your review may be featured on our website and marketing materials.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Client Testimonials
            </div>
            <h2 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
              What Our<br />
              <span className="text-blue-800 italic">Clients Say</span>
            </h2>
          </div>
          
                    <div className="space-y-6">
            {displayedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg animate-slide-up border-l-4 border-blue-600">
                <div className="flex items-start space-x-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonial.author}
                      </h4>
                      <span className="mx-2 text-gray-400">•</span>
                      <p className="text-sm text-gray-600 font-medium">
                        {testimonial.position}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-normal italic text-lg">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Testimonials Button */}
          {hasMoreTestimonials && (
            <div className="text-center mt-12">
              <button
                onClick={handleViewMoreTestimonials}
                className="btn-secondary text-lg px-12 py-4 transform hover:scale-105 transition-transform duration-200"
              >
                View More Reviews
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Showing {displayedTestimonials.length} of {allTestimonials.length} reviews
              </p>
            </div>
          )}
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary text-lg px-12 py-4">
              Start Your Project
            </button>
            <button className="btn-secondary text-lg px-12 py-4">
              View Our Services
            </button>
          </div>
        </div>
      </section>

    </Layout>
  );
}