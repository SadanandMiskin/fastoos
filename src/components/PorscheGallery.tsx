import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FastLoader from './Loader/Loader';
import { Header } from './Header';

gsap.registerPlugin(ScrollTrigger);

type ImageType = {
  id: number;
  src: string;
  alt: string;
  caption: string;
};

const PorscheGalleryWithSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    window.scrollTo(0, 0);
  } , [])

  const images: ImageType[] = [
    {
      id: 1,
      src: 'https://imgs.search.brave.com/93j62nqRCuASA1URb3r6gBJl0wjZQem0cGH3646Wpls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOC8w/NC8yMi8xNy8yMi9w/b3JzY2hlLTkxMS0z/MzQxNjk3XzY0MC5q/cGc',
      alt: 'Porsche 911 GT3 RS',
      caption: 'Track-focused performance with aerodynamic precision'
    },
    {
      id: 2,
      src: 'https://imgs.search.brave.com/MaHGS3pBOPqZGUU7Xl3gBGZ5HDPfTH63oP4pKTREO0Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODMy/MDU0ODM2L3Bob3Rv/L2EtcG9yc2NoZS05/MTEtdHVyYm8tZHJp/dmVuLWJ5LWF1dG9j/YXJzLWVkaXRvci1h/dC1sYXJnZS1zdGV2/ZS1zdXRjbGlmZmUt/b24tdGhlLXJ1bndh/eS1hdC1sb25kb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PThnVHNSOV8tOGE2/MzROV0hVWjI3UFRx/VTRJX0JUT1M3cHIy/TVhhcVpCX0U9',
      alt: 'Porsche 911 Carrera',
      caption: 'The essence of the 911 heritage continues'
    },
    {
      id: 3,
      src: 'https://imgs.search.brave.com/77OMO-GKl3GIiXpXzwHSfwdh-1zkq2ljaBIsgWQjMIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZWxmZXJzcG90LmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NS8wMi8xMi9wb3Jz/Y2hlLWNhcnJlcmEt/Y291cGUtbGFndW5l/bmdydWVuLW1ldGFs/bGljLTUuanBlZz9j/bGFzcz1tbA',
      alt: 'Porsche 911 Turbo S',
      caption: 'Ultimate power meets sophisticated engineering'
    },
    {
      id: 4,
      src: 'https://imgs.search.brave.com/V8WphcI-5FgTb_UaoXB-rNl1MDIng78o-u0QcG11KgQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3R1dHRjYXJzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8xMi9QT1JTQ0hF/LTkxMS1DYXJyZXJh/LVMtOTkxLTQ0NzZf/NDYuanBlZw',
      alt: 'Porsche 911 Targa',
      caption: 'Iconic design with open-air freedom'
    },
    {
      id: 5,
      src: 'https://imgs.search.brave.com/HpjO5YSAzNRmeGGYZWdmrq0rgUsZjMUROM5_hFQHvTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LWh1Yi5pbWdp/eC5uZXQvMzdFYmxU/M0s0RVVlVE41ZG9k/OTBPRC80YWJiY2Fi/Nzk4NmQyMTZiZGU4/OGVkN2QwZWZjYmNj/Mi9wb3JzY2hlXzkx/MV93YWxscGFwZXJz/X3RodW1ibmFpbC5q/cGc_dz04MTE',
      alt: 'Porsche 911 GT3',
      caption: 'Pure driving experience in its rawest form'
    }
  ];

  const scrollToImage = (index: number) => {
    const element = imageRefs.current[index];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text animation
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=600",
            scrub: true,
          }
        });
      }

      imageRefs.current.forEach((el, index) => {
        if (!el) return;

        const content = el.querySelector('.content');
        const imageContainer = el.querySelector('.image-container');
        const speed = parseFloat(imageContainer?.getAttribute('data-speed') || '0.5');

        gsap.to(imageContainer, {
          yPercent: speed * 80,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true
          }
        });

        gsap.fromTo(content,
          {
            opacity: 0,
            y: 100,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          markers: false
        });
      });

      sidebarRefs.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(el,
          {
            opacity: 0,
            x: 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.6,
            ease: "power2.out",
            delay: index * 0.1
          }
        );
      });

      gsap.set(containerRef.current, {
        height: `${images.length * 100}vh`
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <FastLoader />
    <Header />
    <div className="min-h-screen bg-white text-black relative overflow-hidden" ref={containerRef}>
      {/* Parallax Text */}
      <header
        ref={textRef}
        className="fixed top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-red-800 opacity-90 title">Porsche</h1>
      </header>

      <div className="flex">
        <div className="flex-1 pr-0 md:pr-64">
          <div className="relative -top-25">
            {images.map((image, index) => {
              const positions = [
                { left: '25%', top: '0' },
                { right: '5%', top: '0' },
                { left: '30%', top: '0' },
                { right: '10%', top: '0' },
                { left: '25%', top: '0' }
              ];
              const position = positions[index % positions.length];

              return (
                // <>
                <div
                  key={image.id}
                  ref={el => { imageRefs.current[index] = el; }}
                  className="relative h-screen flex items-center px-6 md:px-12"
                  style={{
                    marginTop: index === 0 ? '0' : '-20vh',
                    zIndex: images.length - index,
                    paddingBottom: index === images.length - 1 ? '20vh' : '0'
                  }}
                >
                  <div
                    className="w-full max-w-5xl mx-auto"
                    style={{
                      marginLeft: position.left ? position.left : 'auto',
                      marginRight: position.right ? position.right : 'auto',
                      transform: index % 2 === 0 ? 'translateX(-15%)' : 'translateX(15%)'
                    }}
                  >
                    <div
                      className="image-container relative overflow-hidden rounded-3xl shadow-2xl h-[70vh] will-change-transform"
                      data-speed={0.5 + (index * 0.15)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />

                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="content absolute inset-0 flex items-end p-5 md:p-12">
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl border border-gray-200">
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                              Model {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="h-px bg-gray-400 flex-1" />
                          </div>

                          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
                            {image.alt}
                          </h2>

                          <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {image.caption}
                          </p>

                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                // </>
              );
            })}
          </div>
        </div>

        <div className="fixed right-0 top-0 h-full w-56 bg-white/90 backdrop-blur-md border-l border-gray-200 p-4 overflow-y-auto hidden md:block z-30">
          <div className="sticky top-4">
            <h3 className="text-sm font-bold text-gray-800 mb-6 text-center">Gallery</h3>

            <div className="space-y-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  ref={el => { sidebarRefs.current[index] = el; }}
                  onClick={() => scrollToImage(index)}
                  className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                    activeIndex === index
                      ? 'ring-2 ring-gray-800 shadow-lg scale-105'
                      : 'hover:shadow-md hover:scale-102 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                    />
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      activeIndex === index ? 'bg-white/10' : 'bg-black/40'
                    }`} />

                    {activeIndex === index && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-gray-800 rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>

                  {/* <div className="p-3">
                    <h4 className={`font-semibold text-xs transition-colors duration-300 ${
                      activeIndex === index ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {image.alt}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div> */}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(((activeIndex + 1) / images.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-gray-800 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default PorscheGalleryWithSidebar;