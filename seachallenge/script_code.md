//JAVASCRIPT
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { Sky } from 'three/addons/objects/Sky.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as YUKA from 'yuka'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {}

// Colors

debugObject.depthColor = '#2998af'
debugObject.surfaceColor = '#68c8c7'
gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//axes helper
/* const axesHelper = new THREE.AxesHelper()
axesHelper.position.y +=5.25
scene.add (axesHelper) */
/* 

 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(40, 40, 512, 512)
waterGeometry.deleteAttribute('normal')
waterGeometry.deleteAttribute('uv')




//textures
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load('./images/seafloor/alpha.jpg')
const floorColorTexture = textureLoader.load('./images/seafloor/color.png')
floorColorTexture.colorSpace = THREE.LinearSRGBColorSpace
const floorDisplacementTexture = textureLoader.load('./images/seafloor/DisplacementMap.png')
const floorNormalTexture = textureLoader.load('./images/seafloor/terrain_normal_tangent.png')



floorColorTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping



// Material
const waterMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uTime: { value: 0 },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(.3, .4) },
        uBigWavesSpeed: { value: 0.2 },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.9 },
        uColorMultiplier: { value: 1 },
        transparent: true,
        uSmallWavesElevation: { value: 0.3 },
        uSmallWavesFrequency: { value: 0.3 },
        uSmallWavesSpeed: { value: 0.08 },
        uSmallIterations: { value: 4 },

    }
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
water.position.y = 5

scene.add(water)

/**
 * debug
 */

gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#edb533', 0.275)
const directionalLight = new THREE.DirectionalLight('#73ab79', 5)
scene.add(ambientLight, directionalLight)

class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}
gui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
gui.add(ambientLight, 'intensity', 0, 2, 0.01).name('al_intensity');
gui.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('color');
gui.add(directionalLight, 'intensity', 0, 2, 0.01).name('dl_intensity');
gui.add(directionalLight.target.position, 'x', -10, 10);
gui.add(directionalLight.target.position, 'z', -10, 10);
gui.add(directionalLight.target.position, 'y', 0, 10);
// Hemisphere light
/* const hemisphereLight = new THREE.HemisphereLight('#fffffd', '#81b9cb', 0.9)
scene.add(hemisphereLight) 
 */



/**
 * SeaFloor
 */

//Geometry
const floorGeometry = new THREE.PlaneGeometry(40, 40, 180, 90)


//Material

const seafloorMaterial = new THREE.MeshToonMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    normalMap: floorNormalTexture,
    normalMapType: 1,
    normalScale: 2,
    displacementMap: floorDisplacementTexture,
    displacementScale: 1.5,
    displacementBias: -1,
})


const seaFloor = new THREE.Mesh(floorGeometry, seafloorMaterial)
seaFloor.rotation.x = - Math.PI * 0.5
scene.add(seaFloor)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 57)
camera.position.set(2,3, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.maxDistance = 20;
controls.enableDamping = true


/**
 * Loaders
 */
/* 
//const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
// HDR (RGBE) equirectangular

rgbeLoader.load('/environmentMaps/blender.hdr', (environmentMap) =>
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
        scene.background = environmentMap
        scene.environment = environmentMap
    })
 */
/**
 * Models
 */

const gltfLoader = new GLTFLoader()
/* const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' });
dracoLoader.setDecoderPath('../draco/gltf/');
gltfLoader.setDRACOLoader(dracoLoader)

 */



/**
 * Materials
 */
// Baked material

const bakedTexture = textureLoader.load('./model/images/alg_diffuse1.png')
const bakedMaterial = new THREE.MeshToonMaterial({ map: bakedTexture })
bakedTexture.flipY = false
//bakedTexture.colorSpace = THREE.SRGBColorSpace

gltfLoader.load(
    './model/low3.glb',
    (gltf) => {
        console.log(gltf)
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })
        const children = [...gltf.scene.children]

        for (const child of children) {
            scene.add(child)

        }
    },
    function (progress) {
        console.log((progress.loaded / progress.total * 100) + '% loaded of rocks');
    },
    (error) => {
        console.log(error)
    }
)

gltfLoader.load(
    './model/plants/kelpplants.glb',
    (gltf) => {
        console.log('success')
        //  console.log(gltf)
        gltf.scene.position.y = -0.3
        scene.add(gltf.scene)
    },
    (progress) => {
        console.log('progress kelp')
        //  console.log(progress)
    },
    (error) => {
        console.log('error')
        console.log(error)
    }
)




//fish
//const entity = new YUKA.GameEntity()

const entityManager = new YUKA.EntityManager();

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}


const loader = new GLTFLoader();
const mixers = [];

loader.load('./model/fish/fish5.glb', function (glb) {
    const model = glb.scene;
    const clips = glb.animations;

    for (let i = 0; i < 50; i++) {
        const fishClone = SkeletonUtils.clone(model);

        fishClone.rotation.y -= Math.PI * 0.5
        fishClone.matrixAutoUpdate = false;
        scene.add(fishClone);

        const vehicle = new YUKA.Vehicle();
        vehicle.setRenderComponent(fishClone, sync);

        const wanderBehavior = new YUKA.WanderBehavior();
        vehicle.steering.add(wanderBehavior);

        entityManager.add(vehicle);

        vehicle.position.z = 2.5 - Math.random() * 5;
        vehicle.position.y = 0.5 + Math.random() * 3;
        vehicle.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0)

        const mixer = new THREE.AnimationMixer(fishClone);
        const clip = THREE.AnimationClip.findByName(clips, 'fish_001_animate_preview');
        const action = mixer.clipAction(clip);
        action.loop = THREE.LoopRepeat;
        action.play();
        mixers.push(mixer)
    }
},
    (progress) => {
        console.log((progress.loaded / progress.total * 100) + '% loaded of fish');
    },
    (error) => {
        console.log(error)
    }
);


loader.load('./model/fish/paracanthurus.glb', function (gltf) {
    const model = gltf.scene;
    const clips = gltf.animations;

    for (let i = 0; i < 50; i++) {
        const two = SkeletonUtils.clone(model);

        two.rotation.y -= Math.PI * 0.5
        two.matrixAutoUpdate = false;
        scene.add(two);

        const vehicle2 = new YUKA.Vehicle();
        vehicle2.setRenderComponent(two, sync);

        const wanderBehavior = new YUKA.WanderBehavior();
        vehicle2.steering.add(wanderBehavior);

        entityManager.add(vehicle2);

        vehicle2.position.z = 2.5 - Math.random() * 5;
        vehicle2.position.y = 0.5 + Math.random() * 3;
        vehicle2.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0)

        const mixer = new THREE.AnimationMixer(two);
        mixer.clipAction(gltf.animations[0])
        //const clip = THREE.AnimationClip.findByName(clips, 'fish_001_animate_preview');
       // const action = mixer.clipAction(clip);
        //mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
    
        action.play();
        mixers.push(mixer)
    }
},
    (progress) => {
        console.log((progress.loaded / progress.total * 100) + '% loaded of fish');
    },
    (error) => {
        console.log(error)
    }
);

/* 
const loader = new GLTFLoader();
let mixer;

loader.load('./model/fish/fish5.glb', function (glb) {
    const model = glb.scene;
    const clips = glb.animations;
    mixer = new THREE.AnimationMixer(model);
    scene.add(model)
    const clip = THREE.AnimationClip.findByName(clips, 'fish_001_animate_preview');
    const action = mixer.clipAction(clip);
    action.loop = THREE.LoopRepeat;
    action.play();
    

    console.log(clip)

    for (let i = 0; i < 50; i++) {
        const fishClone = SkeletonUtils.clone(model);
        fishClone.rotation.y -=  Math.PI * 0.5
        fishClone.matrixAutoUpdate = false;
        scene.add(fishClone);
        //fishes.add(fishClone);

        const vehicle = new YUKA.Vehicle();
        vehicle.setRenderComponent(fishClone, sync);

        const wanderBehavior = new YUKA.WanderBehavior();
        vehicle.steering.add(wanderBehavior);

        entityManager.add(vehicle);

        vehicle.position.x = 2.5 - Math.random() * 5;
        vehicle.position.z = 2.5 - Math.random() * 5;
        vehicle.position.y = 0.5 +  Math.random() * 3 ;
       // vehicle.rotation.fromEuler(0, 0.5 * Math.PI * Math.random(), 0)

    }
    //scene.add(gltf.scene)
},
    (progress) => {
        console.log((progress.loaded / progress.total * 100) + '% loaded of fish');
    },
    (error) => {
        console.log(error)
    }
);

 */

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .8;


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//optional just color instead of sky
renderer.setClearColor('#30c5cd', .1);

const color = '#7fbaca';
const density = 0.08;
scene.fog = new THREE.FogExp2(color, density)

/**
 * Animate
 */
const clock = new THREE.Clock()
const time = new YUKA.Time();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Water
    waterMaterial.uniforms.uTime.value = elapsedTime

    // yuka animation
    const delta = time.update().getDelta();
    for (const mixer of mixers)
        mixer.update(delta)

    /*   if (mixer) {
          mixer.update(delta);
      } */

    entityManager.update(delta);
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()