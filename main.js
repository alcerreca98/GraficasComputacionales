var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
document.body.appendChild(renderer.domElement);

var mixer;
var clock = new THREE.Clock();

window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

/**
 * MOON
 * Moon image from: https://github.com/CoryG89/MoonDemo
 */ 
var geometry   = new THREE.SphereGeometry(10, 32, 32)
var material  = new THREE.MeshPhongMaterial()
material.map    = THREE.ImageUtils.loadTexture('moon.jpg')
var moonMesh = new THREE.Mesh(geometry, material)
scene.add(moonMesh)

/**
 * SPACE
 * Space Image from: https://images.app.goo.gl/svUg8GqiRxfhDa1H6
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
const light1 = new THREE.AmbientLight(0xffffff);
scene.add(light1);

const light = new THREE.DirectionalLight(0x404040, 2 * Math.PI);
light.position.set(0.5, 0, 0.866);
light.castShadow = true;
scene.add(light);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

/**
 * LOADER
 * Model reference: https://github.com/YuneVK/slides-threejs
 */
var loader = new THREE.GLTFLoader();
        loader.crossOrigin = true;
        loader.load("models/astronaut/source/scene.gltf", function(data) {
          var object = data.scene;
          object.position.set(-10, 10, 0);
          object.scale.set(2, 2, 2);
          object.rotation.set(0, -0.3, 0);

          mixer = new THREE.AnimationMixer(data.scene);

          mixer.clipAction(data.animations[2]).play();

          scene.add(object);
        });

/**
 * SETUP
 */
controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 30;
window.scene = scene;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;

renderer.physicallyCorrectLights = true;
renderer.gammaFactor = 2.2;

var render = function(){
    renderer.clear();
    moonMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
};

var GameLoop = function(){
    requestAnimationFrame(GameLoop);
        var delta = clock.getDelta();

        if (mixer) {
          mixer.update(delta);
        }
        controls.update();
        renderer.render(scene, camera);
    render();
};

GameLoop();
