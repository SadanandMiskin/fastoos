import { OrbitControls, MeshReflectorMaterial, Stage } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import Car1 from "./Car1";
import { useCustomization } from "../../contexts/Customization";
import backgroundMusic from "../../assets/audio/bg.mp3";
import { ShortLoader } from "../Loader/ShortLoader"; // Import your new loader

const Scene: React.FC = () => {
  const { car } = useCustomization();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.log("Audio playback failed:", err);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <OrbitControls
        makeDefault
        minDistance={3}
        maxDistance={40}
        enablePan={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI/2}
      />

      <Stage environment="city" intensity={0.6} adjustCamera={false}>
        <Suspense fallback={<ShortLoader />}>
          {car === "car1" && <Car1 />}
        </Suspense>
      </Stage>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          resolution={2048}
          mixBlur={1}
          mixStrength={45}
          roughness={1}
          depthScale={1.3}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.5}
          color="white"
          metalness={0}
        />
      </mesh>
    </>
  );
};

export default Scene;