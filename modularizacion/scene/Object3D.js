import * as THREE               from 'three'
import {GLTFLoader}             from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader}            from 'three/addons/loaders/DRACOLoader.js';



const DRACO = new DRACOLoader();
DRACO.setDecoderPath('https://unpkg.com/three@v0.160.1/examples/jsm/libs/draco/gltf/');

class ModelMudi{
  constructor(){
    this.model3D          = null;
    this.animations       = null;
  };

  // Metodo para carga un Módelo GLB único con vista en el centro
  async loadModel(scene){
    const loader = new GLTFLoader();
    loader.setDRACOLoader(DRACO)

    /** Función asincróna para carga el modelo GLB */
      try { this.model3D = await loader.loadAsync(`https://clientes.mudi.com.co/whirpool_argentina/public_html/WRS955FWMS/android.glb`); } 
      catch (error) { 
        console.log(error)
      }
    /** Fin de función asincróna para carga el modelo GLB */

    this.model3D.animations.length > 0 && ( this.animations = this.model3D.animations )   
    scene.add(this.model3D.scene)
    return this.model3D;
      
  };


  /** Función Modificación de atributos (Experimental) */
  modifyAtributes(){
    this.model3D.scene.traverse((nodo)=>{
      if (nodo.isMesh){
        const material = nodo.material;

        // Modifica los parámetros del material según sea necesario
        material.color.set(0xff5a00); // Establece el color a rojo

        // Asegúrate de que el material refleje las últimas modificaciones
        material.needsUpdate = true;
      }
    })
  };

};

const myModel3D = new ModelMudi();

export default myModel3D;