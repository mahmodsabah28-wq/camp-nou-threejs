// ================= IMPORTS =================
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
  10000
);

// بداية سينمائية عالية فوق برشلونة
camera.position.set(0, 1200, 1800);
camera.lookAt(0, 0, 0);

// ================= RENDERER =================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ================= LIGHTING =================
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(800, 1200, 500);
sun.castShadow = true;
scene.add(sun);

// ================= GROUND =================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(8000, 8000),
  new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ================= LOAD CAMP NOU =================
const loader = new GLTFLoader();
let stadium = null;

loader.load(
  './models/camp_nou.gltf',
  (gltf) => {
    stadium = gltf.scene;
    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);
    stadium.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    scene.add(stadium);

    document.getElementById("loading").style.display = "none";
  },
  undefined,
  (error) => {
    console.error("GLTF error:", error);
  }
);

// ================= CINEMATIC CAMERA =================
let progress = 0;

function cinematicCamera() {
  progress += 0.0015;

  if (progress < 1) {
    // دوران سينمائي خارجي
    camera.position.x = Math.sin(progress * Math.PI * 2) * 900;
    camera.position.z = Math.cos(progress * Math.PI * 2) * 900;
    camera.position.y = 900 - progress * 500;
    camera.lookAt(0, 100, 0);
  } else {
    // دخول داخل الملعب
    camera.position.lerp(
      new THREE.Vector3(220, 55, 0),
      0.02
    );
    camera.lookAt(0, 40, 0);
  }
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
