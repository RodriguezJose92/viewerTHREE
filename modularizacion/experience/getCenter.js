import * as THREE from 'three';

/** Obtenemos el centro del objeto y configuramos 
 *      donde va a mirar la cámara siempre 
 *      la posición incial de la orbita
 * 
 *      y seteamos la posición central por último en el atributo userData 
 *          ( que asumo que THREE lo puso para uno )
 *      
 */

function getCenterObj3D(model3D,camera,controls){
    const 
    box             = new THREE.Box3().setFromObject(model3D),
    center          = box.getCenter(new THREE.Vector3());

    camera.position.set(center.x,center.y,center.z+1.8);
    camera.lookAt(center);
    controls.target.copy(center);
    model3D.userData = {
        centerPositioMudi:center
    };
}

export default getCenterObj3D;