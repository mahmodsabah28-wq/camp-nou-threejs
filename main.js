// ===== Scene =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // سماء

// ===== Camera =====
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 30, 80);

// ===== Renderer =====
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ===== Lights =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(50, 100, 50);
scene.add(dirLight);

// ===== Ground =====
const groundGeo = new THREE.PlaneGeometry(500, 500);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ===== Load Model =====
const loader = new THREE.GLTFLoader();
loader.load(
  "models/camp_nou.gltf",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("Model load error:", error);
  }
);

// ===== Resize =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== Animate =====
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
