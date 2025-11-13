import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface BuildingSection {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  name: string;
  description: string;
  slug: string;
}

const buildingSections: BuildingSection[] = [
  {
    position: [0, 0, 0],
    size: [4, 0.5, 4],
    color: "#8B4513",
    name: "Foundation & Excavation",
    description: "Structural integrity from the ground up",
    slug: "foundation-excavation",
  },
  {
    position: [0, 1.5, 0],
    size: [3.5, 2, 3.5],
    color: "#696969",
    name: "Structural Steel & Concrete",
    description: "Building the core framework",
    slug: "structural-steel",
  },
  {
    position: [0, 3.5, 0],
    size: [3.8, 1.5, 3.8],
    color: "#CD853F",
    name: "Building Envelope",
    description: "Weather protection and insulation",
    slug: "building-envelope",
  },
  {
    position: [-1.5, 5, 0],
    size: [1.5, 1.5, 3.8],
    color: "#4682B4",
    name: "Mechanical Systems",
    description: "HVAC, plumbing, and electrical",
    slug: "mechanical-systems",
  },
  {
    position: [1.5, 5, 0],
    size: [1.5, 1.5, 3.8],
    color: "#DDA0DD",
    name: "Interior Finishes",
    description: "Drywall, flooring, and millwork",
    slug: "interior-finishes",
  },
  {
    position: [0, 6.5, 0],
    size: [4, 0.3, 4],
    color: "#2F4F4F",
    name: "Roofing",
    description: "Complete roof systems",
    slug: "roofing",
  },
];

interface BuildingBoxProps extends BuildingSection {
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

const BuildingBox = ({
  position,
  size,
  color,
  isHovered,
  isSelected,
  onHover,
  onUnhover,
  onClick,
}: BuildingBoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered || isSelected ? 1.05 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      onClick={onClick}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isHovered || isSelected ? 0.3 : 0.1}
        transparent
        opacity={isHovered || isSelected ? 1 : 0.9}
      />
      {/* Edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
};

// Animated worker figure
const Worker = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime) * 2;
      groupRef.current.position.y = position[1];
      groupRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime) * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFE4B5" />
      </mesh>
      {/* Hard hat */}
      <mesh position={[0, 0.85, 0]}>
        <coneGeometry args={[0.18, 0.2, 6]} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
    </group>
  );
};

// Crane animation
const Crane = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[3, 4, 3]}>
      {/* Tower */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>
      {/* Arm */}
      <mesh position={[1, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>
      {/* Hook */}
      <mesh position={[2, 3.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};

const Building3DScene = ({ 
  onSectionSelect 
}: { 
  onSectionSelect: (section: BuildingSection) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Building sections */}
      {buildingSections.map((section, index) => (
        <BuildingBox
          key={index}
          {...section}
          isHovered={hoveredIndex === index}
          isSelected={selectedIndex === index}
          onHover={() => setHoveredIndex(index)}
          onUnhover={() => setHoveredIndex(null)}
          onClick={() => {
            setSelectedIndex(index);
            onSectionSelect(section);
          }}
        />
      ))}

      {/* Animated workers */}
      <Worker position={[-3, 0, -3]} />
      <Worker position={[3, 0, -3]} />

      {/* Crane */}
      <Crane />

      {/* Particles (sparks) */}
      {selectedIndex !== null && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={50}
              array={new Float32Array(
                Array.from({ length: 150 }, () => (Math.random() - 0.5) * 2)
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#FFA500" transparent opacity={0.6} />
        </points>
      )}
    </>
  );
};

export const IsometricBuilding3D = () => {
  const [selectedSection, setSelectedSection] = useState<BuildingSection | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-background rounded-xl overflow-hidden border border-border">
      <Canvas shadows>
        <Building3DScene onSectionSelect={setSelectedSection} />
      </Canvas>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Click & Drag</span> to rotate • 
          <span className="font-semibold text-foreground ml-2">Scroll</span> to zoom • 
          <span className="font-semibold text-foreground ml-2">Click sections</span> to explore
        </p>
      </div>

      {/* Selected section details */}
      {selectedSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-6 rounded-lg border border-border"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">
            {selectedSection.name}
          </h3>
          <p className="text-muted-foreground mb-4">
            {selectedSection.description}
          </p>
          <a
            href={`/services/${selectedSection.slug}`}
            className="inline-flex items-center text-primary hover:underline"
          >
            Learn More →
          </a>
        </motion.div>
      )}
    </div>
  );
};
