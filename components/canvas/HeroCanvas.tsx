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
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// ─── Module-level reusable objects ────────────────────────────────────────────
// Allocated once, reused every frame to eliminate GC pressure.
const _v3a = new THREE.Vector3();
const _v3b = new THREE.Vector3();
const _colorA = new THREE.Color();
const _colorB = new THREE.Color();
// ──────────────────────────────────────────────────────────────────────────────

// Brand palette — matches design system tokens primary-100..primary-700 in globals.css.
const PRIMARY_100 = "#14ffbc";
const PRIMARY_200 = "#1ac89a";
const PRIMARY_300 = "#1f957a";
const PRIMARY_400 = "#188169";

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <span className="text-primary font-outfit text-3xl font-bold">{progress.toFixed(0)}%</span>
      <p className="text-foreground/70 mt-2 text-xs tracking-[0.3em] uppercase">
        Initializing WebGL
      </p>
    </Html>
  );
}

function MouseSpotlight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  useFrame(({ pointer }) => {
    if (!lightRef.current) return;
    _v3a.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 2);
    lightRef.current.position.lerp(_v3a, 0.1);
  });
  return <pointLight ref={lightRef} distance={15} intensity={3} color="#ffffff" decay={2} />;
}

const glassMaterialProps = {
  transmission: 0.5,
  opacity: 0.9,
  metalness: 0.2,
  roughness: 0.7,
  ior: 1.5,
  thickness: 0.5,
  envMapIntensity: 0.5,
  clearcoat: 0,
};

function InteractiveGlobe({ allPlaced }: { allPlaced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const speedRef = useRef({ y: 0.2, x: 0.1, distort: 0.4 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetScale = allPlaced ? 1 : 0;
    _v3a.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(_v3a, delta * 2);

    if (!allPlaced || !meshRef.current || !coreRef.current) return;

    const dist = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2);
    const intensity = 1.0 - Math.min(dist, 1.0);

    const targetY = 0.1 + 0.6 * intensity;
    const targetX = 0.05 + 0.3 * intensity;
    const targetDistort = 0.2 + 0.4 * intensity;

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
    if (mat.distort !== undefined) mat.distort = speedRef.current.distort;

    _colorA.set(PRIMARY_300);
    const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
    coreMat.color.lerp(_colorA, delta * 5);
    _colorB.set(PRIMARY_300).multiplyScalar(hovered ? 2.5 : 1.0);
    coreMat.emissive.lerp(_colorB, delta * 5);

    const wireMat = meshRef.current.material as THREE.MeshStandardMaterial;
    wireMat.color.lerp(_colorA, delta * 5);
  });

  return (
    <group ref={groupRef} scale={[0, 0, 0]} position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <Sphere ref={meshRef} args={[1.8, 32, 32]}>
            <MeshDistortMaterial
              color={PRIMARY_300}
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              wireframe
              transparent
              opacity={0.4}
            />
          </Sphere>
          <Sphere ref={coreRef} args={[0.9, 32, 32]}>
            <meshStandardMaterial
              color={PRIMARY_300}
              emissive={PRIMARY_300}
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

const BASE_SHAPES = [
  { id: 0, ShapeComp: Box, args: [0.6, 0.6, 0.6] },
  { id: 1, ShapeComp: Sphere, args: [0.4, 16, 16] },
  { id: 2, ShapeComp: Cone, args: [0.35, 1.0, 16] },
  { id: 3, ShapeComp: Torus, args: [0.25, 0.15, 8, 16] },
  { id: 4, ShapeComp: Cylinder, args: [0.25, 0.25, 0.8, 16] },
  { id: 5, ShapeComp: Dodecahedron, args: [0.45, 0] },
  { id: 6, ShapeComp: Icosahedron, args: [0.35, 0] },
];

const FIXED_POSITIONS = [
  { targetPos: [-3.5, 1.5, 0], startPos: [-5.0, -1.0, 0] },
  { targetPos: [2.0, 1.2, 0], startPos: [0, -1.8, 0] },
  { targetPos: [4.2, -0.5, 0], startPos: [3.5, 1.6, 0] },
  { targetPos: [-2.5, -1.5, 0], startPos: [-4.5, 1.4, 0] },
  { targetPos: [-0.6, 0.5, 0], startPos: [2.5, -1.5, 0] },
  { targetPos: [2.8, -1.6, 0], startPos: [-1.5, 1.5, 0] },
  { targetPos: [-4.8, -0.2, 0], startPos: [5.0, 0.8, 0] },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

function PlacedShape({
  ShapeComp,
  args,
  scaleMult,
  targetPos,
  glassMat,
  allPlaced,
}: PlacedShapeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    if (doneRef.current || !groupRef.current || !innerRef.current) return;
    if (allPlaced) {
      _v3a.set(0, 0, 0);
      groupRef.current.scale.lerp(_v3a, delta * 3);
      if (groupRef.current.scale.x < 0.01) doneRef.current = true;
    } else {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.15;
      const mat = innerRef.current.material as THREE.MeshPhysicalMaterial;
      _colorA.set(PRIMARY_300);
      mat.color.lerp(_colorA, 0.1);
      mat.emissive.lerp(_colorA, 0.1);
      mat.emissiveIntensity = 1.0;
    }
  });

  return (
    <group position={targetPos}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <group ref={groupRef} scale={scaleMult}>
          {/* @ts-expect-error dynamic args */}
          <ShapeComp args={args} scale={1.25}>
            <meshBasicMaterial color={PRIMARY_300} wireframe transparent opacity={0.4} />
          </ShapeComp>
          {/* @ts-expect-error dynamic args */}
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
  setCursor,
  isLightMode,
}: {
  id: number;
  ShapeComp: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  scaleMult: number;
  startPos: [number, number, number];
  targetPos: [number, number, number];
  onPlace: (id: number) => void;
  allPlaced: boolean;
  setCursor: (c: "default" | "grab" | "grabbing") => void;
  isLightMode: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const [isPlaced, setIsPlaced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const entryScaleRef = useRef(0);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    if (doneRef.current || !groupRef.current || !innerMeshRef.current) return;

    if (allPlaced) {
      _v3a.set(0, 0, 0);
      groupRef.current.scale.lerp(_v3a, delta * 3);
      if (groupRef.current.scale.x < 0.01) doneRef.current = true;
      return;
    }

    entryScaleRef.current = THREE.MathUtils.lerp(entryScaleRef.current, 1, delta * 2.5);
    groupRef.current.scale.setScalar(entryScaleRef.current);

    if (!isPlaced) {
      if (!isHovered) {
        groupRef.current.rotation.x += delta * 0.5;
        groupRef.current.rotation.y += delta * 0.3;
      }

      groupRef.current.getWorldPosition(_v3b);
      const dist = _v3b.distanceTo(_v3a.set(targetPos[0], targetPos[1], targetPos[2]));
      const mat = innerMeshRef.current.material as THREE.MeshPhysicalMaterial;

      if (dist < 1.0) {
        _colorA.set(PRIMARY_300);
        mat.color.lerp(_colorA, 0.2);
        mat.emissive.lerp(_colorA, 0.2);
        mat.emissiveIntensity = 2.0;
      } else {
        // Light mode keeps darker brand tones (visible on white bg).
        // Dark mode uses brighter palette + slight emissive so shapes stand out on the anthracite bg.
        const defaultColor = isLightMode ? PRIMARY_400 : PRIMARY_200;
        const hoverColor = isLightMode ? PRIMARY_300 : PRIMARY_100;
        _colorA.set(isHovered ? hoverColor : defaultColor);
        mat.color.lerp(_colorA, 0.2);
        if (isHovered) {
          _colorB.set(hoverColor);
          mat.emissive.lerp(_colorB, 0.2);
          mat.emissiveIntensity = isLightMode ? 0.3 : 0.6;
        } else {
          _colorB.set(isLightMode ? "#000000" : defaultColor);
          mat.emissive.lerp(_colorB, 0.2);
          mat.emissiveIntensity = isLightMode ? 0.0 : 0.25;
        }
      }
    }
  });

  const glassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ ...glassMaterialProps, color: PRIMARY_400 }),
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
        groupRef.current.getWorldPosition(_v3b);
        const dist = _v3b.distanceTo(_v3a.set(targetPos[0], targetPos[1], targetPos[2]));
        if (dist < 1.0) {
          setIsPlaced(true);
          onPlace(id);
          setCursor("default");
        } else {
          setCursor("grab");
        }
      }}
    >
      <group
        ref={groupRef}
        position={startPos}
        onPointerOver={(e: React.PointerEvent<HTMLDivElement>) => {
          if (allPlaced) return;
          e.stopPropagation?.();
          setCursor("grab");
          setIsHovered(true);
        }}
        onPointerOut={(e: React.PointerEvent<HTMLDivElement>) => {
          if (allPlaced) return;
          e.stopPropagation?.();
          setCursor("default");
          setIsHovered(false);
        }}
        onPointerDown={() => {
          if (!allPlaced) setCursor("grabbing");
        }}
        onPointerUp={() => {
          if (!allPlaced) setCursor("grab");
        }}
      >
        <group scale={scaleMult}>
          {/* @ts-expect-error dynamic args */}
          <ShapeComp args={args} scale={1.25}>
            <meshBasicMaterial color={PRIMARY_300} wireframe transparent opacity={0.3} />
          </ShapeComp>
          {/* @ts-expect-error dynamic args */}
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
  isLightMode,
}: {
  ShapeComp: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  scaleMult: number;
  position: [number, number, number];
  allPlaced: boolean;
  isLightMode: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    if (doneRef.current || !meshRef.current || !allPlaced) return;
    _v3a.set(0, 0, 0);
    meshRef.current.scale.lerp(_v3a, delta * 3);
    if (meshRef.current.scale.x < 0.01) doneRef.current = true;
  });

  return (
    <group position={position} scale={scaleMult}>
      {/* @ts-expect-error dynamic args */}
      <ShapeComp ref={meshRef} args={args}>
        <meshBasicMaterial
          color={isLightMode ? "#1a1a1a" : "#ffffff"}
          wireframe
          transparent
          opacity={isLightMode ? 0.25 : 0.12}
        />
      </ShapeComp>
    </group>
  );
}

export function HeroCanvas() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const [mounted, setMounted] = useState(false);
  const [placedCount, setPlacedCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursor, setCursor] = useState<"default" | "grab" | "grabbing">("default");

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
    const shuffled = shuffleArray(FIXED_POSITIONS);
    setShapesData(
      BASE_SHAPES.map((shape, idx) => ({
        ...shape,
        targetPos: shuffled[idx].targetPos as [number, number, number],
        startPos: shuffled[idx].startPos as [number, number, number],
        scaleMult: 0.7 + Math.random() * 0.65,
      }))
    );
  }, []);

  const handlePlace = (_id: number) => {
    setCursor("default");
    setPlacedCount((p) => p + 1);
    setActiveIndex((p) => p + 1);
  };

  return (
    <Canvas
      dpr={[1, 1]}
      camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 50 }}
      style={{ touchAction: "none", cursor }}
      onPointerLeave={() => setCursor("default")}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} color={PRIMARY_300} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color={PRIMARY_300} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color={PRIMARY_400} />

        <MouseSpotlight />

        <Stars radius={50} depth={20} count={700} factor={3} saturation={0} fade speed={0.5} />

        {mounted && (
          <Html center position={[0, -2.6, 0]} className="pointer-events-none select-none">
            <p
              className={`text-primary/70 mb-4 w-max text-sm font-bold tracking-[0.2em] uppercase transition-opacity duration-1000 ${allPlaced ? "opacity-0" : "animate-pulse opacity-100"}`}
            >
              {t("heroDragHint")}
            </p>
          </Html>
        )}

        {mounted && (
          <group>
            {shapesData.map((s) => (
              <TargetHole
                key={`hole-${s.id}`}
                ShapeComp={s.ShapeComp}
                args={s.args}
                scaleMult={s.scaleMult}
                position={s.targetPos}
                allPlaced={allPlaced}
                isLightMode={isLightMode}
              />
            ))}

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
                  setCursor={setCursor}
                  isLightMode={isLightMode}
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
