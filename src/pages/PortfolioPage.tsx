"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabaseClient';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(9);
  const [visibleTestimonials, setVisibleTestimonials] = useState(4);

  type PortfolioItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    video_url: string;
    tags: string[] | null;
  };

  type Review = {
    id: string;
    first_name: string;
    last_name: string | null;
    profession: string;
    message: string;
    created_at: string;
  };

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const [reviewForm, setReviewForm] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    message: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState<string | null>(null);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  const categories = ['All', 'COMMERCIAL', 'MUSIC VIDEO', 'EVENT', 'DOCUMENTARY', 'SHORT FILE'];

  useEffect(() => {
    let mounted = true;

    async function loadPortfolio() {
      setPortfolioLoading(true);
      setPortfolioError(null);

      const { data, error } = await supabase
        .from('portfolio_items')
        .select('id,title,description,category,video_url,tags')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!mounted) return;
      if (error) {
        setPortfolioError(error.message);
        setPortfolioItems([]);
        setPortfolioLoading(false);
        return;
      }

      setPortfolioItems((data ?? []) as PortfolioItem[]);
      setPortfolioLoading(false);
    }

    async function loadReviews() {
      setReviewsLoading(true);
      setReviewsError(null);

      const { data, error } = await supabase
        .from('reviews')
        .select('id,first_name,last_name,profession,message,created_at')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!mounted) return;
      if (error) {
        setReviewsError(error.message);
        setReviews([]);
        setReviewsLoading(false);
        return;
      }

      setReviews((data ?? []) as Review[]);
      setReviewsLoading(false);
    }

    loadPortfolio();
    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

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

  const displayedTestimonials = reviews.slice(0, visibleTestimonials);
  const hasMoreTestimonials = reviews.length > visibleTestimonials;

  function getYouTubeId(url: string): string | null {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.replace('/', '') || null;
      if (u.hostname.endsWith('youtube.com')) {
        if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1] || null;
        const v = u.searchParams.get('v');
        return v || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  const handleReviewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewSubmitting) return;

    setReviewSubmitting(true);
    setReviewSubmitError(null);
    setReviewSubmitSuccess(false);

    const { error } = await supabase.from('reviews').insert({
      first_name: reviewForm.firstName.trim(),
      last_name: reviewForm.lastName.trim() || null,
      profession: reviewForm.profession.trim(),
      message: reviewForm.message.trim(),
    });

    if (error) {
      setReviewSubmitError(error.message);
      setReviewSubmitting(false);
      return;
    }

    setReviewForm({ firstName: '', lastName: '', profession: '', message: '' });
    setReviewSubmitSuccess(true);
    setReviewSubmitting(false);
  };

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
              { number: "800+", label: "Projects Completed", icon: "🎬" },
              { number: "200+", label: "Happy Clients", icon: "🤝" },
              { number: "14", label: "Awards Won", icon: "🏆" },
              { number: "10", label: "Years Experience", icon: "📅" }
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
          {portfolioLoading ? (
            <div className="text-center text-gray-600">Loading projects…</div>
          ) : portfolioError ? (
            <div className="text-center text-red-600">Unable to load projects. {portfolioError}</div>
          ) : displayedItems.length === 0 ? (
            <div className="text-center text-gray-600">No projects found in this category.</div>
          ) : (
           <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {displayedItems.map((item) => {
                const youtubeId = getYouTubeId(item.video_url);
                const tags = item.tags ?? [];

                return (
                  <div key={item.id} className="group animate-fade-in">
                {/* Video Container */}
                <div className="video-container mb-6 rounded-lg overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                      {youtubeId ? (
                  <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-64"
                  ></iframe>
                      ) : (
                        <a
                          href={item.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-64 flex items-center justify-center bg-gray-900 text-white"
                        >
                          Open video
                        </a>
                      )}
                </div>
                
                {/* Content */}
                <div className="p-6 bg-gray-50 rounded-lg">
                      {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                          {tags.map((tag) => (
                      <span
                              key={tag}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                      )}
                  
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
                );
              })}
          </div>
          )}

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
                  src="https://www.youtube.com/embed/L3NGtqJUE44?rel=0&modestbranding=1&showinfo=0"
                  title="Award Winning Documentary"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
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
            {reviewSubmitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-800">
                Thanks! Your review was submitted and will appear after approval.
              </div>
            )}
            {reviewSubmitError && (
              <div className="mb-6 p-4 bg-red-100 text-red-800">
                Unable to submit review. {reviewSubmitError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-6">
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
                    value={reviewForm.firstName}
                    onChange={handleReviewInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    value={reviewForm.lastName}
                    onChange={handleReviewInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  value={reviewForm.profession}
                  onChange={handleReviewInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  name="message"
                  rows={5}
                  value={reviewForm.message}
                  onChange={handleReviewInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Share your experience working with Fanarts Studio. What made your project special?"
                ></textarea>
              </div>



              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full btn-primary text-lg py-4 transform hover:scale-105 transition-transform duration-200"
                >
                  {reviewSubmitting ? 'Submitting…' : 'Submit Review'}
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
            {reviewsLoading ? (
              <div className="text-center text-gray-600">Loading reviews…</div>
            ) : reviewsError ? (
              <div className="text-center text-red-600">Unable to load reviews. {reviewsError}</div>
            ) : displayedTestimonials.length === 0 ? (
              <div className="text-center text-gray-600">No reviews yet.</div>
            ) : (
              displayedTestimonials.map((review) => {
                const fullName = `${review.first_name}${review.last_name ? ` ${review.last_name}` : ''}`;
                const initials = `${review.first_name?.[0] ?? ''}${review.last_name?.[0] ?? ''}`.toUpperCase() || 'U';

                return (
                  <div
                    key={review.id}
                    className="bg-white p-6 rounded-lg shadow-lg animate-slide-up border-l-4 border-blue-600"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full flex-shrink-0 bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {fullName}
                          </h4>
                          <span className="mx-2 text-gray-400">•</span>
                          <p className="text-sm text-gray-600 font-medium">
                            {review.profession}
                          </p>
                        </div>
                        <p className="text-gray-700 leading-relaxed font-normal italic text-lg">
                          &quot;{review.message}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* View More Testimonials Button */}
          {hasMoreTestimonials && !reviewsLoading && !reviewsError && (
            <div className="text-center mt-12">
              <button
                onClick={handleViewMoreTestimonials}
                className="btn-secondary text-lg px-12 py-4 transform hover:scale-105 transition-transform duration-200"
              >
                View More Reviews
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Showing {displayedTestimonials.length} of {reviews.length} reviews
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