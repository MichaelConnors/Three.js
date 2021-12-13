import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/ window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xffffff});
const ring = new THREE.Mesh(geometry, material);

scene.add(ring);

const light = new THREE.PointLight(0xffffff, 1, 100,2);
light.position.set(0,-5,20);
scene.add(light);

const lightHelper = new THREE.PointLightHelper(light);
const gridHelper = new THREE.GridHelper(200,50);

//scene.add(gridHelper);

//scene.add(lightHelper);

camera.position.z = 30
camera.position.y = 20

camera.rotation.x = -.6

function addShapes(){

    let s = Math.round(Math.random());

    let geo;
    console.log(s)
    switch(s){
        case 0:
            geo = new THREE.TorusGeometry(5,.5,16,60);
            break;
        case 1:
            
            geo = new THREE.OctahedronGeometry(3,2);
            break;
    }

    const material = new THREE.MeshStandardMaterial({color: 0xffffff });

    const shape = new THREE.Mesh(geo, material);




    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
    const[x1,y1,z1] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(180));

    shape.position.set(x,y,z);
    shape.rotation.set(x1,y1,z1);
    scene.add(shape);
 
}

Array(100).fill().forEach(addShapes);

function setupKeyControls() {
    
    document.onkeydown = function(e) {
      switch (e.key) {
        case 'ArrowLeft':
        light.position.x -= 1;
        break;
        case 'ArrowUp':
        light.position.z -= 1;
        break;
        case 'ArrowRight':
        light.position.x += 1;
        break;
        case 'ArrowDown':
        light.position.z += 1;
        break;
        case ' ':
        light.position.y += 1;
        break;
        case 'Control':
        light.position.y -= 1;
        break;
      }
    };
  }

  function setupKeyLogger() {
    document.onkeydown = function(e) {
      console.log(e.key);
    }
  }

  setupKeyControls();
  //setupKeyLogger();

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  ring.rotation.x += .01;
  ring.rotation.y += .01;

  controls.update();
  
  light.position.set(camera.position.x-1, camera.position.y-1,camera.position.z-1)

 

}

animate();