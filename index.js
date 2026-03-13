import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
//тектура обычная картинка
const texture = new THREE.TextureLoader().load("image/grass.jpeg");
const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });

// создание фигру разных
const geometry = new THREE.BoxGeometry();

//const material = new THREE.MeshBasicMaterial({ color: "red" });

const cube = new THREE.Mesh(geometry, textureMaterial);
cube.position.set(-4, 0, 0);

scene.add(cube);

const spheraGeometry = new THREE.SphereGeometry(0.5, 10, 10);

const spheraMaterial = new THREE.MeshPhongMaterial({
  color: "blue",
  emissive: "white",
  shininess: 100,
});

const sphera = new THREE.Mesh(spheraGeometry, spheraMaterial);
sphera.position.set(-1, 0, 0);

scene.add(sphera);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.2, 16, 100),
  new THREE.MeshBasicMaterial({ color: "green" }),
);
torus.position.set(1, 0, 0);
scene.add(torus);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), textureMaterial);
plane.position.set(-2, 2, 0);

scene.add(plane);

// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  sphera.rotation.x += 0.1;
  sphera.rotation.y += 0.1;

  torus.rotation.x += 0.1;
  torus.rotation.y += 0.1;

  renderer.render(scene, camera);
}
animate();
