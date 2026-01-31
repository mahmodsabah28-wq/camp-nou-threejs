import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls;

init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(0, 120, 220);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 40, 0);
  controls.update();

  // Light
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(300, 400, 200);
  sun.castShadow = true;
  scene.add(sun);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // Stadium Loader
  const loader = new GLTFLoader();
  loader.load(
    "models/camp_nou.gltf",
    (gltf) => {
      const stadium = gltf.scene;
      stadium.scale.set(1, 1, 1);
      stadium.position.set(0, 0, 0);
      scene.add(stadium);
    },
    undefined,
    (error) => {
      console.error("Model loading error:", error);
    }
  );

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
