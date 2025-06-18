"use client";

import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function AboutPage() {

  const teamMembers = [
    {
      name: "Emmanuel Nguema",
      role: "Creative Director & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary leader with 15+ years in cinematic storytelling and brand narrative development."
    },
    {
      name: "Sarah Mbeki",
      role: "Lead Cinematographer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Award-winning cinematographer specializing in commercial and documentary filmmaking."
    },
    {
      name: "David Tchami",
      role: "Post-Production Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Master of visual effects and color grading with expertise in cutting-edge editing technologies."
    },
    {
      name: "Grace Fotso",
      role: "Producer & Project Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Strategic producer ensuring seamless project execution from concept to final delivery."
    },
    {
      name: "Michael Biya",
      role: "Sound Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Audio specialist creating immersive soundscapes that enhance visual storytelling."
    },
    {
      name: "Aminata Kone",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      bio: "Brand strategist connecting our creative work with target audiences across multiple platforms."
    }
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden gradient-dark">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
            alt="Creative team collaborating in modern studio environment"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.2)' }}
          />
        </div>
        
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 gradient-overlay"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="luxury-heading mb-6 leading-none text-white font-normal text-6xl lg:text-7xl">
            About Our<br />
            <span className="text-amber-300 italic">Creative Journey</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed font-normal max-w-2xl mx-auto">
            Discover the story behind Cameroon Phase of Entertainment and the passionate team 
            that brings your visions to life through exceptional storytelling.
          </p>
        </div>
      </section>

      {/* Company Overview & History */}
      <section className="py-32 bg-gray-50 diagonal-top">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Our Story
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                A Decade of<br />
                <span className="text-blue-800 italic">Visual Excellence</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  Founded in 2014, Cameroon Phase of Entertainment emerged from a simple yet powerful vision: 
                  to transform the landscape of visual storytelling in Central Africa. What began as a small 
                  collective of passionate filmmakers has evolved into a premier production house renowned 
                  for its artistic integrity and technical excellence.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  Over the past decade, we've had the privilege of working with leading brands, emerging 
                  artists, and visionary organizations across Cameroon and beyond. Our journey has been 
                  marked by countless stories told, emotions captured, and boundaries pushed in pursuit 
                  of cinematic perfection.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  From our humble beginnings in Douala to becoming a recognized name in the industry, 
                  we've remained committed to our core belief: every project deserves the same level 
                  of dedication, creativity, and craftsmanship, regardless of scale or budget.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 animate-fade-in">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Team collaborating on creative project"
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500 opacity-20 rounded-lg"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 opacity-10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-32 gradient-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* CEO Image - Left Side */}
            <div className="lg:col-span-5 animate-fade-in">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face"
                  alt="Emmanuel Nguema - CEO & Founder"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-700 border-4 border-white/10"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-amber-400 opacity-30 rounded-2xl"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-amber-500 to-blue-500 opacity-25 rounded-2xl"></div>
              </div>
            </div>

            {/* CEO Content - Right Side */}
            <div className="lg:col-span-7 animate-slide-up">
              <div className="text-xs tracking-widest text-gray-400 uppercase mb-4 font-medium">
                Leadership
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-white mb-6 leading-tight">
                Meet Our<br />
                <span className="text-amber-300 italic">Visionary Leader</span>
              </h2>
              
              <h3 className="text-2xl font-medium text-white mb-2 tracking-wide">
                Emmanuel Nguema
              </h3>
              <p className="text-amber-300 text-sm font-medium tracking-wider uppercase mb-8">
                Chief Executive Officer & Founder
              </p>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed font-normal">
                  Emmanuel Nguema's journey began with a camera in hand and a vision that would eventually 
                  reshape the entertainment landscape of Central Africa. With over 15 years of experience 
                  in cinematic storytelling, he founded Cameroon Phase of Entertainment on the principle 
                  that every story deserves to be told with passion and precision.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed font-normal">
                  Under his leadership, CPE has evolved from a small creative collective into a powerhouse 
                  of visual innovation. Emmanuel's unique approach combines traditional African storytelling 
                  techniques with cutting-edge production methods, creating a distinctive voice that resonates 
                  both locally and internationally.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed font-normal">
                  His commitment to nurturing emerging talent and fostering creative collaboration has made 
                  CPE not just a production company, but a catalyst for the next generation of African 
                  filmmakers and content creators.
                </p>
              </div>

              {/* CEO Achievements */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <p className="text-sm text-gray-300 font-medium">Years Experience</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors duration-300">
                  <div className="text-3xl font-bold text-amber-400 mb-2">200+</div>
                  <p className="text-sm text-gray-300 font-medium">Projects Delivered</p>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-10 border-l-4 border-amber-300 pl-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-r-lg">
                <p className="text-lg text-gray-200 italic leading-relaxed font-normal">
                  "Our mission is not just to create content, but to craft experiences that transcend 
                  cultural boundaries and connect people through the universal language of visual storytelling."
                </p>
                <p className="text-sm text-gray-400 mt-3 font-medium">
                  — Emmanuel Nguema, CEO & Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 bg-white diagonal-top diagonal-bottom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
              Our Purpose
            </div>
            <h2 className="luxury-heading text-6xl font-normal text-gray-900 leading-tight mb-8">
              Vision &<br />
              <span className="text-blue-800 italic">Mission</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">👁️</span>
                </div>
                <h3 className="luxury-heading text-3xl font-normal text-gray-900 mb-4">
                  Our <span className="text-blue-800 italic">Vision</span>
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-normal text-center">
                To be the leading creative force in African visual storytelling, setting new standards 
                for cinematic excellence while preserving and celebrating our rich cultural heritage. 
                We envision a future where African stories captivate global audiences through the 
                power of exceptional filmmaking and innovative narrative techniques.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="luxury-heading text-3xl font-normal text-gray-900 mb-4">
                  Our <span className="text-amber-600 italic">Mission</span>
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-normal text-center">
                To craft compelling visual narratives that transcend boundaries and connect hearts. 
                We are committed to delivering unparalleled production quality, fostering creative 
                collaboration, and empowering brands and individuals to share their stories with 
                authenticity, passion, and artistic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 gradient-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-xs tracking-widest text-gray-400 uppercase mb-4 font-medium">
              Meet Our Team
            </div>
            <h2 className="luxury-heading text-6xl font-normal text-white leading-tight mb-8">
              Creative<br />
              <span className="text-amber-300 italic">Visionaries</span>
            </h2>
            <p className="text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto">
              Our diverse team of storytellers, technicians, and creative professionals 
              brings decades of combined experience to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:border-amber-300/50 transition-all duration-500"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  </div>
                  
                  <h3 className="luxury-heading text-xl font-normal text-white mb-2 tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <p className="text-amber-300 text-sm font-medium tracking-wider uppercase mb-4">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-400 text-sm leading-relaxed font-normal group-hover:text-gray-300 transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="btn-primary text-lg px-12 py-4">
              Join Our Team
            </button>
          </div>
        </div>
      </section>

    </Layout>
  );
}