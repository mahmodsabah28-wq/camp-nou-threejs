import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// المشهد
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// الكاميرا
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(0, 150, 300);

// الريندر
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// تحكم
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// إضاءة (بدونها = شاشة سوداء)
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(200, 300, 200);
scene.add(dirLight);

// تحميل الملعب
const loader = new GLTFLoader();
loader.load(
  "./models/camp_nou.gltf",
  (gltf) => {
    const model = gltf.scene;

    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    scene.add(model);
    console.log("✅ Camp Nou loaded");
  },
  undefined,
  (error) => {
    console.error("❌ GLTF Error:", error);
  }
);

// تعديل الحجم
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// أنيميشن
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
