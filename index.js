import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//сцена
const scene = new THREE.Scene();

// Свет всю сцену освещает без теней
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

// свет типо солнца есть тени у объектов
const dirLight = new THREE.DirectionalLight("white", 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

//камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;
//рендер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//управление камерой

const contrls = new OrbitControls(camera, renderer.domElement);
contrls.enableDamping = true;
contrls.dampingFactor = 0.05;
contrls.screenSpacePanning = false;
contrls.minDistance = 2;
contrls.maxDistance = 10;

// создание фигру разных
const geometry = new THREE.BoxGeometry();
const originMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const highLightMaterial = new THREE.MeshStandardMaterial({
  color: "yellow",
  emissive: "white",
  emissiveIntensity: 0.5,
});

const cube = new THREE.Mesh(geometry, originMaterial);
cube.position.set(0, 0, 0);
// scene.add(cube);

const sphera = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial({ color: "green" }),
);
sphera.position.x = 2;
//scene.add(sphera);

// Загрузка моделек

const loader = new GLTFLoader();

loader.load(
  "models/dodge_challenger/scene.gltf",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.001, 0.001, 0.001);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error("Error:" + error);
  },
);

// GSAP анимация

// gsap.to(cube.position, {
//   y: 2,
//   x: 1,
//   duration: 1,
//   ease: "power1.inOut",
//   repeat: -1,
//   yoyo: true,
// });

// gsap end

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove);

let isHovered = false;

// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);

  const intersect = raycaster.intersectObject(cube);

  if (intersect.length > 0 && !isHovered) {
    cube.material = highLightMaterial;
    isHovered = true;
    gsap.to(cube.scale, { x: 1.5, y: 1.5, duration: 1.5, ease: "power1.out" });
  } else if (intersect.length == 0 && isHovered) {
    cube.material = originMaterial;
    isHovered = false;
    gsap.to(cube.scale, { x: 1, y: 1, duration: 1.5, ease: "power1.out" });
  }

  contrls.update();
  renderer.setClearColor("lightblue");
  renderer.render(scene, camera);
}
animate();
