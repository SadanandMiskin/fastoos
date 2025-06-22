import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import FastLoader from './Loader/Loader';
// import { Box } from '@mui/material';
import {CuboidIcon , Frame} from 'lucide-react'
import { Header } from './Header';

const WikipediaPage: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for animations with proper types
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const artPreviewRef = useRef<HTMLDivElement>(null);
  const pdfPreviewRef = useRef<HTMLDivElement>(null);
  const videoPreviewRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Page load animation sequence
  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setIsLoaded(true);
      animatePageEntrance();
    }, 1500);

    return () => clearTimeout(loadTimeout);
  }, []);

  const animatePageEntrance = () => {
    if (!containerRef.current || !headerRef.current || !titleRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, {
      scale: 0.98,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)"
    });

    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6
    }, "-=0.4");

    const title = titleRef.current;
    if (title) {
      const text = title.textContent;
      title.textContent = '';
      tl.to(title, {
        duration: 0.3,
        opacity: 1
      });
      tl.fromTo(title,
        { width: 0 },
        {
          width: '100%',
          duration: 1.2,
          ease: "power3.inOut",
          onUpdate: () => {
            if (text) {
              title.textContent = text.substring(0, Math.floor(text.length * (gsap.getProperty(title, "width") as number / 100)));
            }
          },
          onComplete: () => {
            if (text) title.textContent = text;
          }
        }, "-=0.8");
    }

    tl.from(imageRef.current, {
      rotateY: 90, // Changed from rotationY to rotateY
      opacity: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.6");

    tl.from(contentRefs.current.filter(Boolean) as HTMLElement[], {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.8");

    const sections = document.querySelectorAll("section");
    sections.forEach((section: HTMLElement, i: number) => {
      tl.from(section, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, `+=${i * 0.1}`);
    });

    const gridElements = document.querySelectorAll(".grid.md\\:grid-cols-3");
    gridElements.forEach((grid) => {
      tl.from(grid, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.3");
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPreviewPosition({ x: e.clientX, y: e.clientY });
  };

  const handleLinkHover = (linkType: string, e: React.MouseEvent) => {
    if (isMobile) return;

    setHoveredLink(linkType);
    setPreviewPosition({ x: e.clientX, y: e.clientY });

    if (previewRef.current) {
      gsap.fromTo(previewRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    switch (linkType) {
      case 'art':
        if (artPreviewRef.current) {
          gsap.fromTo(artPreviewRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.7)" }
          );
        }
        break;
      case 'pdf':
        if (pdfPreviewRef.current) {
          gsap.fromTo(pdfPreviewRef.current,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "elastic.out(1, 0.5)" }
          );
        }
        break;
      case 'video':
        if (videoPreviewRef.current) {
          gsap.fromTo(videoPreviewRef.current,
            { rotate: -5, opacity: 0 }, // Changed from rotation to rotate
            { rotate: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "sine.out" }
          );
        }
        break;
    }
  };

  const handleLinkLeave = () => {
    if (isMobile || !previewRef.current) return;

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      onComplete: () => setHoveredLink(null)
    });
  };

  const previewContent = {
    art: (
      <motion.div
        ref={artPreviewRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="p-4"
      >
        <h3 className="text-lg font-semibold mb-2 text-amber-800">Porsche 911 Gallery Preview</h3>
        <div className="grid grid-cols-2 gap-2">
          {[100, 200, 300, 400].map((shade, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`bg-amber-${shade} h-24 w-full rounded-sm`}
            ></motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-sm text-gray-600"
        >
          Explore our collection of Porsche 911 models
        </motion.p>
      </motion.div>
    ),
    pdf: (
  <motion.div
    ref={previewRef}
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", bounce: 0.5 }}
    className="p-4"
  >
    <h3 className="text-lg font-semibold mb-2 text-blue-800">Porsche 911 3D Model Preview</h3>
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="bg-blue-50 border border-blue-200 p-3 rounded"
    >
      <div className="flex items-center mb-2">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          className="bg-blue-100 p-2 rounded mr-2"
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </motion.div>
        <div>
          <p className="font-medium">Porsche_911_Model.glb</p>
          <p className="text-xs text-gray-500">5.7 MB • High-poly model</p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-md h-32 mb-2 flex items-center justify-center">
        <p className="text-sm text-gray-500">3D Model Preview</p>
      </div>
      <p className="text-sm text-gray-700 line-clamp-3">Interactive 3D model of the Porsche 911 featuring detailed exterior, interior components, and realistic materials.</p>
    </motion.div>
  </motion.div>
),
    video: (
      <motion.div
        ref={videoPreviewRef}
        initial={{ rotate: -5, opacity: 0 }} // Changed from rotation to rotate
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        className="p-4"
      >
        <h3 className="text-lg font-semibold mb-2 text-purple-800">Porsche 911 Video Lecture Preview</h3>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-purple-50 rounded overflow-hidden"
        >
          <div className="relative pt-[56.25%] bg-purple-200">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </motion.div>
          </div>
          <div className="p-3">
            <p className="font-medium">"Porsche 911 Engineering"</p>
            <p className="text-sm text-gray-600 mt-1">Dr. Alexander Sport • 34 min</p>
            <div className="flex items-center mt-2 text-xs text-purple-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Watch preview
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  };

  // Helper function to add paragraph refs
  const addToRefs = (el: HTMLParagraphElement | null, index: number) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current[index] = el;
    }
  };

  return (
    <>
      <FastLoader />
      <Header />
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 text-gray-800 font-sans leading-normal"
            onMouseMove={handleMouseMove}
          >
            {/* Header */}
            {/* <motion.header
              ref={headerRef}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-sm py-4 border-b border-gray-200"
            >
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <motion.h1
                    ref={titleRef}
                    initial={{ opacity: 0 }}
                    className="text-3xl font-serif font-bold text-gray-900"
                  >
                    PorschePedia
                  </motion.h1>
                  <button className="md:hidden text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.header> */}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
              {/* Article Content */}
              <article className="flex-1 bg-white shadow-sm rounded p-6">
                <motion.h1
                  initial={{ opacity: 100 }}
                  className="text-3xl font-serif font-bold mb-6 border-b pb-2"
                >
                  Porsche 911
                </motion.h1>

                <div className="flex mb-6">
                  <div className="mr-4 flex-shrink-0">
                    <motion.img
                      ref={imageRef}
                      initial={{ opacity: 100 }}
                      src="https://imgs.search.brave.com/2WCgdoTrEjbpuLJwAXp0TGZzfz1h9z0jSNAig0mVlBk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3R1dHRjYXJzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8xMi9QT1JTQ0hF/LTkxMS1DYXJyZXJh/LVMtOTkxLTQ0NzZf/MzQuanBlZw"
                      alt="Porsche 911"
                      className="w-48 h-auto rounded shadow"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Porsche 911 Carrera</p>
                  </div>
                  <div>
                    {[
                      "The Porsche 911 is a two-door 2+2 high performance rear-engined sports car introduced in September 1964 by Porsche AG of Stuttgart, Germany. It has a rear-mounted flat-six engine and originally a torsion bar suspension. The car has been continuously enhanced through the years but the basic concept has remained little changed.",
                      "The engines were air-cooled until the introduction of the Type 996 in 1998. The 911 has been modified by both private teams and the factory itself for racing, rallying, and other types of automotive competition. It is often seen as the most successful competition car ever, especially when its variations are included, mainly the powerful 911-derived 935 which won 24 Hours of Le Mans and other major sports cars races outright against prototypes."
                    ].map((text, i) => (
                      <motion.p
                        key={i}
                        ref={(el) => addToRefs(el, i)}
                        initial={{ opacity: 100, y: 20 }}
                        className="mb-4"
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid md:grid-cols-2 gap-6 mb-8"
                >
                  <motion.section
                    whileHover={{ y: -5 }}
                  >
                    <h2 className="text-xl font-serif font-bold mb-4 border-b pb-1">Characteristics</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {[
                        "Rear-engine layout",
                        "Flat-six engine",
                        "Distinctive round headlights",
                        "Continuous development and innovation",
                        "High performance and sporty handling"
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>
                  <motion.section
                    whileHover={{ y: -5 }}
                  >
                    <h2 className="text-xl font-serif font-bold mb-4 border-b pb-1">Major Models</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {[
                        "911 Classic (1964-1989)",
                        "964 (1989-1994)",
                        "993 (1993-1998)",
                        "996 (1999-2004)",
                        "997 (2004-2012)",
                        "991 (2011-2019)",
                        "992 (2019-present)"
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 + i * 0.05 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>
                </motion.div>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-serif font-bold mb-4 border-b pb-1">Explore More</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link to="/gallery">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 border border-gray-200 rounded hover:bg-amber-50 transition-colors cursor-pointer"
                        onMouseEnter={(e) => handleLinkHover('art', e)}
                        onMouseLeave={handleLinkLeave}
                      >
                        <h3 className="font-semibold text-amber-700 flex items-center">
                          <Frame />
                          Porsche 911 Gallery
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Browse our collection of Porsche 911 models</p>
                      </motion.div>
                    </Link>
                    <Link to="/3d">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 px-4 border border-gray-200 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                      onMouseEnter={(e) => handleLinkHover('pdf', e)}
                      onMouseLeave={handleLinkLeave}
                    >
                      <h3 className="font-semibold text-blue-700 flex items-center">
                       <CuboidIcon />
                        3d Model
                      </h3>
                      <p className="text-sm px-2 text-gray-600 mt-1">Academic studies on Porsche 911 engineering</p>
                    </motion.div>

                    </Link>
                    {/* <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 border border-gray-200 rounded hover:bg-purple-50 transition-colors cursor-pointer"
                      onMouseEnter={(e) => handleLinkHover('video', e)}
                      onMouseLeave={handleLinkLeave}
                    >
                      <h3 className="font-semibold text-purple-700 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Video Lectures
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Expert analysis of Porsche 911 technology</p>
                    </motion.div> */}
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h2 className="text-xl font-serif font-bold mb-4 border-b pb-1">Historical Context</h2>
                  {[
                    "The Porsche 911 was developed as a much more powerful, larger, more comfortable replacement for the Porsche 356, the company's first model, and essentially a sporting evolution of the Volkswagen Beetle. The new car made its public debut at the 1963 Frankfurt Motor Show. The 911 has undergone continuous development, but the basic concept has remained little changed throughout its history.",
                    "The 911 is one of the most iconic sports cars in history and has been praised for its performance, engineering, and design. It has won numerous awards and is often cited as a benchmark for other sports cars. The 911's distinctive design, with its sloping roofline and rear engine, has become a symbol of Porsche's commitment to performance and innovation."
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + i * 0.1 }}
                      className="mb-4"
                    >
                      {text}
                    </motion.p>
                  ))}
                </motion.section>
              </article>
            </main>

            {/* Preview Popup */}
            {hoveredLink && !isMobile && (
              <motion.div
                ref={previewRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden pointer-events-none"
                style={{
                  left: `${previewPosition.x + 20}px`,
                  top: `${previewPosition.y + 20}px`,
                  transformOrigin: 'left top'
                }}
              >
                {hoveredLink === 'art' && previewContent.art}
                {hoveredLink === 'pdf' && previewContent.pdf}
                {hoveredLink === 'video' && previewContent.video}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WikipediaPage;