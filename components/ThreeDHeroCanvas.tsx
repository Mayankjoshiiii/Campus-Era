"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./ThreeDHeroCanvas.module.css";

type MarkerData = {
  id: string;
  name: string;
  desc: string;
  type: "pg" | "mess" | "chill";
  price: string;
  hint: string;
};

const MARKERS_INFO: Record<string, MarkerData> = {
  "pin-stay": {
    id: "pin-stay",
    name: "Student Hostels & PGs",
    desc: "Verified single/double sharing rooms near Bidholi & Clement Town. No Brokerage.",
    type: "pg",
    price: "From ₹5,500/mo",
    hint: "Click 'Browse PGs' to view active rooms",
  },
  "pin-eat": {
    id: "pin-eat",
    name: "Doon Tiffin & Mess",
    desc: "Daily meal services near major colleges. Veg and non-veg options with home delivery.",
    type: "mess",
    price: "From ₹2,500/mo",
    hint: "Click 'Mess' in the menu to filter providers",
  },
  "pin-chill": {
    id: "pin-chill",
    name: "Doon Survival Corner",
    desc: "Local travel cheat sheets, late-night cafe guides, and contract rules created by seniors.",
    type: "chill",
    price: "100% Student Guides",
    hint: "Check out the Doon Survival Guide below",
  },
};

export default function ThreeDHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredMarker, setHoveredMarker] = useState<MarkerData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    // --- CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 9);
    camera.lookAt(0, -0.5, 0);

    // --- RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x2dd4bf, 1.8);
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight2.position.set(-6, 4, -8);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.0, 15);
    pointLight.position.set(0, 1.5, 0);
    scene.add(pointLight);

    // --- CAMPUS WORLD ---
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // 1. Grassy Lawn baseboard
    const baseGeom = new THREE.BoxGeometry(6, 0.25, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0c1e1d, // Dark emerald green forest grass
      roughness: 0.8,
      metalness: 0.1,
    });
    const baseBoard = new THREE.Mesh(baseGeom, baseMat);
    baseBoard.position.y = -0.625;
    campusGroup.add(baseBoard);

    // 2. Low-Poly Hills/Mountains (representing Dehradun hills)
    const hillMat = new THREE.MeshStandardMaterial({
      color: 0x091419,
      roughness: 0.9,
    });
    const hill1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.5, 4), hillMat);
    hill1.position.set(-2, 0.5, -2);
    campusGroup.add(hill1);

    const hill2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.8, 4), hillMat);
    hill2.position.set(-0.8, 0.2, -2.3);
    campusGroup.add(hill2);

    // Helper functions for low-poly houses
    const createHouse = (x: number, z: number, color: number, height = 0.8) => {
      const houseGroup = new THREE.Group();
      houseGroup.position.set(x, -0.5, z);

      // Walls
      const wallGeom = new THREE.BoxGeometry(0.7, height, 0.7);
      const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      const walls = new THREE.Mesh(wallGeom, wallMat);
      walls.position.y = height / 2;
      houseGroup.add(walls);

      // Roof (Pyramid style)
      const roofGeom = new THREE.ConeGeometry(0.6, 0.45, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 }); // Orange roof
      const roof = new THREE.Mesh(roofGeom, roofMat);
      roof.position.y = height + 0.225;
      roof.rotation.y = Math.PI / 4;
      houseGroup.add(roof);

      // Door (Tiny dark box)
      const doorGeom = new THREE.BoxGeometry(0.18, 0.38, 0.02);
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
      const door = new THREE.Mesh(doorGeom, doorMat);
      door.position.set(0, 0.19, 0.355);
      houseGroup.add(door);

      campusGroup.add(houseGroup);
    };

    // Build the relatable PGs
    createHouse(-1.5, 1.5, 0x2dd4bf, 0.7); // Teal Boy's Hostel
    createHouse(1.5, 1.5, 0xa855f7, 0.8);  // Purple Girl's PG
    createHouse(-0.5, 0.8, 0x14b8a6, 0.6); // Middle room

    // 3. Mess Area (Represented as a Low-Poly outdoor dining pavilion)
    const messGroup = new THREE.Group();
    messGroup.position.set(1.5, -0.5, -1.2);
    // Table
    const tableGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 6);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
    const table = new THREE.Mesh(tableGeom, tableMat);
    table.position.y = 0.3;
    messGroup.add(table);
    // Table leg
    const legGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 5);
    const leg = new THREE.Mesh(legGeom, new THREE.MeshStandardMaterial({ color: 0x1f2937 }));
    leg.position.y = 0.15;
    messGroup.add(leg);
    // Plates (tiny colored discs)
    const plateGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 5);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const plate = new THREE.Mesh(plateGeom, plateMat);
    plate.position.set(0, 0.35, 0);
    messGroup.add(plate);

    campusGroup.add(messGroup);

    // 4. Low-Poly Trees
    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, -0.5, z);

      // Trunk
      const trunkGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.35, 5);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);
      trunk.position.y = 0.175;
      treeGroup.add(trunk);

      // Leaves
      const leavesGeom = new THREE.ConeGeometry(0.3, 0.6, 5);
      const leavesMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.9 });
      const leaves = new THREE.Mesh(leavesGeom, leavesMat);
      leaves.position.y = 0.6;
      treeGroup.add(leaves);

      campusGroup.add(treeGroup);
    };

    createTree(-1.8, 0);
    createTree(-0.3, 1.8);
    createTree(0.6, 1.8);
    createTree(1.8, 0.5);
    createTree(0, -1.2);

    // --- INTERACTIVE MARKERS (Glow Octahedrons) ---
    const markers: { mesh: THREE.Mesh; id: string }[] = [];

    const createInteractiveMarker = (id: string, color: number, x: number, y: number, z: number) => {
      const markerGeom = new THREE.OctahedronGeometry(0.24, 0);
      const markerMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const marker = new THREE.Mesh(markerGeom, markerMat);
      marker.position.set(x, y, z);
      marker.userData = { pinId: id };

      // Orbit/Border ring around the pin
      const ringGeom = new THREE.RingGeometry(0.35, 0.38, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      marker.add(ring);

      campusGroup.add(marker);
      markers.push({ mesh: marker, id });
    };

    // Place relatable interactive markers
    createInteractiveMarker("pin-stay", 0x2dd4bf, 0, 1.2, 1.0);     // Above hostels (front-center)
    createInteractiveMarker("pin-eat", 0xf59e0b, 1.5, 0.8, -1.2);   // Above mess tables (back-right)
    createInteractiveMarker("pin-chill", 0xa855f7, -1.4, 1.3, -1.4); // Above Dehradun hills (back-left)

    // Ambient floating particles
    const pGeom = new THREE.BufferGeometry();
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 8;
      pPos[i + 1] = Math.random() * 4 - 0.5;
      pPos[i + 2] = (Math.random() - 0.5) * 8;
    }
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeom, pMat);
    campusGroup.add(particles);

    // --- INTERACTIVE DRAG TO ROTATE ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.55;
    let targetRotationX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMoveDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;

      // Bound X rotation
      targetRotationX = Math.max(-0.2, Math.min(0.7, targetRotationX));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;

      targetRotationX = Math.max(-0.2, Math.min(0.7, targetRotationX));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMoveDrag);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onMouseUp);

    // --- RAYCASTER FOR SELECTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        markers.map((m) => m.mesh)
      );

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const markerId = hoveredMesh.userData.pinId;
        const info = MARKERS_INFO[markerId];

        if (info) {
          setHoveredMarker(info);

          // Animate hovered marker
          markers.forEach((m) => {
            const isTarget = m.mesh === hoveredMesh;
            const mat = m.mesh.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = isTarget ? 1.8 : 0.4;
            const ring = m.mesh.children[0] as THREE.Mesh;
            ring.scale.setScalar(isTarget ? 1.3 : 1.0);
          });
        }
      } else {
        setHoveredMarker(null);
        markers.forEach((m) => {
          const mat = m.mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.8;
          const ring = m.mesh.children[0] as THREE.Mesh;
          ring.scale.setScalar(1.0);
        });
      }
    };

    container.addEventListener("mousemove", onCanvasMouseMove);

    // --- WINDOW RESIZE ---
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // --- ANIMATION LOOP ---
    let reqId = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Rotate group towards mouse drag coordinates
      campusGroup.rotation.y += (targetRotationY - campusGroup.rotation.y) * 0.08;
      campusGroup.rotation.x += (targetRotationX - campusGroup.rotation.x) * 0.08;

      if (!isDragging) {
        // Slow auto rotation
        targetRotationY += 0.0006;
      }

      // Animate markers (Floating up and down + spinning)
      const time = Date.now() * 0.002;
      markers.forEach((m) => {
        m.mesh.rotation.y += 0.015;
        m.mesh.rotation.x += 0.005;
        
        // Custom vertical floats offset per marker
        const offset = m.id === "pin-stay" ? 0 : m.id === "pin-eat" ? 1.5 : 3.0;
        m.mesh.position.y += Math.sin(time + offset) * 0.0025;
      });

      // Pulse table light
      pointLight.intensity = 1.0 + Math.sin(time * 0.8) * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMoveDrag);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onMouseUp);
      container.removeEventListener("mousemove", onCanvasMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      baseGeom.dispose();
      baseMat.dispose();
      hillMat.dispose();
      tableGeom.dispose();
      tableMat.dispose();
      legGeom.dispose();
      plateGeom.dispose();
      plateMat.dispose();
      pGeom.dispose();
      pMat.dispose();
    };
  }, [isClient]);

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Floating details overlay */}
      <div className={`${styles.tooltip} ${hoveredMarker ? styles.visible : ""}`}>
        {hoveredMarker && (
          <>
            <div className={styles.header}>
              <span className={`${styles.dot} ${styles[hoveredMarker.type]}`} />
              <span className={styles.typeName}>{hoveredMarker.type.toUpperCase()}</span>
            </div>
            <h4 className={styles.name}>{hoveredMarker.name}</h4>
            <p className={styles.desc}>{hoveredMarker.desc}</p>
            <div className={styles.divider} />
            <div className={styles.footer}>
              <span className={styles.price}>{hoveredMarker.price}</span>
              <span className={styles.interactiveHint}>{hoveredMarker.hint}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
