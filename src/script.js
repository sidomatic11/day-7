import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//SECTION - Scene Setup

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	// camera.aspect = sizes.width / sizes.height;
	const aspectRatio = sizes.width / sizes.height;
	camera.left = -fov * aspectRatio;
	camera.right = fov * aspectRatio;
	camera.top = fov;
	camera.bottom = -fov;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		console.log("go full");
		renderer.domElement.requestFullscreen();
	} else {
		console.log("leave full");
		document.exitFullscreen();
	}
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-5, 10, 5);
scene.add(directionalLight);

// Camera

const aspectRatio = sizes.width / sizes.height;
const fov = 6;
const camera = new THREE.OrthographicCamera(
	-fov * aspectRatio,
	fov * aspectRatio,
	fov,
	-fov,
	0.1,
	100
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//SECTION - Objects
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

let cubes = [];
for (let i = 0; i < 11; i++) {
	for (let j = 0; j < 11; j++) {
		const geometry = new THREE.BoxGeometry(1, Math.random() * 1 + 1, 1);
		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({
			color: `hsl(${Math.random() * 100 + 60}, 100%, 80%)`,
			wireframe: false,
		});
		const cube = new THREE.Mesh(geometry, material);
		cube.position.x = i - 5;
		cube.position.y = 0;
		cube.position.z = j - 5;
		cube.userData.random = Math.random();
		cubes.push(cube);
		scene.add(cube);
	}
}

//SECTION - Animate
const clock = new THREE.Clock();

const tick = (t) => {
	const elapsedTime = clock.getElapsedTime();

	// cube.scale.y = Math.sin(elapsedTime);
	cubes.forEach((cube) => {
		cube.scale.y = Math.sin(elapsedTime * cube.userData.random);
	});

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
