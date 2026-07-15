'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { inSphere } from 'maath/random'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

export function Background3D() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <AnimatedBackground />
      </Canvas>
    </div>
  )
}

function AnimatedBackground() {
  const pointsRef = useRef<THREE.Points>(null)
  const particles = useMemo(
    () =>
      inSphere(new Float32Array(5000), { radius: 1.2 }),
    []
  )

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10
      pointsRef.current.rotation.y -= delta / 15
    }
  })

  return (
    <>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#2563eb"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </>
  )
}
