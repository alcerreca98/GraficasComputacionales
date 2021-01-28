var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

/**
 * MOON
 */
var geometry   = new THREE.SphereGeometry(10, 32, 32)
var material  = new THREE.MeshPhongMaterial()
material.map    = THREE.ImageUtils.loadTexture('moon.jpg')
var moonMesh = new THREE.Mesh(geometry, material)
scene.add(moonMesh)

/**
 * SPACE
 */ 
const spaceGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
var spaceMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('space.png'), side: THREE.DoubleSide}),
];
var spaceMaterial = new THREE.MeshFaceMaterial(spaceMaterials);
var space = new THREE.Mesh(spaceGeometry, spaceMaterial);
space.castShadow = true; //default is false
space.receiveShadow = false; //default
scene.add(space);

/**
 * LIGHTS & SHADOWS
 */
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white ambientLight
scene.add( ambientLight );

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
 
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

/**
 * SETUP
 */
controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 30;

var render = function(){
    renderer.render(scene, camera);
};

var GameLoop = function(){
    requestAnimationFrame(GameLoop);
    render();
};

GameLoop();