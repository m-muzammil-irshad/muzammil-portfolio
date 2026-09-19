import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { techStackImageUrls } from "../data/techstackImages";

const textureLoader = new THREE.TextureLoader();
const imageUrls = techStackImageUrls;

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const sphereScales = [0.7, 0.9, 1, 1.1, 0.8];

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.05, delta);

    const position = api.current.translation();
    const drift = new THREE.Vector3(
      -0.28 * delta * scale,
      -0.65 * delta * scale,
      -0.28 * delta * scale
    );

    const direction = vec.copy(position).normalize();
    const impulse = direction.multiply(drift);

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.82}
      angularDamping={0.12}
      friction={0.14}
      restitution={0.18}
      position={[r(18), r(18) - 20, r(12) - 6]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.15 * scale]}
        args={[0.12 * scale, 0.22 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.25, 1, 0.8]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2.2,
        (pointer.y * viewport.height) / 2.8,
        0
      ),
      0.14
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (!workEl) {
        setIsActive(true);
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = workEl.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const spheres = useMemo(
    () =>
      Array.from({ length: Math.max(1, imageUrls.length) }, () => ({
        scale: sphereScales[Math.floor(Math.random() * sphereScales.length)],
      })),
    []
  );

  const materials = useMemo(() => {
    return imageUrls.map(
      (url) =>
        new THREE.MeshPhysicalMaterial({
          map: textureLoader.load(url),
          emissive: "#ffffff",
          emissiveMap: textureLoader.load(url),
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 34, near: 0.1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.2;
          state.gl.setClearAlpha(0);
        }}
        className="tech-canvas"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ambientLight intensity={1.2} />
        <spotLight
          position={[14, 12, 24]}
          penumbra={1}
          angle={0.28}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={1.8} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length] || materials[0]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
