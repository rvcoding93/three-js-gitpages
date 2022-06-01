import './style.css'
// import './textAnimation'

import * as THREE from 'three';
import { AmbientLight } from 'three.js';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' // allows us to move around the scene using just the mouse 

const scene = new THREE.Scene();
//scene = container
// perspective camera mimicks how the human eye works

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// First Passthrough: Field of view 75||  Field of view - the amount of the world visible based on 360 degrees ||
// Second Passthrough: Aspect Ratio, based off users browser window (this is how to make a responsive site) inner width divided by inner height (easy formula"window.innerWidth / window.innerHeight")
// Third Passthrough: View Frustrum || controls which objects are visible relative to the camera distance. .01 to 1000 allows you to see pretty much everything.


const renderer = new THREE.WebGLRenderer({
//renders the graphics to the scene, requires DOM element (in this case the Canvas with the background tag 'BG')
 canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio (window.devicePixelRatio); //sets pixel ratio to whatever device is being used to view the page
renderer.setSize(window.innerWidth, window.innerHeight); // creates full screen canvas setting render size to window size
camera.position.setZ(30); // moves camera along Z axis


renderer.render(scene, camera); 
// renderer.setClearColor(0xeef34); - changes background color using Hex




const geometry = new THREE.TorusGeometry (10,3,16,100) // built in shapes with three.js, set paramaters to change shape
const material = new THREE.MeshNormalMaterial({color: 0xFF47, }); 
// like wrapping paper for geometry shapes, images can be used as well for 'texture'
// ** some  materials (ex. THREE.MeshStandardMaterial)require a light source to bounce off of them for adequate visibility 
// ** Wireframe allows you to see the internals, like a house with no drywall
const torus = new THREE.Mesh(geometry, material); // MESH puts the geometry + material together to produce your object

// scene.add(torus)



//lighting for scene
const pointLight = new THREE.PointLight(0xffffff) // PointLight illuminates light in all directions like a lightbulb
pointLight.position.set(25,25,25) // places light in the center using x,y,z axis

const ambientLight = new THREE.AmbientLight(0xffffff) // illuminates entire scene equally
scene.add(pointLight, ambientLight) // adds the light source to the scene

// const lightHelper = new THREE.PointLightHelper(pointLight) // adds a wireframe camera object to visualize where the light source is
// const gridHelper = new THREE.GridHelper(200, 50); // draws 2d GRID to scene to help with perspective and placement of objects 
// scene.add(lightHelper, gridHelper)


//scroll reaction
const controls = new OrbitControls(camera, renderer.domElement); // the app will listen to DOM events with the mouse, and move the camera accordingly





//randomized star function
function addStar() { // a function to add random stars to scene

const geometry = new THREE.SphereGeometry(0.5, 24, 24);
const material = new THREE.MeshStandardMaterial({color:0xffffff})
const star = new THREE.Mesh(geometry, material);

const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 350 ) ); //this controls how spread out the stars will be in respect to the canvas size, smaller the number the more condensed the spread
star.position.set(x, y, z);
scene.add(star)
 }
 Array(5000).fill().forEach(addStar)  // pass through is the # of stars on the canvas





//  function addTorus() { // a function to add random stars to scene

//   const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
//   const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//   const torusKnot = new THREE.Mesh( geometry, material );
  
  
//   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 40 ) ); //this controls how spread out the stars will be in respect to the canvas size, smaller the number the more condensed the spread
//   star.position.set(x, y, z);
//   scene.add( torusKnot );
//    }
  
//    Array(100).fill().forEach(addTorus)




//background image--
const spaceTexture = new THREE.TextureLoader().load('theWatcher.jpeg')
scene.background = spaceTexture




//Box with photo
const meTexture = new THREE.TextureLoader().load('me.jpeg')
const meBox     = new THREE.Mesh (
  new THREE.BoxGeometry(9,9,9),
  new THREE.MeshStandardMaterial({map: meTexture})
);
scene.add(meBox)

// Earth Geometry
const earthTexture = new THREE.TextureLoader().load('ego.png') // Earth texture on the sphere 
const normalTexture = new THREE.TextureLoader().load('normal.jpeg') // produces TEXTURE for the ambient light to create shadows and depth with

const Earth = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);
scene.add(Earth)
//=====================================================================



const Fractal = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 16.939, 1.8117, 69, 7,  16, 4),
  new THREE.MeshNormalMaterial({color: 0xFF47, } ) 
);
scene.add(Fractal)




Earth.position.z = 30;
Earth.position.setX(-10)


function cameraScroll () {

const t = document.body.getBoundingClientRect().top;

Earth.rotation.x += 0.05;
Earth.rotation.y += 0.075;
Earth.rotation.z += 0.05;

meBox.rotation.y += 0.05;
meBox.rotation.z += 0.05;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.rotation.y = t * -0.0002;

}


document.body.onscroll = cameraScroll // calls cameraScroll function to responsively scroll display with mouse
cameraScroll()

function animate() {  //render.render(scene, camera) must be called again, it is easier to set up a recursive function with an infinite loop to complete this task
  requestAnimationFrame(animate); // continuously updating UI
  
  meBox.rotation.x += 0.01;
  meBox.rotation.y += 0.005;
  meBox.rotation.z += 0.01;
  
  // Fractal.rotation.x += 0.01;
  Fractal.rotation.y += 0.005;
  Fractal.rotation.z += 0.01;

  Earth.rotation.y += 0.005;

  controls.update();
  
  renderer.render (scene, camera);
}  // also known as a GAME LOOP in gamaing development to keep the enviroment updating with new materials




animate() 




