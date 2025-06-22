// import React, { useEffect, useState } from 'react';

// const Loading: React.FC = () => {
//   const [progress, setProgress] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setIsComplete(true);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 30);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
//       {/* Logo Section */}
//       <div className={`text-center mb-8 relative z-10 transition-transform duration-500 ${isComplete ? '-translate-y-24' : 'translate-y-0'}`}>
//         <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
//           FASTOS
//         </h1>
//         <p className="text-xl md:text-2xl mt-2 text-orange-300">Blazing Speed</p>
//       </div>

//       {/* Progress Bar */}
//       {!isComplete && (
//         <div className="w-64 md:w-80 h-4 bg-gray-700 rounded-full overflow-hidden relative mb-12">
//           <div
//             className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 ease-out"
//             style={{ width: `${progress}%` }}
//           ></div>
//           <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm text-orange-200">
//             {progress}%
//           </span>
//         </div>
//       )}

//       {/* Car Animation */}
//       <div className="w-full h-32 absolute bottom-0 left-0 overflow-hidden">
//         {/* Road */}
//         <div className="w-full h-20 bg-gray-800 absolute bottom-0 left-0">
//           {/* Lane markings */}
//           <div className="absolute top-1/2 left-0 w-full h-1 flex">
//             {[...Array(20)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-full w-8 bg-yellow-400 mr-16"
//                 style={{ animation: `moveMarking ${1.5}s linear infinite`, animationDelay: `${i * 0.1}s` }}
//               ></div>
//             ))}
//           </div>
//         </div>

//         {/* Car */}
//         <div
//           className="absolute bottom-8 left-0 w-24 h-12 bg-orange-500 rounded-lg transform transition-transform duration-1000"
//           style={{
//             left: `${progress}%`,
//             transform: `translateX(-${progress}%)`
//           }}
//         >
//           <div className="absolute -top-2 left-2 w-20 h-4 bg-orange-600 rounded-t-lg"></div>
//           <div className="absolute bottom-0 left-2 w-6 h-3 bg-gray-900 rounded-sm"></div>
//           <div className="absolute bottom-0 right-2 w-6 h-3 bg-gray-900 rounded-sm"></div>
//           <div className="absolute top-1 right-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
//         </div>
//       </div>

//       {/* Glow effect */}
//       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none"></div>

//       {/* Tailwind animation keyframes (add to your Tailwind config) */}
//       {/* <style jsx>{`
//         @keyframes moveMarking {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-80px); }
//         }
//       `}</style> */}
//     </div>
//   );
// };

// export default Loading;