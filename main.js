import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// ================= SCENE =================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ================= CAMERA =================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

// بداية سينمائية من الأعلى
camera.position.set(0, 800, 1200);
camera.lookAt(0, 0, 0);

// ================= RENDERER =================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ================= LIGHTS =================
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(500, 800, 300);
scene.add(sun);

// ================= GROUND =================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ================= STADIUM (OPTIONAL) =================
const loader = new GLTFLoader();

loader.load(
  './models/camp_nou.gltf',
  (gltf) => {
    const stadium = gltf.scene;
    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);
    scene.add(stadium);
  },
  undefined,
  () => {
    console.warn('لم يتم تحميل نموذج الملعب – لا مشكلة');
  }
);

// ================= CINEMATIC CAMERA =================
let t = 0;

function cinematicCamera() {
  t += 0.002;

  camera.position.x = Math.sin(t) * 600;
  camera.position.z = Math.cos(t) * 600;
  camera.position.y = 500 - t * 120;

  if (camera.position.y < 120) {
    camera.position.y = 120;
  }

  camera.lookAt(0, 50, 0);
}

// ================= RESIZE =================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================= LOOP =================
function animate() {
  requestAnimationFrame(animate);
  cinematicCamera();
  renderer.render(scene, camera);
}

animate();
