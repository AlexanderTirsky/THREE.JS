import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
  100,
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
const material = new THREE.MeshStandardMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

const sphera = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial({ color: "green" }),
);
sphera.position.x = 2;
scene.add(sphera);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    intersects[0].object.material.color.set("blue");
    alert("Clicked on item");
  }
}

window.addEventListener("click", onMouseClick);

// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.1;
  //   cube.rotation.y += 0.1;

  contrls.update();
  renderer.render(scene, camera);
}
animate();
