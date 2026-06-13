import React, { useEffect, useRef } from 'react';

const YantraBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = null;
    let checkInterval = null;

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE) return false;

      // Create canvas dynamically to prevent WebGL context reuse conflicts
      const canvas = document.createElement('canvas');
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      container.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 7;

      const COUNT = window.innerWidth < 800 ? 4800 : 9500;
      const GOLDEN = Math.PI * (3 - Math.sqrt(5));

      function formYantra(i, n) {
        const t = i / n;
        const triIdx = Math.floor(t * 9) % 9;
        const up = triIdx % 2 === 0;
        const scale = 1.1 + triIdx * 0.34;
        const seg = (i * 0.618) % 3;
        const f = (i * GOLDEN) % 1;
        const a0 = (up ? -Math.PI / 2 : Math.PI / 2) + seg * (2 * Math.PI / 3);
        const a1 = a0 + 2 * Math.PI / 3;
        let x = Math.cos(a0) * scale + (Math.cos(a1) * scale - Math.cos(a0) * scale) * f;
        let y = Math.sin(a0) * scale + (Math.sin(a1) * scale - Math.sin(a0) * scale) * f;
        if (i % 23 === 0) {
          const r = Math.random() * 0.16;
          const a = Math.random() * Math.PI * 2;
          x = Math.cos(a) * r;
          y = Math.sin(a) * r;
        }
        return [x, y, Math.sin(i) * 0.18];
      }

      const FORMS = [
        formYantra,
        (i, n) => {
          const r = Math.sqrt(i / n) * 3.4;
          const a = i * GOLDEN;
          return [Math.cos(a) * r, Math.sin(a) * r, Math.sin(r * 2.4) * 0.32];
        },
        (i, n) => {
          const a = (i / n) * Math.PI * 2 * 9;
          const petal = Math.sin(a * 0.5) ** 2;
          const r = 2.1 + petal * 1.15 + (i % 7) * 0.012;
          const ga = i * GOLDEN * 0.02 + (i / n) * Math.PI * 2;
          return [Math.cos(ga) * r, Math.sin(ga) * r, Math.cos(a) * 0.22];
        },
        (i, n) => {
          const a = i * GOLDEN;
          const r = 2.6 + ((i * 0.37) % 2.6);
          return [Math.cos(a) * r, Math.sin(a) * r * 0.62, ((i % 97) / 97 - 0.5) * 3];
        }
      ];

      const positions = new Float32Array(COUNT * 3);
      const targetsA = new Float32Array(COUNT * 3);
      const targetsB = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const p = formYantra(i, COUNT);
        positions.set(p, i * 3);
        targetsA.set(p, i * 3);
        targetsB.set(FORMS[1](i, COUNT), i * 3);
        seeds[i] = Math.random();
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.016,
        transparent: true,
        opacity: 0.8,
        color: new THREE.Color('#d4ab57'),
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      // Synchronize color from CSS variable on mount if already active
      const activeColor = document.documentElement.style.getPropertyValue('--rasa');
      if (activeColor) {
        mat.color.set(activeColor.trim() === '#e8e1cf' ? '#cfc7b2' : activeColor.trim());
      }

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let mouseX = 0, mouseY = 0, scrollT = 0;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const handleScroll = () => {
        const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const docHeight = scrollHeight - window.innerHeight;
        scrollT = docHeight > 0 ? window.scrollY / docHeight : 0;
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);

      let veilTarget = 0.85;
      const targetColor = new THREE.Color(mat.color.getHex());

      const handleRasaChange = (e) => {
        if (e.detail && e.detail.color) {
          const c = e.detail.color;
          targetColor.set(c === '#e8e1cf' ? '#cfc7b2' : c);
        }
      };
      window.addEventListener('rasa-change', handleRasaChange);

      const zones = Array.from(document.querySelectorAll('section[data-bg]'));
      const zoneTick = () => {
        if (zones.length === 0) return;
        const mid = window.innerHeight * 0.5;
        let best = zones[0];
        for (const z of zones) {
          const r = z.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) {
            best = z;
            break;
          }
          if (r.top > mid) break;
          best = z;
        }
        veilTarget = best.dataset.veil !== undefined ? parseFloat(best.dataset.veil) : 0.85;
      };
      window.addEventListener('scroll', zoneTick, { passive: true });
      zoneTick();

      let blend = 0, curA = -1, curB = -1;

      function setFormTargets(idx, buf) {
        const fn = FORMS[idx];
        for (let i = 0; i < COUNT; i++) {
          buf.set(fn(i, COUNT), i * 3);
        }
      }

      function pickForms(t) {
        let z = t < 0.22 ? 0 : t < 0.46 ? 1 : t < 0.76 ? 2 : 3;
        let l;
        if (z === 0) l = t / 0.22;
        else if (z === 1) l = (t - 0.22) / 0.24;
        else if (z === 2) l = (t - 0.46) / 0.30;
        else l = (t - 0.76) / 0.24;
        return [z, Math.min(z + 1, 3), Math.max(0, Math.min(1, (l - 0.62) / 0.38))];
      }

      const clock = new THREE.Clock();
      let animationFrameId;

      const tick = () => {
        animationFrameId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        const [za, zb, bl] = pickForms(scrollT);

        if (za !== curA) {
          setFormTargets(za, targetsA);
          curA = za;
        }
        if (zb !== curB) {
          setFormTargets(zb, targetsB);
          curB = zb;
        }

        blend += (bl - blend) * 0.06;
        const breathe = reduceMotion ? 1 : 1 + Math.sin(t * Math.PI / 2) * 0.035;
        const pos = geo.attributes.position.array;
        const drift = reduceMotion ? 0 : 1;

        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const tx = targetsA[ix] + (targetsB[ix] - targetsA[ix]) * blend;
          const ty = targetsA[ix + 1] + (targetsB[ix + 1] - targetsA[ix + 1]) * blend;
          const tz = targetsA[ix + 2] + (targetsB[ix + 2] - targetsA[ix + 2]) * blend;

          pos[ix] += (tx * breathe + Math.sin(t * 0.7 + seeds[i] * 12) * 0.02 * drift - pos[ix]) * 0.045;
          pos[ix + 1] += (ty * breathe + Math.cos(t * 0.6 + seeds[i] * 9) * 0.02 * drift - pos[ix + 1]) * 0.045;
          pos[ix + 2] += (tz - pos[ix + 2]) * 0.045;
        }

        geo.attributes.position.needsUpdate = true;

        points.rotation.z += reduceMotion ? 0 : 0.0006;
        points.rotation.y += (mouseX * 0.22 - points.rotation.y) * 0.03;
        points.rotation.x += (-mouseY * 0.16 - points.rotation.x) * 0.03;

        mat.color.lerp(targetColor, 0.04);
        mat.opacity += (veilTarget - mat.opacity) * 0.05;

        renderer.render(scene, camera);
      };

      tick();

      cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('rasa-change', handleRasaChange);
        window.removeEventListener('scroll', zoneTick);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
      };

      return true;
    };

    if (!initThree()) {
      checkInterval = setInterval(() => {
        if (initThree()) {
          clearInterval(checkInterval);
        }
      }, 50);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={containerRef} id="yantra" aria-hidden="true" />;
};

export default YantraBackground;
