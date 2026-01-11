"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import portraitImage from "../assets/images/chuzih.jpg";
import canvaIcon from "../assets/images/canva-icon.png";
import adobePremiereIcon from "../assets/images/Adobe_Premiere.png";
import afterEffectsIcon from "../assets/images/adobe-after-effects-icon.png";
import davinciResolveIcon from "../assets/images/DaVinci_Resolve_Studio.png";
import photoshopIcon from "../assets/images/Photoshop.png";

type Project = {
  title: string;
  role: string;
  thumbnail: string;
  href: string;
};

function getYouTubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;
}

function LazyYouTubeEmbed({
  videoId,
  title,
  thumbnailUrl,
}: {
  videoId: string;
  title: string;
  thumbnailUrl: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedUrl = useMemo(() => getYouTubeEmbedUrl(videoId), [videoId]);

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-white/10 bg-black shadow-2xl">
      {/* 16:9 wrapper */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {isLoaded ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 group"
            aria-label={`Play: ${title}`}
          >
            <Image
              src={thumbnailUrl}
              alt={`${title} thumbnail`}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-4 rounded-sm bg-white/10 px-6 py-4 backdrop-blur-md border border-white/15">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 border border-white/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="text-white font-medium tracking-wide">Play Featured Reel</div>
                  <div className="text-xs text-gray-200 tracking-wider uppercase">16:9 • YouTube</div>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function DirectorPortfolioPage() {
  const directorName = "CHUZIH DADIDO";
  const clientsWorkedWith = [
    "Grace Decca",
    "Pascal Siakam",
    "Mimie",
    "Pricewaterhousecoopers",
    "Stevens music",
    "Kocee",
    "Akumba Music",
    "Axcel Merryl",
    "Tema Crush",
    "Krys M",
    "Phillbill",
    "Dj Ararat",
    "Aloch 237",
    "Afriland First Bank",
  ];
  const softwareMastered = [
    { name: "Adobe Premiere Pro", icon: adobePremiereIcon },
    { name: "DaVinci Resolve", icon: davinciResolveIcon },
    { name: "Adobe After Effects", icon: afterEffectsIcon },
    { name: "Adobe Photoshop", icon: photoshopIcon },
    { name: "Canva", icon: canvaIcon },
  ] as const;

  const projects: Project[] = [
    {
      title: "Brand Film — The Modern Classic",
      role: "Director",
      thumbnail:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
    {
      title: "Commercial — Precision & Pace",
      role: "Writer/chuzih",
      thumbnail:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
    {
      title: "Music Video — Neon Poetics",
      role: "Director",
      thumbnail:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
    {
      title: "Documentary — Cultural Heritage",
      role: "Director",
      thumbnail:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
    {
      title: "Event Film — Moments That Matter",
      role: "Director",
      thumbnail:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
    {
      title: "Short Film — Quiet Tension",
      role: "Writer/chuzih",
      thumbnail:
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=800&fit=crop&auto=format&q=80",
      href: "https://www.youtube.com/",
    },
  ];

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero / Featured Reel */}
        <header className="relative overflow-hidden gradient-dark">
          <div className="absolute inset-0 gradient-overlay" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="flex items-center justify-between gap-6 mb-10">
              <div>
                <p className="text-xs tracking-widest text-gray-300 uppercase mb-3 font-medium">
                  Video Director Portfolio
                </p>
                <h1 className="luxury-heading text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight">
                  {directorName}
                </h1>
                <p className="text-amber-300 text-sm font-medium tracking-wider uppercase mt-3">
                  Director’s Reel
                </p>
              </div>

              
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8">
                <LazyYouTubeEmbed
                  videoId="L3NGtqJUE44"
                  title="CHUZIH HERBERT — Director’s Reel"
                  thumbnailUrl="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&h=900&fit=crop&auto=format&q=80"
                />
              </div>
              <div className="lg:col-span-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8">
                  <h2 className="luxury-heading text-2xl font-normal text-white mb-4">
                    A Cinematic Approach
                  </h2>
                  <p className="text-gray-200 leading-relaxed font-normal">
                    I direct with a focus on performance, rhythm, and detail, balancing bold visuals
                    language with clean narrative intent. From commercials to documentary work, my goal is
                    always the same: create images that feel relatable and true.
                  </p>
                  <div className="mt-8 space-y-3">
                    <a href="mailto:directorchuzih@gmail.com" className="btn-primary px-10 py-4 text-center w-full">
                      Contact
                    </a>
                    <a 
                      href="https://wa.me/237675848228" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary px-10 py-4 text-center w-full flex items-center justify-center gap-2"
                    >
                     
                    Contact  WhatsApp
                    </a>
                  </div>
                </div>

                <Link
                  href="/"
                  className="sm:hidden mt-6 inline-flex btn-secondary px-8 py-4 w-full justify-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Work Grid */}
        <section id="work" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Selected Work
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-gray-900 leading-tight">
                The Work
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal mt-4">
                A curated collection of commercial, documentary, and narrative projects.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <article className="relative overflow-hidden rounded-sm border border-gray-200 bg-gray-100 shadow-lg">
                    <div className="relative w-full h-64">
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="text-white">
                          <div className="text-sm tracking-widest uppercase text-gray-200">
                            {p.role}
                          </div>
                          <h3 className="luxury-heading text-2xl font-normal leading-snug mt-2">
                            {p.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Software Mastered */}
        <section className="relative py-24 gradient-dark overflow-hidden">
          <div className="absolute inset-0 gradient-overlay" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="text-xs tracking-widest text-gray-300 uppercase mb-4 font-medium">
                Tools
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-white leading-tight">
                Software Mastered
              </h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-normal mt-4">
                The core tools used across editing, color, motion design, and post-production.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {softwareMastered.map((tool) => (
                <div
                  key={tool.name}
                  className="min-w-0 rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl p-2.5 flex items-center gap-2"
                >
                  <div className="flex-none h-18 w-18 rounded-sm bg-white/10 border border-white/15 flex items-center justify-center">
                    <Image
                      src={tool.icon}
                      alt={`${tool.name} logo`}
                      width={60}
                      height={60}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-white tracking-wide leading-snug whitespace-normal break-words" title={tool.name}>
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-300 tracking-widest uppercase mt-1">
                      Post / Editing
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Director Bio */}
        <section className="py-24 bg-gray-50 diagonal-top diagonal-bottom">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-14 items-start">
              <div className="lg:col-span-5">
                <figure className="relative overflow-hidden rounded-sm shadow-2xl border border-white/60 bg-white">
                  <Image
                    src={portraitImage}
                    alt="On-set portrait — Chuzih Herbert"
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover"
                    priority={false}
                  />
                </figure>
              </div>

              <div className="lg:col-span-7">
                <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                  Director’s Bio
                </div>
                <h2 className="luxury-heading text-5xl font-normal text-gray-900 mb-8 leading-tight">
                  Directorial<br />
                  <span className="text-blue-800 italic">Statement</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-normal">
                    I’m {directorName}, a director focused on clean storytelling and premium craft.
                    I love building images that feel effortless—where composition, movement, and performance
                    work together to make the story land.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-normal">
                    Whether it’s a high-energy commercial or an intimate documentary moment, I approach every
                    set with calm leadership, precise execution, and a strong collaborative spirit.
                  </p>
                </div>

                <div className="mt-10">
                  <Link href="/contact" className="btn-primary px-12 py-4">
                    Contact the Director
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients + Specialties */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">
                Credits
              </div>
              <h2 className="luxury-heading text-5xl font-normal text-gray-900 leading-tight">
                Clients & Specialties
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal mt-4">
                A selection of artists and brands, plus the types of work I specialize in.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8">
                <div className="bg-white rounded-sm border border-gray-200 shadow-lg p-10">
                  <h3 className="luxury-heading text-3xl font-normal text-gray-900 mb-6">
                    Selected Clients
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {clientsWorkedWith.map((client) => (
                      <div
                        key={client}
                        className="min-w-0 flex items-center gap-3 rounded-sm border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm"
                      >
                        <span className="h-2 w-2 flex-none rounded-full bg-blue-600" aria-hidden="true" />
                        <span
                          className="min-w-0 truncate text-sm font-medium tracking-wide"
                          title={client}
                        >
                          {client}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-white rounded-sm border border-gray-200 shadow-lg p-10">
                  <h3 className="luxury-heading text-3xl font-normal text-gray-900 mb-6">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Commercials", "Music Videos", "Documentary", "Narrative Shorts"].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-sm border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}



