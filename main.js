var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

/**
 * SPACESHIP
 */
/*
var Models = {
    materials : {
        body : new THREE.MeshStandardMaterial( {color: 0xfefefe} ),
        painted : new THREE.MeshStandardMaterial( {color: 0x961b1b} ),
        metal : new THREE.MeshStandardMaterial( {color: 0x333333} ),
        glass : new THREE.MeshStandardMaterial( {color: 0x4286f4} ),
    },
        
    wing : function(){
        var wing = new THREE.Group(),
            parts = [];
        
        parts['theWing'] = new THREE.BoxGeometry( 10, 8, 1 );
        parts['theWing'].vertices[4].y -= 7; 
        parts['theWing'].vertices[5].y -= 7;     
        parts['theWing'].vertices[6].y -= 5; 
        parts['theWing'].vertices[7].y -= 5; 
        parts['theWing'].needsUpdate = true;

        parts['theWingMesh'] = new THREE.Mesh( parts['theWing'], this.materials.body );
        parts['theWingMesh'].position.y = -31;
        parts['theWingMesh'].position.x = -15.5;
        wing.add(parts['theWingMesh']);

        parts['theWingBottom'] = new THREE.BoxGeometry( 2, 9, 2 );
        parts['theWingBottom'].vertices[4].y -= 1; 
        parts['theWingBottom'].vertices[5].y -= 1;     
        parts['theWingBottom'].vertices[4].x -= .5; 
        parts['theWingBottom'].vertices[5].x -= .5;

        parts['theWingBottom'].vertices[6].y -= 1; 
        parts['theWingBottom'].vertices[7].y -= 1; 
        parts['theWingBottom'].vertices[6].x += .5; 
        parts['theWingBottom'].vertices[7].x += .5;
        parts['theWingBottom'].needsUpdate = true;

        parts['theWingBottomMesh'] = new THREE.Mesh( parts['theWingBottom'], this.materials.painted );
        parts['theWingBottomMesh'].position.y = -31;
        parts['theWingBottomMesh'].position.x = -10.5; 
        wing.add(parts['theWingBottomMesh']);
        
        return wing;
    },
        
    spaceShip : function(){
        var spaceShipModel = new THREE.Object3D();
    
        var parts = []; 
        
        parts['top1'] = new THREE.Mesh( new THREE.CylinderGeometry( 0, 6, 4, 6 ), this.materials.painted );
        spaceShipModel.add(parts['top1']);
        
        parts['top2'] = new THREE.Mesh( new THREE.CylinderGeometry( 6, 10, 10, 6 ), this.materials.painted );
        parts['top2'].position.y = -7;
        spaceShipModel.add(parts['top2']);

        parts['top3'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 11, 8, 6 ), this.materials.painted );
        parts['top3'].position.y = -16;
        spaceShipModel.add(parts['top3']);

        parts['body'] = new THREE.Mesh( new THREE.CylinderGeometry( 11, 12, 20, 6 ), this.materials.body );
        parts['body'].position.y = -30;
        spaceShipModel.add(parts['body']);

        parts['bottom'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 8, 2, 6 ), this.materials.metal );
        parts['bottom'].position.y = -41;
        spaceShipModel.add(parts['bottom']);

        parts['windowframe'] = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, .5, 8 ), this.materials.metal );
        parts['windowframe'].position.y = -28;
        parts['windowframe'].position.z = 0;
        parts['windowframe'].position.x = 10;
        parts['windowframe'].rotation.z = (Math.PI / 2) - (Math.PI / 360 * -5);
        spaceShipModel.add(parts['windowframe']);

        parts['windowglass'] = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, .5, 8 ), this.materials.glass );
        parts['windowglass'].position.y = -28;
        parts['windowglass'].position.z = 0;
        parts['windowglass'].position.x = 10.1;
        parts['windowglass'].rotation.z = (Math.PI / 2) - (Math.PI / 360 * -5);
        spaceShipModel.add(parts['windowglass']);
        
        parts['wing1'] = this.wing();
        parts['wing2'] = this.wing();
        parts['wing3'] = this.wing();
        spaceShipModel.add(parts['wing1']);
        
        spaceShipModel.add(parts['wing2']);
        parts['wing2'].rotation.y = (Math.PI / 180) * 120;
        spaceShipModel.add(parts['wing3']);
        parts['wing3'].rotation.y = (Math.PI / 180) * -120;
      
      return spaceShipModel;
    }
} 

var spaceShip = Models.spaceShip();
spaceShip.scale.set(1.3,1.3,1.3);
spaceShip.rotation.y = -2.7;
spaceShip.position.y = 20;
scene.add(spaceShip);
*/

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
    renderer.clear();
    moonMesh.rotation.y += 0.002;
    //spaceShip.rotation.y += .01;
    renderer.render(scene, camera);
};

var GameLoop = function(){
    requestAnimationFrame(GameLoop);
    render();
};

GameLoop();
