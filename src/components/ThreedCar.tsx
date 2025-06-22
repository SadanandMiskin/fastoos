import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import type { PerspectiveCamera as PerspectiveCameraImpl } from 'three'
import gsap from 'gsap'
import './Car/Car.css'
import Scene from '../components/Car/Scene'
import Configurator from '../components/Car/Configurator'
import { useCustomization } from '../contexts/Customization'
import Details from '../components/Car/Details'
import { useEffect, useRef, useState } from 'react'
// import type { MutableRefObject } from 'react'

const ThreedCar = () => {
  const { Brake, rotation } = useCustomization();
  const cameraRef = useRef<PerspectiveCameraImpl>(null)
  const bgColorRef = useRef<HTMLDivElement>(null)
  const [bgColor, setBgColor] = useState('rgb(167, 167, 167)')

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (cameraRef.current) {
      // Create a position object that GSAP can animate
      const position = {
        x: cameraRef.current.position.x,
        y: cameraRef.current.position.y,
        z: cameraRef.current.position.z
      }

      gsap.to(position, {
        x: Brake ? 6 : 6,
        y: Brake ? -1 : 2,
        z: 5,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (cameraRef.current) {
            cameraRef.current.position.set(position.x, position.y, position.z)
          }
        }
      })

      gsap.to(cameraRef.current, {
        fov: Brake ? 14 : 45,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current?.updateProjectionMatrix()
      })
    }
  }, [Brake])

  useEffect(() => {
    if (cameraRef.current && bgColorRef.current) {
      gsap.to(cameraRef.current, {
        fov: rotation ? 34 : 44,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current?.updateProjectionMatrix()
      })

      gsap.to(bgColorRef.current, {
        duration: 2.5,
        background: rotation ? 'rgb(230, 230, 230)' : 'rgb(167, 167, 167)',
        ease: "power2.inOut",
        onUpdate: () => {
          if (bgColorRef.current) {
            setBgColor(bgColorRef.current.style.background)
          }
        }
      })
    }
  }, [rotation])

  return (
    <>
      <div
        className="App"
        ref={bgColorRef}
        style={{ background: bgColor }}
      >
        <Canvas
          onWheel={handleWheel}
          style={{ touchAction: 'none', background: 'transparent' }}
        >
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[7, -1, 1]}
            fov={50}
          />
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={['white', 10, 100]} />
          <Scene />
        </Canvas>
        <Configurator />
        <Details />
      </div>
    </>
  );
};

export default ThreedCar;