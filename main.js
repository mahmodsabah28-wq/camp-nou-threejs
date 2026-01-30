import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

/* ================= SCENE ================= */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

/* ================= CAMERA ================= */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

// بداية سينمائية
camera.position.set(0, 800, 1200);
camera.lookAt(0, 0, 0);

/* ================= RENDERER ================= */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* ================= LIGHT ================= */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(500, 800, 300);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

/* ================= GROUND ================= */
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({
    color: 0x1e7f3b, // أخضر ملعب
    roughness: 0.9
  })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ================= TEST CUBE (للتأكد) ================= */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  new THREE.MeshStandardMaterial({ color: 0x4f83ff })
);
cube.position.y = 25;
cube.castShadow = true;
scene.add(cube);

/* ================= LOAD STADIUM (اختياري) ================= */
const loader = new GLTFLoader();
/*
loader.load(
  './models/camp_nou.gltf',
  (gltf) => {
    const stadium = gltf.scene;
    stadium.scale.set(15, 15, 15);
    stadium.position.set(0, 0, 0);
    stadium.traverse(obj => {
      if (obj.isMesh) obj.castShadow = true;
    });
    scene.add(stadium);
  },
  undefined,
  (e) => console.error(e)
);
*/

/* ================= CINEMATIC CAMERA ================= */
let t = 0;

function cinematicCamera() {
  t += 0.002;

  camera.position.x = Math.sin(t) * 600;
  camera.position.z = Math.cos(t) * 600;
  camera.position.y = 400 - t * 120;

  if (camera.position.y < 120) camera.position.y = 120;

  camera.lookAt(0, 50, 0);
}

/* ================= RESIZE ================= */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ================= LOOP ================= */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01; // حركة بسيطة
  cinematicCamera();

  renderer.render(scene, camera);
}

animate();
