"use client";

import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import heroImage from '../assets/images/hero-pic.jpg';

export default function HomePage() {
  return (
    <Layout isHomePage={true}>
      {/* Luxury Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-dark">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <Image
            src={heroImage}
            alt="Professional video production setup with cameras and lighting equipment"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8) contrast(1.9)' }}
            width={1920}
            height={1080}
          />
        </div>
        
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 gradient-overlay"></div>
        
        {/* Hero Content - Unconventional Layout */}
        <div className="relative z-10 max-w-none mx-auto px-6 lg:px-4 animate-fade-in">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen">
            <div className="lg:col-span-8 lg:col-start-1">
              <h1 className="mb-6 leading-none text-white font-bold text-6xl lg:text-7xl font-sans tracking-wide">
                CAMEROON PHASE OF<br />
                <span className="text-amber-300">ENTERTAINMENT</span>
              </h1>
              <h2 className="luxury-heading mb-8 leading-tight text-white font-normal text-3xl lg:text-4xl">
                Crafting <span className="text-amber-300 italic">Visual Stories</span> That Transcend
              </h2>
              <div className="mb-12">
                <p className="text-lg text-gray-200 leading-relaxed font-serif max-w-md">
                  We transform your vision into compelling visual narratives through cinematic storytelling 
                  and uncompromising excellence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="btn-primary">
                  Begin Your Project
                </button>
                <button className="btn-secondary">
                  Explore Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric About Section */}
      <section id="about" className="py-32 bg-gray-50 diagonal-top">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:col-start-8 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                About Our Studio
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                Cameroon Phase of<br />
                <span className="text-blue-800 italic">Entertainment</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  With over a decade of experience in visual storytelling, we&apos;ve redefined the boundaries 
                  of video production. Our approach marries artistic vision with technical mastery.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  Every frame we capture, every story we tell, is crafted with meticulous attention 
                  to detail and an unwavering commitment to excellence.
                </p>
              </div>
              <button className="btn-accent mt-10">
                Discover Our Process
              </button>
            </div>
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 animate-fade-in">
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&h=500&fit=crop"
                  alt="Video production team"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
                  width={700}
                  height={500}
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Grid Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-15 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Our Services
            </div>
            <h2 className="luxury-heading text-6xl font-normal text-gray-900 mb-6 leading-tight">
              Excellence in Every<br />
              <span className="text-blue-800 italic">Frame</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
              From concept to completion, we offer comprehensive video production services 
              that elevate your brand and captivate your audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: "Commercial Production",
                description: "Sophisticated brand storytelling that drives engagement and conversion through strategic visual narratives.",
                image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop",
                features: ["Brand Films", "Product Videos", "Corporate Stories"]
              },
              {
                title: "Event Documentation",
                description: "Comprehensive coverage that captures the essence and emotion of your most important moments.",
                image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
                features: ["Weddings", "Corporate Events", "Celebrations"]
              },
              {
                title: "Documentary Films",
                description: "Compelling narratives that tell authentic stories with emotional depth.",
                image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Music Videos",
                description: "Creative visual interpretations that capture artistic essence.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Post-Production",
                description: "Expert editing, color grading, and visual effects mastery.",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="service-card-bg"
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed font-normal text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-6">
              <div className="text-xs tracking-widest text-gray-400 uppercase mb-4 font-medium">
                Selected Works
              </div>
              <h2 className="luxury-heading text-7xl font-normal text-white leading-tight">
                Featured<br />
                <span className="text-amber-300 italic">Projects</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-xl text-gray-300 font-normal leading-relaxed">
                Explore our latest projects that showcase the intersection of creative vision 
                and technical excellence.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            {[
              {
                title: "Cinematic Movie Trailer",
                description: "Epic storytelling with dramatic visuals and professional cinematography",
                youtubeId: "s7e15NOpsVE",
                category: "Movie Trailer",
                colSpan: "lg:col-span-8"
              },
              {
                title: "Music Video Production",
                description: "Creative visual narrative with artistic direction and dynamic editing",
                youtubeId: "D65vWyvCnKA",
                category: "Music Video",
                colSpan: "lg:col-span-4"
              },
              {
                title: "Short Film",
                description: "Compelling narrative storytelling with professional production values",
                youtubeId: "qJrh2KorSSg",
                category: "Short Film",
                colSpan: "lg:col-span-4"
              },
              {
                title: "Tutorial Production",
                description: "Educational content with clear visual communication and expert editing",
                youtubeId: "h0t5J59hjT8",
                category: "Tutorial",
                colSpan: "lg:col-span-8 lg:col-start-5"
              }
            ].map((work, index) => (
              <div key={index} className={`group ${work.colSpan}`}>
                <div className="video-container mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${work.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                    title={work.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <p className="text-sm text-amber-300 font-medium tracking-wider uppercase mb-2">
                    {work.category}
                  </p>
                  <h3 className="text-xl font-normal text-white luxury-heading mb-2">
                    {work.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-normal leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-16 py-5">
              Collaborate With Us
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials - Editorial Layout */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Client Testimonials
              </div>
              <h2 className="luxury-heading text-7xl font-normal text-gray-900 leading-tight">
                What Our<br />
                <span className="text-blue-800 italic">Clients Say</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                quote: "Cameroon Phase of Entertainment redefined our brand narrative with extraordinary precision and artistic vision.",
                author: "Sarah Johnson",
                position: "Creative Director, TechFlow",
                featured: true
              },
              {
                quote: "Their storytelling approach is unparalleled. Every frame captures emotion and purpose.",
                author: "Michael Chen",
                position: "CEO, StartupHub"
              },
              {
                quote: "The production quality and creative excellence delivered results beyond our expectations.",
                author: "Emma Rodriguez",
                position: "Brand Director, InnovaCorp"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="mb-8 text-3xl text-blue-800 opacity-60">❝</div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 font-normal italic">
                  {testimonial.quote}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 tracking-wide">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 font-normal">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
} 