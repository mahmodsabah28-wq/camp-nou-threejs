// ================= IMPORTS =================
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// ================= SCENE =================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ================= CAMERA =================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

// بداية سينمائية (من الأعلى)
camera.position.set(0, 800, 1200);
camera.lookAt(0, 0, 0);

// ================= RENDERER =================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ================= LIGHTING =================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(500, 800, 300);
scene.add(sunLight);

// ================= GROUND =================
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshStandardMaterial({ color: 0x2e7d32 }) // أخضر (عشب مبدئي)
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// ================= LOADING TEXT =================
const loadingEl = document.getElementById("loading");
if (loadingEl) {
  loadingEl.style.display = "none";
}

// ================= CINEMATIC CAMERA =================
let progress = 0;

function cinematicCamera() {
  progress += 0.002;

  if (progress < 1) {
    // دوران سينمائي خارجي
    camera.position.x = Math.sin(progress * Math.PI * 2) * 900;
    camera.position.z = Math.cos(progress * Math.PI * 2) * 900;
    camera.position.y = 900 - progress * 500;
    camera.lookAt(0, 0, 0);
  } else {
    // اقتراب من داخل الملعب (وهمي حالياً)
    camera.position.lerp(
      new THREE.Vector3(220, 55, 0),
      0.02
    );
    camera.lookAt(0, 0, 0);
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
