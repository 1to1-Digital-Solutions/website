"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  Box,
  Cone,
  Torus,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  MeshDistortMaterial,
  Float,
  Stars,
  DragControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="text-primary font-outfit text-3xl font-bold">{progress.toFixed(0)}%</span>
      <p className="text-foreground/50 mt-2 text-xs tracking-[0.3em] uppercase">
        Initializing WebGL
      </p>
    </Html>
  );
}

// Mouse spotlight that follows pointer
function MouseSpotlight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (lightRef.current) {
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 2), 0.1);
    }
  });
  return <pointLight ref={lightRef} distance={15} intensity={3} color="#ffffff" decay={2} />;
}

// ----------------------------------------------------
// Reusable Glass Material Config
// ----------------------------------------------------
const glassMaterialProps = {
  transmission: 0.5, // More solid feel, less pure glass
  opacity: 0.9,
  metalness: 0.2,
  roughness: 0.7, // Visibly rougher texture ( requested 'mas suave/rugosa' )
  ior: 1.5,
  thickness: 0.5,
  envMapIntensity: 0.5,
  clearcoat: 0,
};

// The Final Globe (now with smooth lerping)
function InteractiveGlobe({ allPlaced }: { allPlaced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const speedRef = useRef({ y: 0.2, x: 0.1, distort: 0.4, sparksTarget: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth appearance scale up
    const targetScale = allPlaced ? 1 : 0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 2
    );

    if (allPlaced && meshRef.current && coreRef.current) {
      // Smooth lerping of rotation speeds and distortion based on pointer distance to center
      let targetY = 0.2;
      let targetX = 0.1;
      let targetDistort = 0.3;

      if (allPlaced) {
        // state.pointer is normalized (-1 to 1). Calculate distance to origin (0,0)
        const dist = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2);
        const distClamped = Math.min(dist, 1.0);
        const intensity = 1.0 - distClamped; // 1 at center, 0 at edges

        targetY = 0.1 + 0.6 * intensity;
        targetX = 0.05 + 0.3 * intensity;
        targetDistort = 0.2 + 0.4 * intensity; // Give it more morphing when closer
      } else {
        targetY = hovered ? 0.2 : 0.1;
        targetX = hovered ? 0.1 : 0.05;
        targetDistort = hovered ? 0.3 : 0.2;
      }

      speedRef.current.y = THREE.MathUtils.lerp(speedRef.current.y, targetY, delta * 1.5);
      speedRef.current.x = THREE.MathUtils.lerp(speedRef.current.x, targetX, delta * 1.5);
      speedRef.current.distort = THREE.MathUtils.lerp(
        speedRef.current.distort,
        targetDistort,
        delta * 1.5
      );

      meshRef.current.rotation.y += delta * speedRef.current.y;
      meshRef.current.rotation.x += delta * speedRef.current.x;

      const mat = meshRef.current.material as THREE.MeshStandardMaterial & { distort: number };
      if (mat.distort !== undefined) {
        mat.distort = speedRef.current.distort;
      }

      // Hover color lerping - KEEP PRIMARY COLOR, JUST INTENSIFY
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = new THREE.Color("#40E0D0");
      coreMat.color.lerp(targetColor, delta * 5);

      // When hovered, the emissive brightness increases
      const targetEmissive = new THREE.Color("#40E0D0").multiplyScalar(hovered ? 2.5 : 1.0);
      coreMat.emissive.lerp(targetEmissive, delta * 5);

      const wireMat = meshRef.current.material as THREE.MeshStandardMaterial;
      wireMat.color.lerp(targetColor, delta * 5);
    }
  });

  return (
    <group ref={groupRef} scale={[0, 0, 0]} position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <Sphere ref={meshRef} args={[1.8, 32, 32]}>
            <MeshDistortMaterial
              color="#40E0D0"
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              wireframe={true}
              transparent
              opacity={0.4}
            />
          </Sphere>

          <Sphere ref={coreRef} args={[0.9, 32, 32]}>
            <meshStandardMaterial
              color="#40E0D0"
              emissive="#40E0D0"
              emissiveIntensity={1}
              roughness={0.5}
              metalness={0.5}
              transparent
              opacity={0.9}
            />
          </Sphere>
        </group>
      </Float>
    </group>
  );
}

// Base geometries we want in the scene
const BASE_SHAPES = [
  { id: 0, ShapeComp: Box, args: [0.6, 0.6, 0.6] },
  { id: 1, ShapeComp: Sphere, args: [0.4, 16, 16] },
  { id: 2, ShapeComp: Cone, args: [0.35, 1.0, 16] },
  { id: 3, ShapeComp: Torus, args: [0.25, 0.15, 8, 16] },
  { id: 4, ShapeComp: Cylinder, args: [0.25, 0.25, 0.8, 16] },
  { id: 5, ShapeComp: Dodecahedron, args: [0.45, 0] },
  { id: 6, ShapeComp: Icosahedron, args: [0.35, 0] },
];

// Randomized fixed slots, horizontally spread but vertically restricted to stay away from edges
const FIXED_POSITIONS = [
  { targetPos: [-3.5, 1.5, 0], startPos: [-5.0, -1.0, 0] },
  { targetPos: [2.0, 1.2, 0], startPos: [0, -1.8, 0] },
  { targetPos: [4.2, -0.5, 0], startPos: [3.5, 1.6, 0] },
  { targetPos: [-2.5, -1.5, 0], startPos: [-4.5, 1.4, 0] },
  { targetPos: [-0.6, 0.5, 0], startPos: [2.5, -1.5, 0] }, 
  { targetPos: [2.8, -1.6, 0], startPos: [-1.5, 1.5, 0] },
  { targetPos: [-4.8, -0.2, 0], startPos: [5.0, 0.8, 0] },
];

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

interface PlacedShapeProps {
  ShapeComp: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  scaleMult: number;
  targetPos: [number, number, number];
  glassMat: THREE.Material;
  allPlaced: boolean;
}

function PlacedShape({ ShapeComp, args, scaleMult, targetPos, glassMat, allPlaced }: PlacedShapeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    if (allPlaced) {
      groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
    } else {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.15;

      const mat = innerRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.lerp(new THREE.Color("#40E0D0"), 0.1);
      mat.emissive.lerp(new THREE.Color("#40E0D0"), 0.1);
      mat.emissiveIntensity = 1.0;
    }
  });

  return (
    <group position={targetPos}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <group ref={groupRef} scale={scaleMult}>
          {/* Outer wireframe */}
          {/* @ts-expect-error dynamic args mapping */}
          <ShapeComp args={args} scale={1.25}>
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
          </ShapeComp>

          {/* Inner solid */}
          {/* @ts-expect-error dynamic args mapping */}
          <ShapeComp ref={innerRef} args={args} material={glassMat} />
        </group>
      </Float>
    </group>
  );
}

function DraggableShape({
  id,
  ShapeComp,
  args,
  scaleMult,
  startPos,
  targetPos,
  onPlace,
  allPlaced,
}: {
  id: number;
  ShapeComp: React.ElementType;
  args: number[];
  scaleMult: number;
  startPos: [number, number, number];
  targetPos: [number, number, number];
  onPlace: (id: number) => void;
  allPlaced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const [isPlaced, setIsPlaced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Entry scale animation: lerps from 0 → 1 when shape first mounts
  const entryScaleRef = useRef(0);

  // Animate distance color and fade out on allPlaced
  useFrame((state, delta) => {
    if (!groupRef.current || !innerMeshRef.current) return;

    if (allPlaced) {
      groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
      return;
    }

    // Smooth entry: scale up from 0 → 1 on mount
    entryScaleRef.current = THREE.MathUtils.lerp(entryScaleRef.current, 1, delta * 2.5);
    groupRef.current.scale.setScalar(entryScaleRef.current);

    if (!isPlaced) {
      if (!isHovered) {
        groupRef.current.rotation.x += delta * 0.5;
        groupRef.current.rotation.y += delta * 0.3;
      }

      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      const dist = Math.sqrt(
        Math.pow(worldPos.x - targetPos[0], 2) + Math.pow(worldPos.y - targetPos[1], 2)
      );

      const mat = innerMeshRef.current.material as THREE.MeshPhysicalMaterial;
      if (dist < 1.0) {
        mat.color.lerp(new THREE.Color("#40E0D0"), 0.2);
        mat.emissive.lerp(new THREE.Color("#40E0D0"), 0.2);
        mat.emissiveIntensity = 2.0;
      } else {
        const baseColor = isHovered ? "#60F0E0" : "#20A0B0";
        mat.color.lerp(new THREE.Color(baseColor), 0.2);
        mat.emissive.lerp(new THREE.Color("#000000"), 0.2);
        mat.emissiveIntensity = isHovered ? 0.3 : 0.0;
      }
    }
  });

  // Reusable custom material instance creation mapped to useMemo
  const glassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ ...glassMaterialProps, color: "#20A0B0" }),
    []
  );

  if (isPlaced) {
    return (
      <PlacedShape
        ShapeComp={ShapeComp}
        args={args}
        scaleMult={scaleMult}
        targetPos={targetPos}
        glassMat={glassMat}
        allPlaced={allPlaced}
      />
    );
  }

  return (
    <DragControls
      onDragEnd={() => {
        if (!groupRef.current) return;
        const worldPos = new THREE.Vector3();
        groupRef.current.getWorldPosition(worldPos);
        const dist = Math.sqrt(
          Math.pow(worldPos.x - targetPos[0], 2) + Math.pow(worldPos.y - targetPos[1], 2)
        );
        if (dist < 1.0) {
          // snap if close
          setIsPlaced(true);
          onPlace(id);
          document.body.style.cursor = "default";
        } else {
          document.body.style.cursor = "grab";
        }
      }}
    >
      <group
        ref={groupRef}
        position={startPos}
        onPointerOver={(e: React.PointerEvent<HTMLDivElement>) => {
          if (allPlaced) return;
          e.stopPropagation?.();
          document.body.style.cursor = "grab";
          setIsHovered(true);
        }}
        onPointerOut={(e: React.PointerEvent<HTMLDivElement>) => {
          if (allPlaced) return;
          e.stopPropagation?.();
          document.body.style.cursor = "default";
          setIsHovered(false);
        }}
        onPointerDown={() => {
          if (!allPlaced) document.body.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          if (!allPlaced) document.body.style.cursor = "grab";
        }}
      >
        <group scale={scaleMult}>
          {/* Outer wireframe (Spline style border with air) */}
          {/* @ts-expect-error dynamic args mapping */}
          <ShapeComp args={args} scale={1.25}>
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
          </ShapeComp>

          {/* Inner solid */}
          {/* @ts-expect-error dynamic args mapping */}
          <ShapeComp ref={innerMeshRef} args={args} material={glassMat} />
        </group>
      </group>
    </DragControls>
  );
}

function TargetHole({
  ShapeComp,
  args,
  scaleMult,
  position,
  allPlaced,
}: {
  ShapeComp: React.ElementType;
  args: number[];
  scaleMult: number;
  position: [number, number, number];
  allPlaced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current && allPlaced) {
      meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
    }
  });

  return (
    <group position={position} scale={scaleMult}>
      {/* @ts-expect-error dynamic args mapping */}
      <ShapeComp ref={meshRef} args={args}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </ShapeComp>
    </group>
  );
}

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  // Tracks which shapes have been placed (by sequential index)
  const [placedCount, setPlacedCount] = useState(0);
  // Tracks which shape index is currently active (visible & draggable)
  const [activeIndex, setActiveIndex] = useState(0);

  const allPlaced = placedCount === BASE_SHAPES.length;

  const [shapesData, setShapesData] = useState<
    Array<{
      id: number;
      ShapeComp: React.ElementType;
      args: number[];
      targetPos: [number, number, number];
      startPos: [number, number, number];
      scaleMult: number;
    }>
  >([]);

  useEffect(() => {
    setMounted(true);
    const shuffledPositions = shuffleArray(FIXED_POSITIONS);
    const generatedShapes = BASE_SHAPES.map((shape, idx) => {
      const randomScale = 0.7 + Math.random() * 0.65;
      return {
        ...shape,
        targetPos: shuffledPositions[idx].targetPos as [number, number, number],
        startPos: shuffledPositions[idx].startPos as [number, number, number],
        scaleMult: randomScale,
      };
    });
    setShapesData(generatedShapes);
  }, []);

  // When a shape is placed, reveal the next one
  const handlePlace = (id: number) => {
    document.body.style.cursor = "default";
    setPlacedCount((prev) => prev + 1);
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 50 }}
      style={{ touchAction: "none" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} color="#40E0D0" />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#40E0D0" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#20A0B0" />

        <MouseSpotlight />

        <Stars radius={50} depth={20} count={1500} factor={3} saturation={0} fade speed={0.5} />

        {mounted && (
          <Html center position={[0, -2.6, 0]} className="pointer-events-none select-none">
            <p
              className={`text-primary/70 mb-4 w-max text-sm font-bold tracking-[0.2em] uppercase transition-opacity duration-1000 ${allPlaced ? "opacity-0" : "animate-pulse opacity-100"}`}
            >
              Drag to connect
            </p>
          </Html>
        )}

        {mounted && (
          <group>
            {/* Target holes (backgrounds) — always visible from the start */}
            {shapesData.map((s) => (
              <TargetHole
                key={`hole-${s.id}`}
                ShapeComp={s.ShapeComp}
                args={s.args}
                scaleMult={s.scaleMult}
                position={s.targetPos}
                allPlaced={allPlaced}
              />
            ))}

            {/* Draggable shapes — revealed one at a time sequentially.
                Once placed (becomes PlacedShape internally), keep mounted so it stays visible. */}
            {shapesData.map((s, idx) =>
              idx <= activeIndex ? (
                <DraggableShape
                  key={`shape-${s.id}`}
                  id={s.id}
                  ShapeComp={s.ShapeComp}
                  args={s.args}
                  scaleMult={s.scaleMult}
                  startPos={s.startPos}
                  targetPos={s.targetPos}
                  onPlace={handlePlace}
                  allPlaced={allPlaced}
                />
              ) : null
            )}
          </group>
        )}

        <InteractiveGlobe allPlaced={allPlaced} />
      </Suspense>
    </Canvas>
  );
}
