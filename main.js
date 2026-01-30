import * as THREE from './libs/three.module.js';
import { GLTFLoader } from './libs/GLTFLoader.js';

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

// بداية سينمائية
camera.position.set(0, 600, 1200);
camera.lookAt(0, 0, 0);

// ================= RENDERER =================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ================= LIGHTS =================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(500, 800, 300);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
scene.add(sunLight);

// ================= GROUND =================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ================= LOAD STADIUM =================
const loader = new GLTFLoader();

loader.load(
  './models/camp_nou.gltf',
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
    console.log('Stadium loaded successfully');
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

// ================= CINEMATIC CAMERA =================
let t = 0;

function cinematicCamera() {
  t += 0.002;

  camera.position.x = Math.sin(t) * 800;
  camera.position.z = Math.cos(t) * 800;
  camera.position.y = 500 - t * 120;

  if (camera.position.y < 200) camera.position.y = 200;

  camera.lookAt(0, 80, 0);
}

// ================= RESIZE =================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================= ANIMATE =================
function animate() {
  requestAnimationFrame(animate);
  cinematicCamera();
  renderer.render(scene, camera);
}

animate();
