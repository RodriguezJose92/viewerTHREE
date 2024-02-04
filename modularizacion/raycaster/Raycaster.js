import * as THREE   from 'three';

class Raycaster{
    constructor(){
        this.raycaster  = new THREE.Raycaster(),
        this.pointer    = new THREE.Vector2()
    }

    updatePointer(event){
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    /** Dispara el rayo */
    shootRay(event,camera,scene){
        this.updatePointer(event);
        
    };

    elementsIntersectsRaycaster(camera,scene){
        this.raycaster.setFromCamera(this.pointer,camera);
        const intersects = this.raycaster.intersectObjects(scene.children);
        console.log(intersects)
    };
}

const myRaycaster = new Raycaster()
export default myRaycaster