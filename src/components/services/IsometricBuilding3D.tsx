import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";

import { motion } from "framer-motion";
import * as THREE from "three";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/lib/analytics";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { useIsMobile } from "@/hooks/useIsMobile";

interface BuildingSection {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  name: string;
  description: string;
  slug: string;
}

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
  const glassGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered || isSelected ? 1.05 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  // Enhanced window creation with proper glass material
  const windows = [];
  const windowSize = 0.4;
  const windowSpacing = 0.6;
  const rows = Math.floor(size[1] / windowSpacing);
  const cols = Math.floor(size[0] / windowSpacing);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const windowColor = new THREE.Color(color);
      const glassColor = windowColor.clone().lerp(new THREE.Color("#87CEEB"), 0.7);
      
      windows.push(
        <mesh
          key={`window-${i}-${j}`}
          position={[
            -size[0] / 2 + j * windowSpacing + windowSpacing / 2,
            -size[1] / 2 + i * windowSpacing + windowSpacing / 2,
            size[2] / 2 + 0.02,
          ]}
          castShadow
        >
          <planeGeometry args={[windowSize, windowSize]} />
          <meshPhysicalMaterial
            color={glassColor}
            metalness={0.1}
            roughness={0.05}
            transmission={0.95}
            thickness={0.5}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={glassColor}
            emissiveIntensity={isHovered ? 0.4 : 0.2}
          />
        </mesh>
      );
    }
  }

  // Glass facade panels for modern look
  const glassPanels = [];
  const panelCount = 3;
  for (let i = 0; i < panelCount; i++) {
    glassPanels.push(
      <mesh
        key={`glass-panel-${i}`}
        position={[
          -size[0] / 4 + (i * size[0]) / (panelCount + 1),
          0,
          size[2] / 2 + 0.01,
        ]}
        castShadow
      >
        <planeGeometry args={[size[0] / (panelCount + 1), size[1] * 0.9]} />
        <meshPhysicalMaterial
          color={new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.5)}
          metalness={0.2}
          roughness={0.1}
          transmission={0.8}
          thickness={0.3}
          envMapIntensity={1.5}
          clearcoat={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    );
  }

  return (
    <group
      position={position}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      onClick={onClick}
    >
      {/* Main building structure - concrete material */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          metalness={0.15}
          roughness={0.85}
          envMapIntensity={0.5}
          emissive={color}
          emissiveIntensity={isHovered || isSelected ? 0.2 : 0.02}
        />
      </mesh>

      {/* Structural edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="#cccccc" transparent opacity={0.3} />
      </lineSegments>

      {/* Glass windows */}
      <group ref={glassGroupRef}>{windows}</group>

      {/* Glass facade panels */}
      <group>{glassPanels}</group>

      {/* Metal balconies */}
      {size[1] > 2 && (
        <>
          <mesh position={[0, -size[1] / 3, size[2] / 2 + 0.15]} castShadow>
            <boxGeometry args={[size[0] * 0.85, 0.08, 0.35]} />
            <meshStandardMaterial
              color="#444444"
              metalness={0.9}
              roughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
          <mesh position={[0, size[1] / 3, size[2] / 2 + 0.15]} castShadow>
            <boxGeometry args={[size[0] * 0.85, 0.08, 0.35]} />
            <meshStandardMaterial
              color="#444444"
              metalness={0.9}
              roughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
        </>
      )}

      {/* Rooftop details */}
      <mesh position={[0, size[1] / 2 + 0.1, 0]} castShadow>
        <boxGeometry args={[size[0] * 0.3, 0.2, size[2] * 0.3]} />
        <meshStandardMaterial
          color="#555555"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

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
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFA500" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#FFD700" roughness={0.8} />
      </mesh>
    </group>
  );
};

const Crane = () => {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[5, 0, 5]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 5]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh ref={armRef} position={[2, 5.5, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[4, 0.15, 0.15]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[3, 4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#2a2a2a"
        roughness={0.9}
        metalness={0.1}
        envMapIntensity={0.3}
      />
    </mesh>
  );
};

interface Building3DSceneProps {
  buildingSections: BuildingSection[];
  onSectionSelect: (slug: string, name: string) => void;
  qualityLevel: 'high' | 'medium' | 'low';
}

const Building3DScene = ({ buildingSections, onSectionSelect, qualityLevel }: Building3DSceneProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSectionClick = (index: number, slug: string, name: string) => {
    setSelectedIndex(index);
    onSectionSelect(slug, name);
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.4} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.6}
        position={[0, 50, 0]}
      />
      <directionalLight position={[10, 20, 5]} intensity={1.2} castShadow />
      <directionalLight
        position={[-10, 15, -5]}
        intensity={0.5}
        color="#4A90E2"
      />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#FFD700" />

      {/* HDRI Environment */}
      <Environment preset="city" />

      {/* Ground */}
      <Ground />
      
      {/* Contact Shadows for realism */}
      <ContactShadows
        position={[0, -0.49, 0]}
        opacity={0.6}
        scale={30}
        blur={2}
        far={10}
      />

      {/* Building sections */}
      {buildingSections.map((section, index) => (
        <BuildingBox
          key={section.slug}
          {...section}
          isHovered={hoveredIndex === index}
          isSelected={selectedIndex === index}
          onHover={() => setHoveredIndex(index)}
          onUnhover={() => setHoveredIndex(null)}
          onClick={() => handleSectionClick(index, section.slug, section.name)}
        />
      ))}

      {/* Animated elements */}
      <Worker position={[-4, 0, 0]} />
      <Worker position={[4, 0, -3]} />
      <Crane />

    </>
  );
};

export const IsometricBuilding3D = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [buildingSections, setBuildingSections] = useState<BuildingSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const hasWebGL = useWebGLSupport();
  const isMobile = useIsMobile();
  
  // Determine quality level based on device capabilities
  const qualityLevel: 'high' | 'medium' | 'low' = hasWebGL 
    ? (isMobile ? 'medium' : 'high')
    : 'low';

  useEffect(() => {
    loadBuildingSections();
  }, []);

  const loadBuildingSections = async () => {
    const { data } = await supabase
      .from('services')
      .select('name, slug, short_description')
      .eq('publish_state', 'published')
      .eq('featured', true)
      .limit(6);

    if (data) {
      const positions: [number, number, number][] = [
        [0, 2.5, 0],
        [-3, 1.5, -2],
        [3, 1.8, -2],
        [-3, 1.2, 2],
        [3, 1.5, 2],
        [0, 0.8, 4],
      ];

      const colors = [
        "#4A90E2",
        "#50C878",
        "#FF6B6B",
        "#FFD93D",
        "#A78BFA",
        "#F59E0B",
      ];

      const sizes: [number, number, number][] = [
        [2.5, 5, 2.5],
        [2, 3, 2],
        [2.2, 3.5, 2.2],
        [1.8, 2.5, 1.8],
        [2, 3, 2],
        [1.5, 1.8, 1.5],
      ];

      const sections: BuildingSection[] = data.map((service, index) => ({
        position: positions[index] || [0, 0, 0],
        size: sizes[index] || [2, 2, 2],
        color: colors[index] || "#888888",
        name: service.name,
        description: service.short_description || "",
        slug: service.slug,
      }));

      setBuildingSections(sections);
    }
    setLoading(false);
  };

  const handleSectionSelect = (slug: string, name: string) => {
    setSelectedSection(slug);
    trackCTAClick(name, "3d_building_section");
    
    setTimeout(() => {
      window.location.href = `/services/${slug}`;
    }, 300);
  };

  if (loading || buildingSections.length === 0) {
    return (
      <div className="w-full h-[600px] bg-muted/20 rounded-xl animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading 3D visualization...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-4"
      >
        <p className="text-sm text-muted-foreground">
          🖱️ Click and drag to rotate • Scroll to zoom • Click sections to explore
        </p>
      </motion.div>

      <div className="w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800 shadow-2xl">
        <Canvas
          shadows
          dpr={qualityLevel === 'high' ? [1, 2] : [1, 1.5]}
          gl={{
            antialias: qualityLevel !== 'low',
            alpha: true,
            powerPreference: qualityLevel === 'low' ? "low-power" : "high-performance",
          }}
          onCreated={({ gl }) => {
            // Handle WebGL context loss
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.warn('WebGL context lost, attempting to restore...');
              setError(true);
            });
            
            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
              setError(false);
            });
          }}
        >
          <Building3DScene
            buildingSections={buildingSections}
            onSectionSelect={handleSectionSelect}
            qualityLevel={qualityLevel}
          />
        </Canvas>
      </div>

      {selectedSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-primary/10 rounded-lg text-center"
        >
          <p className="text-sm text-muted-foreground">
            Loading {buildingSections.find(s => s.slug === selectedSection)?.name}...
          </p>
        </motion.div>
      )}
    </div>
  );
};
