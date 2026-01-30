alert("JS WORKS");
// ================= IMPORTS =================
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// ================= SCENE =================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ================= CAMERA =================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

camera.position.set(0, 400, 800);
camera.lookAt(0, 0, 0);

// ================= RENDERER =================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ================= LIGHTS =================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(500, 1000, 500);
scene.add(sunLight);

// ================= GROUND =================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ================= LOAD MODEL =================
const loader = new GLTFLoader();

loader.load(
  "./models/camp_nou.gltf",
  (gltf) => {
    const stadium = gltf.scene;
    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);
    scene.add(stadium);
    console.log("Model loaded ✅");
  },
  undefined,
  (error) => {
    console.error("Model error ❌", error);
  }
);

// ================= CAMERA ANIMATION =================
let t = 0;

function cinematicCamera() {
  t += 0.003;
  camera.position.x = Math.sin(t) * 700;
  camera.position.z = Math.cos(t) * 700;
  camera.position.y = 350;
  camera.lookAt(0, 50, 0);
}

// ================= RESIZE =================
window.addEventListener("resize", () => {
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
