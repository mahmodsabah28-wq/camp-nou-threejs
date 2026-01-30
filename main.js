// ===== استيراد Three.js من CDN (مهم جداً) =====
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// ===== المشهد =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // سماء زرقاء

// ===== الكاميرا (منظر سينمائي) =====
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(220, 55, 0);
camera.lookAt(0, 0, 0);

// ===== الـ Renderer =====
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ===== إضاءة واقعية =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(300, 400, 200);
scene.add(sunLight);

// ===== أرضية مؤقتة (للتأكد أن المشهد يعمل) =====
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshStandardMaterial({ color: 0x1e7f3b })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ===== تحميل ملعب كامب نو =====
const loader = new GLTFLoader();
loader.load(
  './models/camp_nou.gltf',
  (gltf) => {
    const stadium = gltf.scene;
    stadium.scale.set(10, 10, 10);
    stadium.position.set(0, 0, 0);
    scene.add(stadium);
    console.log('✅ Camp Nou Loaded');
  },
  undefined,
  (error) => {
    console.error('❌ Error loading model:', error);
  }
);

// ===== تحريك الكاميرا (بداية سينمائية بسيطة) =====
function animate() {
  requestAnimationFrame(animate);

  camera.position.x -= 0.15;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// ===== ضبط الحجم عند تغيير الشاشة =====
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
