"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const places = [
  { lat: -1.2864, lon: 36.8172 },
  { lat: -6.369, lon: 34.8888 },
  { lat: 1.3733, lon: 32.2903 },
];

function coordinates(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function Globe() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia("(max-width: 767px)").matches) return;

    const styles = window.getComputedStyle(document.documentElement);
    const palette = {
      navy: styles.getPropertyValue("--color-navy").trim(),
      teal: styles.getPropertyValue("--color-teal").trim(),
      amber: styles.getPropertyValue("--color-amber").trim(),
    };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = 0.15;
    group.rotation.y = -0.65;
    scene.add(group);

    const sphereGeometry = new THREE.IcosahedronGeometry(1.42, 4);
    const sphere = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({ color: palette.navy, transparent: true, opacity: 0.88 }),
    );
    group.add(sphere);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(sphereGeometry),
      new THREE.LineBasicMaterial({ color: palette.teal, transparent: true, opacity: 0.42 }),
    );
    group.add(wireframe);

    const dots: THREE.Mesh[] = [];
    places.forEach((place, index) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(index === 0 ? 0.045 : 0.034, 12, 12),
        new THREE.MeshBasicMaterial({ color: index === 0 ? palette.amber : palette.teal }),
      );
      dot.position.copy(coordinates(place.lat, place.lon, 1.47));
      group.add(dot);
      dots.push(dot);
    });

    let visible = true;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);

    const resize = () => {
      const size = Math.min(host.clientWidth, host.clientHeight);
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      if (!visible) return;
      group.rotation.y += 0.003;
      const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.12;
      dots.forEach((dot) => dot.scale.setScalar(pulse));
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
      sphereGeometry.dispose();
      (sphere.material as THREE.Material).dispose();
      (wireframe.geometry as THREE.BufferGeometry).dispose();
      (wireframe.material as THREE.Material).dispose();
      dots.forEach((dot) => {
        (dot.geometry as THREE.BufferGeometry).dispose();
        (dot.material as THREE.Material).dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-globe" aria-label="Rotating globe highlighting Kenya, Tanzania and Uganda" role="img" />;
}
