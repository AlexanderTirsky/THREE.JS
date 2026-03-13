import * as THREE from "three";
//сцена
const scene = new THREE.Scene();

// // Свет всю сцену освещает без теней
// const ambientLight = new THREE.AmbientLight("white", 0.5);
// scene.add(ambientLight);

// // свет типо солнца есть тени у объектов
// const dirLight = new THREE.DirectionalLight("white", 1);
// dirLight.position.set(5, 5, 5);
// scene.add(dirLight);

// свет поинт лайт типо лампочка
// const pointLight = new THREE.PointLight("white", 10, 100);
// pointLight.position.set(0.5, 1, 1);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// свет спот лайт типо фанарик направленый луч
const spotLight = new THREE.SpotLight("white", 1);
spotLight.position.set(1, 1, 1);
scene.add(spotLight);

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

// создание фигру разных
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);

scene.add(cube);

// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render(scene, camera);
}
animate();
