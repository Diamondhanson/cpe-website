"use client";

import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function ServicesPage() {
  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden gradient-dark">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop"
            alt="Professional video production services and equipment"
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
            <span className="text-amber-300 italic">Services</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed font-normal max-w-2xl mx-auto">
            Comprehensive video production solutions tailored to bring your vision to life 
            through exceptional storytelling and technical excellence.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              What We Do
            </div>
            <h2 className="luxury-heading text-6xl font-normal text-gray-900 mb-8 leading-tight">
              Excellence in Every<br />
              <span className="text-blue-800 italic">Frame</span>
          </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              From concept to completion, we offer comprehensive video production services 
              that elevate your brand and captivate your audience through powerful visual storytelling.
            </p>
          </div>
        </div>
      </section> */}

      {/* Commercial Production */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Brand Storytelling
              </div>
              <h3 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                Commercial<br />
                <span className="text-blue-800 italic">Production</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-normal mb-8">
                Transform your brand narrative through sophisticated visual storytelling that drives engagement 
                and conversion. Our commercial productions combine strategic thinking with creative excellence 
                to deliver content that resonates with your target audience.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Brand Films</h4>
                    <p className="text-gray-600">Cinematic storytelling that captures your brand&apos;s essence and values.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Product Videos</h4>
                    <p className="text-gray-600">Dynamic showcases that highlight features and benefits in compelling ways.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Corporate Stories</h4>
                    <p className="text-gray-600">Professional content for internal communications and corporate messaging.</p>
                  </div>
                </div>
              </div>
              
              <button className="btn-primary">
                Discuss Your Project
              </button>
            </div>
            <div className="lg:col-span-6 animate-fade-in">
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=700&h=500&fit=crop"
                  alt="Commercial video production setup"
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 opacity-20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Documentation */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Capturing Moments
              </div>
              <h3 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                Event<br />
                <span className="text-blue-800 italic">Documentation</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-normal mb-8">
                Comprehensive coverage that captures the essence and emotion of your most important moments. 
                From intimate celebrations to large-scale corporate events, we document every meaningful 
                detail with artistic precision.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Weddings</h4>
                    <p className="text-gray-600">Cinematic wedding films that preserve your special day forever.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Corporate Events</h4>
                    <p className="text-gray-600">Professional coverage of conferences, launches, and business gatherings.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Celebrations</h4>
                    <p className="text-gray-600">Personal milestones and special occasions captured with artistic flair.</p>
                  </div>
                </div>
              </div>

              <button className="btn-primary">
                View Event Gallery
              </button>
                </div>
            <div className="lg:col-span-6 lg:order-1 animate-fade-in">
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&h=500&fit=crop"
                  alt="Event videography and documentation"
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500 opacity-20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary Films */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Authentic Storytelling
              </div>
              <h3 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                Documentary<br />
                <span className="text-blue-800 italic">Films</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-normal mb-8">
                Compelling narratives that tell authentic stories with emotional depth. Our documentary 
                approach reveals truth through careful observation, intimate interviews, and artful 
                cinematography that honors the subjects we film.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Documentaries Produced</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                  <div className="text-sm text-gray-600">Awards Received</div>
                </div>
              </div>
              
              <button className="btn-accent">
                Explore Our Stories
              </button>
            </div>
            <div className="lg:col-span-6 animate-fade-in">
              <div className="relative">
                <Image 
                  src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=700&h=500&fit=crop"
                  alt="Documentary filmmaking"
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500 opacity-20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Videos & Post-Production */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-400 uppercase mb-4 font-medium">
              Creative Excellence
            </div>
            <h3 className="luxury-heading text-5xl font-normal text-white mb-8 leading-tight">
              Music Videos &<br />
              <span className="text-amber-300 italic">Post-Production</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Music Videos */}
            <div className="animate-slide-up">
              <div className="relative mb-8">
                <Image 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
                  alt="Music video production"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-normal text-white luxury-heading mb-2">Music Videos</h4>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed font-normal mb-6">
                Creative visual interpretations that capture artistic essence. We collaborate with musicians 
                to create compelling visual narratives that enhance their musical storytelling.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Concept Development & Storyboarding
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Multi-Camera Production
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Creative Direction & Styling
                </li>
              </ul>
            </div>

            {/* Post-Production */}
            <div className="animate-slide-up">
              <div className="relative mb-8">
                <Image 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                  alt="Post-production editing suite"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-normal text-white luxury-heading mb-2">Post-Production</h4>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed font-normal mb-6">
                Expert editing, color grading, and visual effects mastery. Our post-production team 
                transforms raw footage into polished, professional content that exceeds expectations.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Professional Video Editing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Color Grading & Correction
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Visual Effects & Motion Graphics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Our Process
            </div>
            <h3 className="luxury-heading text-6xl font-normal text-gray-900 mb-8 leading-tight">
              From Concept to<br />
              <span className="text-blue-800 italic">Completion</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Every project follows our proven methodology that ensures exceptional results and seamless collaboration.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300 hidden lg:block"></div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your vision, goals, and requirements through detailed consultation."
                },
                {
                  step: "02", 
                  title: "Planning",
                  description: "Developing creative concepts, storyboards, and production timelines."
                },
                {
                  step: "03",
                  title: "Production",
                  description: "Professional filming with state-of-the-art equipment and experienced crew."
                },
                {
                  step: "04",
                  title: "Delivery",
                  description: "Expert post-production and final delivery in your preferred formats."
                }
              ].map((item, index) => (
                <div key={index} className="text-center animate-slide-up relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                    {item.step}
                  </div>
                  {/* Arrow - only show between steps, not after the last one */}
                  {index < 3 && (
                    <div className="absolute top-8 -right-4 transform translate-x-1/2 hidden lg:block">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary text-lg px-12 py-4">
              Start Your Project
            </button>
           
          </div>
    </div>
      </section>

      {/* CTA Section */}
      

    </Layout>
  );
} 