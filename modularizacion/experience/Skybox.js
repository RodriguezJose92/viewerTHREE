import * as THREE       from 'three';
import {RGBELoader}     from 'three/addons/loaders/RGBELoader.js'

async function loadSkyBox( url, scene ){
    let skybox;

    try {
        skybox = await new RGBELoader().loadAsync(url);
    } catch (error) {
        console.log(error)
    }
    
    skybox.mapping= THREE.EquirectangularReflectionMapping;
    scene.environment = skybox;
    scene.background  = skybox;
    return skybox;
};

export default loadSkyBox;