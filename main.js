import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// كاميرا
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 60, 120);

// ريندر
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// إضاءة (بدونها الشاشة سوداء)
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(50, 100, 50);
scene.add(dirLight);

// أرضية مؤقتة (للتأكد أن المشهد يعمل)
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// تحميل الملعب
const loader = new GLTFLoader();
loader.load(
  "./models/camp_nou.gltf",
  (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error("GLTF ERROR:", error);
  }
);

// ريندر مستمر
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ضبط الحجم
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
