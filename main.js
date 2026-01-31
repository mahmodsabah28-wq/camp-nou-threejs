import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('scene');

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 40);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(20, 50, 20);
scene.add(dirLight);

// loader
const loader = new GLTFLoader();
loader.load(
  './models/camp_nou.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('GLTF ERROR:', error);
  }
);

// resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
