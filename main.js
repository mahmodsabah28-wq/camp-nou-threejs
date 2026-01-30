console.log("JS WORKING");

// ========================
// Scene
// ========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ========================
// Camera (موبايل)
// ========================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

camera.position.set(0, 30, 60);

// ========================
// Renderer (خفيف)
// ========================
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,   // مهم للموبايل
  powerPreference: "low-power"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

// ========================
// Lights (خفيفة)
// ========================
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(50, 100, 50);
scene.add(dirLight);

// ========================
// Ground (اختبار)
// ========================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ========================
// Load Model
// ========================
const loader = new THREE.GLTFLoader();

loader.load(
  "./models/camp_nou.gltf",
  (gltf) => {
    const model = gltf.scene;

    model.scale.set(1, 1, 1); // مهم للموبايل
    model.position.set(0, 0, 0);

    scene.add(model);
    console.log("Model Loaded ✅");
  },
  (xhr) => {
    console.log("Loading:", (xhr.loaded / xhr.total) * 100 + "%");
  },
  (error) => {
    console.error("Model Error ❌", error);
  }
);

// ========================
// Resize
// ========================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================
// Animate
// ========================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
