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

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({ color: "red" });

const cube = new THREE.Mesh(geometry, material);
cube.position.set(-4, 0, 0);

scene.add(cube);

const spheraGeometry = new THREE.SphereGeometry();

const spheraMaterial = new THREE.MeshBasicMaterial({ color: "blue" });

const sphera = new THREE.Mesh(spheraGeometry, spheraMaterial);
sphera.position.set(-1, 0, 0);

scene.add(sphera);
// функция для постоянного рендеринга анимации
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  sphera.rotation.x += 0.1;
  sphera.rotation.y += 0.1;

  renderer.render(scene, camera);
}
animate();
