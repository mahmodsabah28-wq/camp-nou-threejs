// ===================== IMPORTS =====================
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// ===================== SCENE =====================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

// ===================== CAMERA =====================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

// لقطة سينمائية من الأعلى
camera.position.set(220, 55, 0);
camera.lookAt(0, 0, 0);

// ===================== RENDERER =====================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ===================== LIGHTING =====================
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(500, 800, 300);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

// ===================== GROUND =====================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x1e7f3b }) // عشب
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ===================== LOAD STADIUM =====================
const loader = new GLTFLoader();

loader.load(
  'models/camp_nou.gltf',
  (gltf) => {
    const stadium = gltf.scene;

    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);

    stadium.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    scene.add(stadium);
  },
  undefined,
  (error) => {
    console.error('GLTF Error:', error);
  }
);

// ===================== ANIMATION (CINEMATIC MOVE) =====================
let angle = 0;

function animate() {
  requestAnimationFrame(animate);

  // دوران سينمائي حول الملعب
  angle += 0.0008;
  camera.position.x = Math.cos(angle) * 220;
  camera.position.z = Math.sin(angle) * 220;
  camera.lookAt(0, 20, 0);

  renderer.render(scene, camera);
}

animate();

// ===================== RESIZE =====================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
