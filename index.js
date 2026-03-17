import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//сцена
const scene = new THREE.Scene();

//камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 5, 12);
camera.rotation.x = 6;

//рендер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Свет всю сцену освещает без теней
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

// свет типо солнца есть тени у объектов
const dirLight = new THREE.DirectionalLight("white", 1);
dirLight.castShadow = true;
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// создание фигуры

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 20),
  new THREE.MeshStandardMaterial({ color: "#333" }),
);
road.rotation.x = -Math.PI / 2;
scene.add(road);

// Загрузка моделек car
let car;

const loader = new GLTFLoader();

loader.load(
  "models/dodge_challenger/scene.gltf",
  (gltf) => {
    car = gltf.scene;
    car.scale.set(0.001, 0.001, 0.001);
    car.position.set(0, 0, 0);
    scene.add(car);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error("Error:" + error);
  },
);

// управление машинкой

let angle = 0;
let isMoving = false;
//при нажатии кнопки keydown
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") isMoving = true;
});
// при отжатие кнопки keyup
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") isMoving = false;
});

function moveCar() {
  if (!car || !isMoving) return;

  angle += 0.01;
  car.position.x = 5 * Math.cos(angle);
  car.position.z = 5 * Math.sin(angle);
  car.rotation.y = -angle;
}
// Точки для остановки машины

const infoPoints = [
  {
    position: new THREE.Vector3(5, 0, 0),
    message: "Обо мне я веб разработчик",
  },
  {
    position: new THREE.Vector3(-5, 0, 0),
    message: "Контакты: tirsky06@gmail.com",
  },
  {
    position: new THREE.Vector3(0, 0, 5),
    message: "Мой стек: HTML,CSS,Tailwind,JS,React,NextJS,ThreeJS",
  },
];

function checkInfoPoints() {
  infoPoints.forEach((point) => {
    const distance = car.position.distanceTo(point.position);
    if (distance < 0.5) showInfo(point.message);
  });
}

function showInfo(message) {
  const infoBox = document.getElementById("info-block");
  infoBox.innerText = message;
  infoBox.style.display = "block";
}

//сферы для точек

function createInfoSphera(position) {
  const sphera = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: "red" }),
  );
  sphera.position.copy(position);
  sphera.position.y = 2;
  scene.add(sphera);
}

infoPoints.forEach((point) => {
  createInfoSphera(point.position);
});

// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);
  moveCar();
  checkInfoPoints();

  renderer.setClearColor("lightblue");
  renderer.render(scene, camera);
}
animate();
