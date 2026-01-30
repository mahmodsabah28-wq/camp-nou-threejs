// ================== IMPORTS ==================
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// ================== SCENE ==================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ================== CAMERA ==================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

// زاوية سينمائية جانبية
camera.position.set(220, 55, 0);
camera.lookAt(0, 0, 0);

// ================== RENDERER ==================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ================== LIGHTING ==================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(800, 1200, 500);
sun.castShadow = true;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
scene.add(sun);

// ================== GROUND ==================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(8000, 8000),
  new THREE.MeshStandardMaterial({ color: 0x0c5f30 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ================== LOAD STADIUM ==================
const loader = new GLTFLoader();
let stadium = null;

loader.load(
  "models/camp_nou.gltf", // ⚠️ بدون /
  (gltf) => {
    stadium = gltf.scene;

    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);

    stadium.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    scene.add(stadium);

    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "none";
  },
  undefined,
  (error) => {
    console.error("GLTF error:", error);
  }
);

// ================== RESIZE ==================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================== ANIMATION LOOP ==================
function animate() {
  requestAnimationFrame(animate);

  // دوران سينمائي خفيف حول الملعب
  if (stadium) {
    camera.position.x = Math.cos(Date.now() * 0.00015) * 220;
    camera.position.z = Math.sin(Date.now() * 0.00015) * 220;
    camera.lookAt(0, 20, 0);
  }

  renderer.render(scene, camera);
}

animate();
