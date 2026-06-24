"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./ThreeDHeroCanvas.module.css";

type RoomData = {
  id: string;
  name: string;
  desc: string;
  type: "pg" | "mess" | "chill";
  price: string;
  x: number;
  y: number;
  z: number;
};

const ROOM_METADATA: RoomData[] = [
  { id: "1", name: "UPES Boys PG", desc: "Bidholi Valley view", type: "pg", price: "₹7,500/mo", x: -1.2, y: -0.8, z: 1.2 },
  { id: "2", name: "Graphic Era Stay", desc: "Clement Town girls wing", type: "pg", price: "₹9,000/mo", x: 1.2, y: -0.8, z: 1.2 },
  { id: "3", name: "DIT Single Room", desc: "Geyser & balcony included", type: "pg", price: "₹11,000/mo", x: -1.2, y: 0.8, z: 1.2 },
  { id: "4", name: "Rooftop Cafeteria", desc: "Chill zone & Wi-Fi hub", type: "chill", price: "Free Zone", x: 1.2, y: 0.8, z: 1.2 },
  { id: "5", name: "Maa Ki Rasoi", desc: "Pure Veg Mess", type: "mess", price: "₹2,800/mo", x: -1.2, y: -0.8, z: -1.2 },
  { id: "6", name: "Tiffin Service Hub", desc: "Premium food delivery", type: "mess", price: "₹2,500/mo", x: 1.2, y: -0.8, z: -1.2 },
  { id: "7", name: "IMS Premium Suite", desc: "Balcony views", type: "pg", price: "₹8,500/mo", x: -1.2, y: 0.8, z: -1.2 },
  { id: "8", name: "Scooty Parking Block", desc: "24/7 security cameras", type: "chill", price: "Secure", x: 1.2, y: 0.8, z: -1.2 },
];

export default function ThreeDHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredRoom, setHoveredRoom] = useState<RoomData | null>(null);
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
    scene.fog = new THREE.FogExp2(0x07090e, 0.05);

    // --- CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0, 0);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x2dd4bf, 1.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.0);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // --- BUILDING CREATION ---
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Base Grid Grid Helper (looks cool in wireframe)
    const gridHelper = new THREE.GridHelper(10, 10, 0x1f2937, 0x1f2937);
    gridHelper.position.y = -1.8;
    buildingGroup.add(gridHelper);

    // Create individual room blocks
    const roomMeshes: { mesh: THREE.Mesh; metadata: RoomData }[] = [];

    const geom = new THREE.BoxGeometry(1.6, 1.2, 1.6);

    ROOM_METADATA.forEach((room) => {
      // Room core (semi-transparent solid)
      const color = room.type === "pg" ? 0x2dd4bf : room.type === "mess" ? 0xf59e0b : 0xa855f7;
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(room.x, room.y, room.z);
      mesh.userData = { roomId: room.id };

      // Edges (neon outlines)
      const edges = new THREE.EdgesGeometry(geom);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        linewidth: 2,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      buildingGroup.add(mesh);
      roomMeshes.push({ mesh, metadata: room });
    });

    // Particle field around building
    const pGeom = new THREE.BufferGeometry();
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 12;
      pPos[i + 1] = (Math.random() - 0.5) * 8;
      pPos[i + 2] = (Math.random() - 0.5) * 12;
    }
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    buildingGroup.add(particles);

    // --- INTERACTIVE MOUSE ROTATION ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.5; // Start angled slightly
    let targetRotationX = 0.2;

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

      // Bound rotation X
      targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX));

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

      targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMoveDrag);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onMouseUp);

    // --- RAYCASTER FOR HOVER SELECTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        roomMeshes.map((r) => r.mesh)
      );

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const metadataObj = roomMeshes.find((r) => r.mesh === hoveredMesh);

        if (metadataObj) {
          setHoveredRoom(metadataObj.metadata);

          // Visual highlight (glowing opacity)
          roomMeshes.forEach((r) => {
            const isTarget = r.mesh === hoveredMesh;
            const mat = r.mesh.material as THREE.MeshBasicMaterial;
            mat.opacity = isTarget ? 0.35 : 0.08;
            const line = r.mesh.children[0] as THREE.LineSegments;
            const lineMat = line.material as THREE.LineBasicMaterial;
            lineMat.color.setHex(isTarget ? 0xffffff : r.metadata.type === "pg" ? 0x2dd4bf : r.metadata.type === "mess" ? 0xf59e0b : 0xa855f7);
          });
        }
      } else {
        setHoveredRoom(null);
        // Revert all meshes to default opacity
        roomMeshes.forEach((r) => {
          const mat = r.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.12;
          const line = r.mesh.children[0] as THREE.LineSegments;
          const lineMat = line.material as THREE.LineBasicMaterial;
          lineMat.color.setHex(r.metadata.type === "pg" ? 0x2dd4bf : r.metadata.type === "mess" ? 0xf59e0b : 0xa855f7);
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

      // Smooth rotation interpolation
      buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y) * 0.08;
      buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.08;

      // Slow passive rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.001;
      }

      // Pulse the central point light
      const time = Date.now() * 0.0015;
      pointLight.intensity = 1.0 + Math.sin(time) * 0.3;

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
      geom.dispose();
      pGeom.dispose();
      pMat.dispose();
    };
  }, [isClient]);

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Real-time WebGL interactive label overlay */}
      <div className={`${styles.tooltip} ${hoveredRoom ? styles.visible : ""}`}>
        {hoveredRoom ? (
          <>
            <div className={styles.header}>
              <span className={`${styles.dot} ${styles[hoveredRoom.type]}`} />
              <span className={styles.typeName}>{hoveredRoom.type.toUpperCase()}</span>
            </div>
            <h4 className={styles.name}>{hoveredRoom.name}</h4>
            <p className={styles.desc}>{hoveredRoom.desc}</p>
            <div className={styles.divider} />
            <div className={styles.footer}>
              <span className={styles.price}>{hoveredRoom.price}</span>
              <span className={styles.interactiveHint}>Click listing to view details</span>
            </div>
          </>
        ) : (
          <div className={styles.guideText}>
            🖱️ Drag to rotate 3D complex<br/>
            🎯 Hover rooms to inspect
          </div>
        )}
      </div>
    </div>
  );
}
