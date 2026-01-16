'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';

// Portfolio Projects Data
const projects = [
  {
    id: 1,
    title: 'Luis Travels',
    category: 'Travel Blog',
    url: 'https://luistravels.com',
    description: 'Ein moderner Reise-Blog mit CMS-Integration, optimiert für Performance und SEO. Die Website präsentiert Reiseberichte, Fotogalerien und Reisetipps in einem ansprechenden, responsiven Design.',
    image: '/pictures/luistravels.com-screenshot.png',
    mobileImage: '/pictures/luistravels.com-smartphonescreenshot.jpg',
    techStack: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS', 'Vercel', 'Image Optimization'],
    features: [
      'Headless CMS Integration',
      'Responsive Design',
      'SEO Optimiert',
      'Image Optimization',
      'Fast Page Loads',
      'Blog & Gallery Features'
    ]
  }
  // More projects can be added here
];

export default function Portfolio() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    setIsDragging(false);
  };

  // Mobile Carousel Render
  if (isMobile) {
    const currentProject = projects[currentIndex];

    return (
      <main className="min-h-screen flex flex-col">
        <AnimatedBackground />
        <Navigation />
        <PageTransition>
          <div className="relative z-10">
            {/* Hero Section - Mobile */}
            <section style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '120px 20px 24px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', maxWidth: '360px', width: '100%' }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '8px 18px',
                  background: 'rgba(26, 77, 46, 0.25)',
                  border: '1px solid rgba(26, 77, 46, 0.5)',
                  borderRadius: '4px',
                  color: '#F5F3ED',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                }}>
                  PORTFOLIO
                </div>

                <h1 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '40px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#F5F3ED',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
                }}>
                  {projects.length > 1 ? 'Ausgewählte Projekte' : 'Ausgewähltes Projekt'}
                </h1>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(245, 243, 237, 0.85)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                  marginBottom: '12px'
                }}>
                  Ein Einblick in meine Arbeit
                </p>

                {/* Project Counter */}
                {projects.length > 1 && (
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(245, 243, 237, 0.6)',
                    letterSpacing: '1px'
                  }}>
                    {currentIndex + 1} / {projects.length}
                  </div>
                )}
              </motion.div>
            </section>

            {/* Carousel Section - Mobile */}
            <section style={{
              position: 'relative',
              padding: '0 0 40px',
              overflow: 'hidden'
            }}>
              {/* Swipeable Cards Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                padding: '0 20px',
                marginBottom: '32px'
              }}>
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  animate={{ x: -currentIndex * (window.innerWidth - 40) }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      style={{
                        minWidth: 'calc(100vw - 40px)',
                        maxWidth: 'calc(100vw - 40px)',
                        flexShrink: 0
                      }}
                    >
                      {/* Project Card */}
                      <div style={{
                        background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                        border: '2px solid rgba(26, 77, 46, 0.18)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      }}>
                        {/* Image */}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => isDragging && e.preventDefault()}
                          style={{
                            position: 'relative',
                            display: 'block',
                            width: '100%',
                            height: '280px',
                            overflow: 'hidden',
                            borderBottom: '2px solid rgba(26, 77, 46, 0.12)'
                          }}
                        >
                          <Image
                            src={project.mobileImage}
                            alt={`${project.title} - ${project.category}`}
                            fill
                            style={{
                              objectFit: 'cover',
                              objectPosition: '50% 15%'
                            }}
                            priority={index === 0}
                          />

                          {/* Tap Hint */}
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            padding: '8px 16px',
                            background: 'rgba(245, 243, 237, 0.95)',
                            border: '2px solid rgba(26, 77, 46, 0.3)',
                            borderRadius: '6px',
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#3E2E1F',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                          }}>
                            Tap zum Öffnen
                          </div>
                        </a>

                        {/* Content */}
                        <div style={{ padding: '24px' }}>
                          {/* Category Badge */}
                          <div style={{
                            display: 'inline-block',
                            padding: '5px 12px',
                            background: 'rgba(139, 115, 85, 0.1)',
                            border: '1px solid rgba(139, 115, 85, 0.2)',
                            borderRadius: '4px',
                            marginBottom: '14px'
                          }}>
                            <span style={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#8B7355',
                              letterSpacing: '1px',
                              textTransform: 'uppercase'
                            }}>
                              {project.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '28px',
                            fontWeight: 700,
                            color: '#3E2E1F',
                            letterSpacing: '-0.02em',
                            marginBottom: '8px',
                            lineHeight: 1.1
                          }}>
                            {project.title}
                          </h2>

                          {/* URL */}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => isDragging && e.preventDefault()}
                            style={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontSize: '15px',
                              fontWeight: 500,
                              color: '#8B7355',
                              textDecoration: 'none',
                              marginBottom: '16px',
                              display: 'inline-block'
                            }}
                          >
                            {project.url.replace('https://', '')} ↗
                          </a>

                          {/* Description */}
                          <p style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '15px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: '#4A3428',
                            marginBottom: '20px'
                          }}>
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div style={{ marginBottom: '20px' }}>
                            <h3 style={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#8B7355',
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              marginBottom: '12px'
                            }}>
                              Tech Stack
                            </h3>
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '8px'
                            }}>
                              {project.techStack.slice(0, 6).map((tech) => (
                                <span
                                  key={tech}
                                  style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#5C4A3A',
                                    background: 'rgba(139, 115, 85, 0.08)',
                                    padding: '6px 10px',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(139, 115, 85, 0.15)'
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => isDragging && e.preventDefault()}
                            style={{
                              display: 'inline-block',
                              padding: '14px 24px',
                              background: 'rgba(139, 115, 85, 0.12)',
                              border: '2px solid rgba(139, 115, 85, 0.3)',
                              borderRadius: '6px',
                              color: '#5C4A3A',
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontSize: '14px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              textDecoration: 'none',
                              width: '100%',
                              textAlign: 'center'
                            }}
                          >
                            Website Besuchen →
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Dots */}
              {projects.length > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '24px'
                }}>
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        width: currentIndex === index ? '32px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: currentIndex === index
                          ? 'rgba(26, 77, 46, 0.6)'
                          : 'rgba(245, 243, 237, 0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: currentIndex === index
                          ? '0 0 8px rgba(26, 77, 46, 0.4)'
                          : 'none'
                      }}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Swipe Hint - Only show on first load */}
              {projects.length > 1 && currentIndex === 0 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 3, duration: 0.5 }}
                  style={{
                    textAlign: 'center',
                    padding: '0 20px'
                  }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(26, 77, 46, 0.15)',
                    border: '1px solid rgba(26, 77, 46, 0.3)',
                    borderRadius: '20px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'rgba(245, 243, 237, 0.8)',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)'
                  }}>
                    <span>← Swipe →</span>
                  </div>
                </motion.div>
              )}
            </section>
          </div>
        </PageTransition>
        <Footer />
      </main>
    );
  }

  // Desktop Version (unchanged)
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <PageTransition>
        <div className="relative z-10">
          {/* Hero Section */}
          <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '140px 40px 40px'
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
                Ausgewähltes Projekt
              </h1>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(245, 243, 237, 0.85)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                Ein Einblick in meine Arbeit
              </p>
            </motion.div>
          </section>

          {/* Project Card Section */}
          <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '32px 20px 100px' : '40px 40px 120px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                maxWidth: isMobile ? '360px' : '900px',
                width: '100%'
              }}
            >
              <div style={{
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: isMobile ? '8px' : '12px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Screenshot - Expandable on Hover */}
                <motion.a
                  href="https://luistravels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => !isMobile && setIsImageHovered(true)}
                  onMouseLeave={() => !isMobile && setIsImageHovered(false)}
                  animate={{
                    height: (isImageHovered && !isMobile) ? '550px' : '275px'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: isMobile ? '240px' : '275px',
                    overflow: 'hidden',
                    borderBottom: (isImageHovered && !isMobile) ? 'none' : '2px solid rgba(26, 77, 46, 0.12)',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <Image
                    src={isMobile ? "/pictures/luistravels.com-smartphonescreenshot.jpg" : "/pictures/luistravels.com-screenshot.png"}
                    alt="Luis Travels Blog - Reise-Blog Website"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transition: 'transform 0.4s ease'
                    }}
                    priority
                  />

                  {/* Overlay - Desktop only */}
                  {!isMobile && (
                    <AnimatePresence>
                      {isImageHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                          }}
                        >
                          <div style={{
                            padding: '16px 32px',
                            background: 'rgba(245, 243, 237, 0.95)',
                            border: '2px solid rgba(26, 77, 46, 0.3)',
                            borderRadius: '8px',
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#3E2E1F',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Website Besuchen →
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Mobile Tap Hint */}
                  {isMobile && (
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      padding: '8px 16px',
                      background: 'rgba(245, 243, 237, 0.95)',
                      border: '2px solid rgba(26, 77, 46, 0.3)',
                      borderRadius: '6px',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#3E2E1F',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}>
                      Tap zum Öffnen
                    </div>
                  )}
                </motion.a>

                {/* Content - Bottom Half - Scrollable */}
                {!(isImageHovered && !isMobile) && (
                  <motion.div
                    initial={false}
                    animate={{
                      height: '50%',
                      opacity: 1
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      padding: isMobile ? '24px' : '32px 40px',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(139, 115, 85, 0.3) rgba(139, 115, 85, 0.1)',
                      minHeight: isMobile ? '240px' : '275px'
                    }}
                    className="custom-scrollbar"
                  >
                  {/* Category Badge */}
                  <div style={{
                    display: 'inline-block',
                    padding: isMobile ? '5px 12px' : '6px 14px',
                    background: 'rgba(139, 115, 85, 0.1)',
                    border: '1px solid rgba(139, 115, 85, 0.2)',
                    borderRadius: '4px',
                    marginBottom: isMobile ? '14px' : '16px'
                  }}>
                    <span style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: isMobile ? '11px' : '12px',
                      fontWeight: 600,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Travel Blog
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    marginBottom: isMobile ? '12px' : '12px',
                    lineHeight: 1.1
                  }}>
                    Luis Travels
                  </h2>

                  {/* URL */}
                  <a
                    href="https://luistravels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: isMobile ? '15px' : '16px',
                      fontWeight: 500,
                      color: '#8B7355',
                      textDecoration: 'none',
                      marginBottom: isMobile ? '18px' : '20px',
                      display: 'inline-block',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5C4A3A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8B7355'}
                  >
                    luistravels.com ↗
                  </a>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: isMobile ? '16px' : '16px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    marginBottom: isMobile ? '20px' : '24px'
                  }}>
                    Ein moderner Reise-Blog mit CMS-Integration, optimiert für Performance und SEO.
                    Die Website präsentiert Reiseberichte, Fotogalerien und Reisetipps in einem
                    ansprechenden, responsiven Design.
                  </p>

                  {/* Tech Stack */}
                  <div style={{ marginBottom: isMobile ? '24px' : '28px' }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: isMobile ? '12px' : '13px',
                      fontWeight: 700,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: isMobile ? '12px' : '14px'
                    }}>
                      Tech Stack
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: isMobile ? '8px' : '8px'
                    }}>
                      {['Next.js', 'React', 'TypeScript', 'JavaScript', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS', 'Vercel', 'Image Optimization'].map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: isMobile ? '12px' : '13px',
                            fontWeight: 500,
                            color: '#5C4A3A',
                            background: 'rgba(139, 115, 85, 0.08)',
                            padding: isMobile ? '6px 10px' : '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid rgba(139, 115, 85, 0.15)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: isMobile ? '12px' : '13px',
                      fontWeight: 700,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: isMobile ? '12px' : '14px'
                    }}>
                      Key Features
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isMobile ? '10px' : '10px'
                    }}>
                      {[
                        'Headless CMS Integration',
                        'Responsive Design',
                        'SEO Optimiert',
                        'Image Optimization',
                        'Fast Page Loads',
                        'Blog & Gallery Features'
                      ].map((feature, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? '10px' : '10px'
                          }}
                        >
                          <div style={{
                            width: isMobile ? '5px' : '5px',
                            height: isMobile ? '5px' : '5px',
                            borderRadius: '50%',
                            background: '#8B7355',
                            flexShrink: 0
                          }} />
                          <span style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: isMobile ? '15px' : '15px',
                            fontWeight: 400,
                            color: '#4A3428'
                          }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://luistravels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: isMobile ? '14px 24px' : '14px 28px',
                      background: 'rgba(139, 115, 85, 0.12)',
                      border: '2px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '6px',
                      color: '#5C4A3A',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Website Besuchen →
                  </a>
                </motion.div>
                )}
              </div>

              {/* Custom Scrollbar Styles */}
              <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(139, 115, 85, 0.08);
                  border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(139, 115, 85, 0.3);
                  border-radius: 4px;
                  transition: background 0.2s ease;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(139, 115, 85, 0.5);
                }
              `}</style>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
