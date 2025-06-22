import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCustomization } from '../../contexts/Customization'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import gsap from 'gsap'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_12: THREE.Mesh
    Object_13: THREE.Mesh
    Object_15: THREE.Mesh
    Object_16: THREE.Mesh
    Object_18: THREE.Mesh
    Object_20: THREE.Mesh
  }
  materials: {
    Main_Paint: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
    Chrome: THREE.MeshStandardMaterial
    Tail_Lights: THREE.MeshStandardMaterial
    Glass: THREE.MeshStandardMaterial
    Globes: THREE.MeshStandardMaterial
    Mirrors: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    Gold: THREE.MeshStandardMaterial
    Rims: THREE.MeshStandardMaterial
    Tyres: THREE.MeshStandardMaterial
  }
}

const Car1: React.FC = (props) => {
  const { nodes, materials } = useGLTF('./models/car1.gltf') as unknown as GLTFResult
  const { accessory, carColour, tyreColour, rotation, Brake } = useCustomization()
  const carGroupRef = useRef<THREE.Group>(null)
  const [bOut, setBOut] = useState(0.61)
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!carGroupRef.current) return

    if (rotation) {
      // Start smooth rotation
      setBOut(0.61) // Reset bOut when starting rotation
      rotationTweenRef.current = gsap.to(carGroupRef.current.rotation, {
        y: '+=6.283', // Rotate 360 degrees (2π radians)
        duration: 10, // Adjust duration as needed
        ease: 'linear',
        repeat: -1 // Infinite rotation
      })
    } else {
      // Stop rotation smoothly
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill()
      }
      // Return to original rotation smoothly
      gsap.to(carGroupRef.current.rotation, {
        y: 3.13, // Your initial rotation value
        duration: 1,
        ease: 'power2.out'
      })
    }

    return () => {
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill()
      }
    }
  }, [rotation])

  useEffect(() => {
    if (Brake === false) {
      gsap.to({}, {
        duration: 0.8,
        onUpdate: () => {
          setBOut(0.61)
        },
        ease: 'power2.out'
      })
      return
    }

    gsap.to({}, {
      duration: 0.3,
      onUpdate: () => {
        setBOut(0.85)
      },
      ease: 'power2.out'
    })
  }, [Brake])

  return (
    <group ref={carGroupRef} {...props} dispose={null} rotation={[3.13, 10, Math.PI ]}>
      <group position={[0, -0.01, 0]} rotation={[3.13, 0, Math.PI]}>
        <mesh geometry={nodes.Object_4.geometry}>
  <meshStandardMaterial
    color={carColour.name}
    metalness={0.5}  // Increase for more metallic look (0 to 1)
    roughness={0.1}  // Decrease for more shine (0 to 1)
    envMapIntensity={1}  // Increase reflection intensity
  />
</mesh>
        <mesh geometry={nodes.Object_5.geometry} material={materials.Black} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Black} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Tail_Lights} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Globes} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.Mirrors} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.Gold} />
      </group>
      <group position={[0, 0.05, -0.08]} rotation={[-Math.PI, 0, -Math.PI]} scale={[bOut, 0.65, 0.65]}>
        <mesh geometry={nodes.Object_15.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.Gold} visible={accessory === 1} />
      </group>
      <mesh geometry={nodes.Object_18.geometry} material={materials.Rims} position={[0, 0.05, 0.02]} scale={[0.61, 0.65, 0.65]} >
        <meshStandardMaterial color={tyreColour.name} />
      </mesh>
      <mesh geometry={nodes.Object_20.geometry} material={materials.Tyres} position={[0, 0.05, 0.02]} scale={[0.61, 0.65, 0.65]} >
        <meshStandardMaterial color={'black'} />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/car1.gltf')

export default Car1