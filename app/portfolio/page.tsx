'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
}

interface ProjectCardProps {
  project: Project;
  position: number;
  currentIndex: number;
  onNext?: () => void;
  onPrev?: () => void;
}

function ProjectCard({ project, position, currentIndex, onNext, onPrev }: ProjectCardProps) {
  const isActive = position === currentIndex;

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
        border: isActive ? '2px solid rgba(26, 77, 46, 0.18)' : '1px solid rgba(26, 77, 46, 0.12)',
        borderRadius: isActive ? '8px' : '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isActive
          ? '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          : '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        willChange: 'transform, opacity'
      }}
    >
      {/* Navigation Buttons - Only visible on active card */}
      {isActive && onNext && onPrev && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <button
            onClick={onPrev}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(139, 115, 85, 0.12)',
              border: '2px solid rgba(139, 115, 85, 0.25)',
              color: '#5C4A3A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.35)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.25)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={onNext}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(139, 115, 85, 0.12)',
              border: '2px solid rgba(139, 115, 85, 0.25)',
              color: '#5C4A3A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.35)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.25)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Moderne E-Commerce-Lösung mit React, Next.js und Stripe Integration. Vollständig responsive mit optimierter Performance und SEO.',
      tech: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
      year: '2024'
    },
    {
      id: 2,
      title: 'Corporate Website',
      category: 'Web Design',
      description: 'Unternehmenswebsite mit CMS-Integration, mehrsprachiger Unterstützung und DSGVO-konformen Formularen.',
      tech: ['React', 'Contentful', 'i18n', 'Framer Motion'],
      year: '2024'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'Web Application',
      description: 'Komplexes Analytics-Dashboard mit Echtzeit-Daten, interaktiven Charts und benutzerdefinierten Reports.',
      tech: ['React', 'Chart.js', 'WebSockets', 'PostgreSQL'],
      year: '2023'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'Web Design',
      description: 'Kreative Portfolio-Website für einen Fotografen mit Gallery-Feature und Kontaktformular.',
      tech: ['Next.js', 'Sanity CMS', 'Lightbox', 'GSAP'],
      year: '2023'
    },
    {
      id: 5,
      title: 'Mobile App Landing',
      category: 'Marketing Website',
      description: 'Landing Page für Mobile App mit App Store Integration, Video-Background und Download-Tracking.',
      tech: ['Next.js', 'Vercel Analytics', 'Motion Design'],
      year: '2024'
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setRotation((prev) => prev - anglePerCard); // Rotate left (negative)
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setRotation((prev) => prev + anglePerCard); // Rotate right (positive)
  };

  // Calculate rotation angle for the carousel
  const anglePerCard = 360 / projects.length; // 72 degrees for 5 cards
  const radius = 450; // Distance from center (reduced from 650)

  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <Breadcrumbs />
      <PageTransition>
        <div className="relative z-10">
          {/* Hero Section */}
          <section style={{
            minHeight: '35vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
            paddingTop: '120px',
            paddingBottom: '40px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '800px' }}
            >
              <div style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: 'rgba(26, 77, 46, 0.25)',
                border: '1px solid rgba(26, 77, 46, 0.5)',
                borderRadius: '4px',
                color: '#F5F3ED',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}>
                PORTFOLIO
              </div>

              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '56px',
                fontWeight: 700,
                lineHeight: 1,
                color: '#F5F3ED',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '24px',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
              }}>
                Ausgewählte<br />Projekte
              </h1>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(245, 243, 237, 0.85)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                Ein Einblick in meine bisherigen Arbeiten
              </p>
            </motion.div>
          </section>

          {/* Carousel Section */}
          <section style={{
            minHeight: '65vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 40px 120px',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* 3D Carousel Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '550px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '2000px',
                perspectiveOrigin: 'center center'
              }}>
                {/* Carousel Ring */}
                <motion.div
                  animate={{
                    rotateY: rotation
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  style={{
                    position: 'relative',
                    width: '480px',
                    height: '500px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {projects.map((project, index) => {
                    // Calculate angle for this card
                    const angle = index * anglePerCard;

                    // Calculate relative position to current index
                    const diff = (index - currentIndex + projects.length) % projects.length;
                    const normalizedDiff = diff > projects.length / 2 ? diff - projects.length : diff;

                    // Calculate opacity and brightness based on distance from front
                    const distance = Math.abs(normalizedDiff);

                    // Make all cards visible with varying opacity
                    let opacity = 1;
                    if (distance === 1) opacity = 0.6; // Adjacent cards
                    else if (distance === 2) opacity = 0.3; // Behind cards

                    const brightness = distance === 0 ? 1 : Math.max(0.65, 1 - (distance * 0.18));

                    // Z-index based on distance (closer = higher)
                    const zIndex = 10 - distance;

                    return (
                      <div
                        key={project.id}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          left: 0,
                          top: 0,
                          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                          transformStyle: 'preserve-3d',
                          opacity: opacity,
                          filter: `brightness(${brightness})`,
                          transition: 'opacity 0.7s ease, filter 0.7s ease',
                          pointerEvents: index === currentIndex ? 'auto' : 'none',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          zIndex: zIndex
                        }}
                      >
                        <ProjectCard
                          project={project}
                          position={index}
                          currentIndex={currentIndex}
                          onNext={index === currentIndex ? nextProject : undefined}
                          onPrev={index === currentIndex ? prevProject : undefined}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Dots Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '50px'
              }}>
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      width: index === currentIndex ? '32px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: index === currentIndex
                        ? 'rgba(26, 77, 46, 0.6)'
                        : 'rgba(26, 77, 46, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
