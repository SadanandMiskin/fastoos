import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ArcSectionProps {
  label: string;
  startAngle: number;
  endAngle: number;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  isOuter?: boolean;
  fillId: string;
  hoverFillId: string;
}

const ArcSection: React.FC<ArcSectionProps> = ({
  label,
  startAngle,
  endAngle,
  isVisible,
  isHovered,
  onMouseEnter,
  onClick,
  isOuter = false,
  fillId,
}) => {
  const centerX = 150;
  const centerY = 150;
  const innerRadius = isOuter ? 150 : 50;
  const outerRadius = isOuter ? 230 : 120;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const p1 = { x: centerX + innerRadius * Math.cos(startRad), y: centerY + innerRadius * Math.sin(startRad) };
  const p2 = { x: centerX + outerRadius * Math.cos(startRad), y: centerY + outerRadius * Math.sin(startRad) };
  const p3 = { x: centerX + outerRadius * Math.cos(endRad), y: centerY + outerRadius * Math.sin(endRad) };
  const p4 = { x: centerX + innerRadius * Math.cos(endRad), y: centerY + innerRadius * Math.sin(endRad) };

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${p3.x} ${p3.y}
    L ${p4.x} ${p4.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${p1.x} ${p1.y}
    Z
  `;

  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const labelRadius = isOuter ? 180 : (innerRadius + outerRadius) / 2;
  const labelX = centerX + labelRadius * Math.cos(midRad);
  const labelY = centerY + labelRadius * Math.sin(midRad);

  const textRotation = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;
  const textAnchor = 'middle';
  const dominantBaseline = 'middle';
  const textColor = isHovered ? 'text-white' : 'text-gray-800';

  return (
    <g
      className={`cursor-pointer transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        transform: isVisible && isHovered ? 'scale(1.08)' : 'scale(1)',
        transformOrigin: `${centerX}px ${centerY}px`,
        transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 400ms ease-out',
      }}
    >
      <path
        d={pathData}
        fill={isHovered ? `orange` : `url(#${fillId})`}
        stroke={isOuter ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)"}
        strokeWidth="1"
        style={{
          border: '3px solid rgba(0, 0, 0, 0.1)',
          filter: 'url(#arcShadowLight)',
          transition: 'fill 400ms ease, stroke 400ms ease',
        }}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        transform={`rotate(${textRotation}, ${labelX}, ${labelY})`}
        className={`${textColor} font-medium text-sm pointer-events-none select-none uppercase`}
        style={{
          transition: 'fill 400ms ease',
          fontFamily: '"Arial", sans-serif',
          letterSpacing: '0.1em',
          fontSize: isOuter ? '14px' : '12px'
        }}
      >
        {label}
      </text>
    </g>
  );
};

export default function GearShiftWheel() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [showEnterButton, setShowEnterButton] = useState<boolean>(true);
  const [showBlackFade, setShowBlackFade] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  const gearOptions = [
    { id: 'A', label: 'A', startAngle: 180, endAngle: 240, page: 'About' },
    { id: 'B', label: 'B', startAngle: 240, endAngle: 300, page: '3D' },
    { id: 'C', label: 'C', startAngle: 300, endAngle: 360, page: 'Photo' },
  ];

  const activeOuterArcData = gearOptions.find(gear => gear.id === hoveredSection);

  const handleSectionClick = (section: string, page: string): void => {
    console.log(`Selected gear ${section} - ${page}`);
    setIsNavigating(true);
    setShowBlackFade(true);

    setTimeout(() => {
      navigate(`/${page.toLowerCase()}`);
    }, 500);
  };

  const handleEnterClick = () => {
    setUserInteracted(true);
    setShowEnterButton(false);

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(console.error);
    }
  };

  const startLoadingAnimation = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress / 100})`;
      }

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 70);
  };

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = 'scaleX(0)';
      progressBarRef.current.style.transformOrigin = 'left center';
      progressBarRef.current.style.transition = 'transform 0.1s ease';
    }

    if (userInteracted) {
      startLoadingAnimation();
    }
  }, [userInteracted]);

  useEffect(() => {
    if (videoRef.current && userInteracted) {
      const video = videoRef.current;

      const handleCanPlay = () => {
        setIsVideoReady(true);
      };

      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const loadedPercentage = (video.buffered.end(0) / video.duration) * 100;
          setLoadingProgress(prev => Math.max(prev, Math.min(loadedPercentage, 100)));
        }
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('progress', handleProgress);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('progress', handleProgress);
      };
    }
  }, [userInteracted]);

  useEffect(() => {
    if (loadingProgress >= 100 && isVideoReady) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  }, [loadingProgress, isVideoReady]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <AnimatePresence>
        {showBlackFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-black"
          />
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        autoPlay={false}
        muted={!userInteracted}
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? (isNavigating ? 'opacity-0' : 'opacity-100') : 'opacity-0'
        }`}
        style={{ zIndex: 0 }}
        onCanPlay={() => setIsVideoReady(true)}
      >
        <source src="/a.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isLoaded && (
        <div
          ref={preloaderRef}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-yellow-300 text-gray-900"
        >
          <div className="text-center max-w-md px-4">
            <h1 className="text-9xl font-bold text-red-800 font-stretch-100% cur tracking-wider mb-8 animate-fade-in" ref={textRef}>
              Fastoos
            </h1>

            {showEnterButton && (
              <div className="mb-8">
                <button
                  ref={enterButtonRef}
                  onClick={handleEnterClick}
                  className="bg-red-800 hover:bg-red-900 text-yellow-300 font-bold py-4 px-12 rounded-full text-xl tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Enter Experience
                </button>
                <p className="text-gray-600 text-sm mt-4 tracking-wider">
                  Click to enable audio and start loading
                </p>
              </div>
            )}

            {userInteracted && (
              <>
                <h2
                  className="text-xl md:text-xl font-bold mb-6  opacity-100 tracking-wider"
                  style={{
                    animation: 'fadeInUp 7.8s ease-out'
                  }}
                >
                  GET READY FOR A NEW EXPERIENCE
                </h2>

                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="bg-gray-900 h-1.5 rounded-full w-full transition-transform duration-100 ease-out"
                  ></div>
                </div>

                <p className="text-gray-600 text-sm tracking-wider mb-8">
                  Loading {loadingProgress}%
                  {!isVideoReady && " (buffering video)"}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className={`relative z-20 min-h-screen transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-8 left-8 z-10">
          <div className="text-white text-sm tracking-[0.2em] uppercase font-medium">
            Fastoos
          </div>
        </div>

        <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
          <div
            className="relative flex items-center justify-center mt-96"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => {
              setIsExpanded(false);
              setHoveredSection(null);
            }}
            style={{ width: '400px', height: '400px'}}
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 300 300"
              className="absolute top-0 left-0 overflow-visible"
            >
              <defs>
                <linearGradient id="innerArcFill_light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="gray" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>

                <linearGradient id="innerArcHoverFill_blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="orange" />
                  <stop offset="100%" stopColor="yellow" />
                </linearGradient>

                <linearGradient id="outerArcFill_light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e9ecef" />
                  <stop offset="100%" stopColor="#dee2e6" />
                </linearGradient>

                <linearGradient id="outerArcHoverFill_blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>

                <filter id="arcShadowLight" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
                </filter>
              </defs>

              {gearOptions.map(gear => (
                <ArcSection
                    key={gear.id}
                    label={gear.label}
                    startAngle={gear.startAngle}
                    endAngle={gear.endAngle}
                    isVisible={isExpanded}
                    isHovered={hoveredSection === gear.id}
                    onMouseEnter={() => setHoveredSection(gear.id)}
                    onClick={() => {
                      handleSectionClick(gear.label, gear.page);
                      navigate(`/${activeOuterArcData?.page.toLowerCase()}`);
                    }}
                    fillId="innerArcFill_light"
                    hoverFillId="innerArcHoverFill_blue"
                />
              ))}

              {activeOuterArcData && (
                <ArcSection
                    key={`${activeOuterArcData.id}-outer`}
                    label={`${activeOuterArcData.page}`}
                    startAngle={activeOuterArcData.startAngle}
                    endAngle={activeOuterArcData.endAngle}
                    isVisible={isExpanded}
                    isHovered={true}
                    onMouseEnter={() => {}}
                    onClick={() => {
                      handleSectionClick(activeOuterArcData.label, activeOuterArcData.page);
                      navigate(`/${activeOuterArcData.page.toLowerCase()}`);
                    }}
                    isOuter={true}
                    fillId="outerArcFill_light"
                    hoverFillId="outerArcHoverFill_blue"
                />
              )}
            </svg>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                  relative z-30 w-32 h-32 rounded-full
                  border-2 transition-all duration-500 ease-out
                  flex flex-col items-center justify-center
                  transform hover:scale-110 active:scale-95
                  focus:outline-none shadow-lg shadow-amber-500
                  ${isExpanded
                    ? 'border-yellow-600 shadow-[0_0_40px_rgba(59,130,246,0.4)]'
                    : 'border-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  }
                `}
                style={{
                    background: isExpanded
                      ? 'radial-gradient(circle, #ffffff 0%, #f1f5f9 100%)'
                      : 'radial-gradient(circle, #ffffff 0%, #e5e7eb 100%)',
                    fontFamily: '"Arial", sans-serif'
                }}
                aria-label="Select Gear"
            >
              <div className={`text-2xl font-bold transition-all duration-500 ${
                isExpanded ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {hoveredSection || '•'}
              </div>
              <div className={`text-xs tracking-[0.1em] uppercase mt-1 transition-all duration-500 ${
                isExpanded ? 'text-gray-600' : 'text-gray-500'
              }`}>
                {hoveredSection ? 'Selected' : 'Select Gear'}
              </div>

              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 border border-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </button>

            <div
              className={`
                absolute top-1/2 left-1/2 rounded-full
                border border-green-400/30
                transition-all duration-700 ease-out -z-10
                ${isExpanded
                  ? 'w-[480px] h-[480px] -mt-[240px] -ml-[240px] opacity-60'
                  : 'w-40 h-40 -mt-20 -ml-20 opacity-0'
                }
              `}
              style={{
                boxShadow: isExpanded
                  ? '0 0 60px 15px rgba(245, 243, 59, 0.4)'
                  : 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}