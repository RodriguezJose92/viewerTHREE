import * as THREE from 'three';
import {OrbitControls}  from 'three/addons/controls/OrbitControls.js';

import _camera          from './experience/Camera.js';
import _scene           from './experience/Scene.js';
import GLTFRenderer     from './experience/RendererWebGL.js';
import HTMLRenderer     from './experience/RendererCSS3D.js';
import loopMachine      from './motor/LoopMachine.js';
import myRaycaster      from './raycaster/Raycaster.js';

import loadSkyBox       from './experience/Skybox.js';
import myModel3D        from './scene/Object3D.js';
import getCenterObj3D   from './experience/getCenter.js';

import buildHotspot     from './scene/Hotspot.js';

/** Variables &  contantes globales */
let model3D, skybox ;
const cameraControls = new OrbitControls(_camera,HTMLRenderer.domElement)

/** Métodos renderizadores */
const 
renderGLTF = () => GLTFRenderer.render(_scene,_camera),
renderHTML = () => HTMLRenderer.render(_scene,_camera);

/** Agregamos los renderizados a Pantalla */
document.body.appendChild(GLTFRenderer.domElement);
document.body.appendChild(HTMLRenderer.domElement);

/** Agregamos el SkyBox Y un módelo 3D  a escena */
skybox      = await loadSkyBox('../mudi.hdr' , _scene);
model3D     = await myModel3D.loadModel(_scene);

/** Seteamos los valores de la cámara y los controles de orbita con el centro del objeto 3D */
getCenterObj3D(model3D.scene,_camera,cameraControls);

let info = {
    type: "text", 
    idHotSpot: 1, 
    position: {x: 0, y: .5, z: .5}, 
    color: "blue", 
    hoverColor: "lightblue", 
    groupName: "Group A"
}

buildHotspot.verifyAndCreate(info,_scene);
let update = () => buildHotspot.lookAtCamera(_camera)

/** Iniciamos el ciclo de animación */
loopMachine.on();
loopMachine.addNewCallback(update)
loopMachine.addNewCallback(renderGLTF);
loopMachine.addNewCallback(renderHTML);




/** Añadimos listener de redimensionamiento tanto para el renderer de GLTF como HTML */
window.addEventListener('resize',()=>{
    _camera.aspect = window.innerWidth/window.innerHeight; 
    _camera.updateProjectionMatrix();
    GLTFRenderer.setSize(window.innerWidth,window.innerHeight);
    HTMLRenderer.setSize(window.innerWidth,window.innerHeight)
});

/** Añadimos el evento de shootRaycaster cade vez que hagamos click*/
document.getElementById('containerMudiHTML').addEventListener('click', (e)=>{
    myRaycaster.shootRay(e,_camera,_scene)
}, false )