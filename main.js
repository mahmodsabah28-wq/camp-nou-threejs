document.body.style.background = "red";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

// بداية سينمائية
camera.position.set(0, 600, 1200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// إضاءة
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(500, 800, 300);
scene.add(sun);

// أرضية
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// تحميل الملعب
const loader = new GLTFLoader();
loader.load(
  "./models/camp_nou.gltf",
  (gltf) => {
    const stadium = gltf.scene;
    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);
    scene.add(stadium);
  },
  undefined,
  (e) => console.error(e)
);

// حركة سينمائية
let t = 0;
function cinematicCamera() {
  t += 0.002;
  camera.position.x = Math.sin(t) * 600;
  camera.position.z = Math.cos(t) * 600;
  camera.position.y = 400 - t * 150;
  camera.lookAt(0, 50, 0);
}

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  cinematicCamera();
  renderer.render(scene, camera);
}
animate();
