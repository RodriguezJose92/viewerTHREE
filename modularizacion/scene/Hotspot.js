import * as THREE from 'three'
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';

class Hotspot{

    constructor(){
        this.type               = null;
        this.idHotSpot          = null;
        this.position           = null;
        this.color              = null;
        this.hoverColor         = null;
        this.groupeName         = null;

        this.urlIFrameTexture   = null;
        this.hotSpotgroupes     = [];
    };

    /** Hacemos la verificación del Tipo de HotSpot (Podemmos agregar más a futuro.) */
    verifyAndCreate({type,idHotSpot,position,color,hoverColor,groupName},scene){

        this.type               = type;
        this.idHotSpot          = idHotSpot;
        this.position           = position;
        this.color              = color;
        this.hoverColor         = hoverColor;
        this.groupName          = groupName || 'defaultMudi';

        switch (this.type){
            case 'text':
                this.urlIFrameTexture = `../../caja.jpg`;
                break;
            case 'img':
                this.urlIFrameTexture = `La ruta que renderiza el iframe que Juan HIZO`;
                break;
            case 'iframe':
                this.urlIFrameTexture = `La ruta que renderiza el iframe que Juan HIZO`;
                break;
            default : // Hacemo un llamado a los errores de Mudi
        }

        this.buildHotspot2(scene);
    };

    /** Hacemos el hotSpot con la textura del iframe que se armo anteriormente */
    buildHotspot(scene){

        /** Construcción de la textura como IFRAME */
        const   div = document.createElement('DIV');
                div.id=this.idHotSpot;
                div.classList.add('containerHotspotMudi');
                div.setAttribute('list', this.groupName);
                div.setAttribute('scene','show');

                const   hotSpot = document.createElement('DIV');
                        hotSpot.classList.add(`hotspotMudi`);
                        hotSpot.id=`hotSpot${this.idHotSpot}`;

        div.appendChild(hotSpot);

        /** Conversión a Objecto 3D y se define la posición */
        const   object3DHTML = new CSS3DObject(div);
                object3DHTML.userData = {   /** Aquí falta rellena los parámetros para que quede bien lindo */
                                            mudiAniamtion : '',
                                            TWEENCameraPositionFinal: '',
                                            mudiId: this.idHotSpot,
                                            hotSpotGroup: this.groupName
                                        };
                object3DHTML.scale.set(0.00268,0.00268,0.00268)
                !this.position 
                    ? object3DHTML.position.set(0,0,0)
                    : object3DHTML.position.set(this.position.x,this.position.y,this.position.z);
        
        
        this.pushHotspotGroup(object3DHTML)
        scene.add(object3DHTML)
    };


    async buildHotspot2(scene){ 

        let texture;
        try { texture = await new THREE.TextureLoader().loadAsync(this.urlIFrameTexture)} 
        catch (error) { console.log(error)};

        const geo = new THREE.CircleGeometry(.5,100)
        const mat = new THREE.MeshBasicMaterial({
                        map:texture,
                        color:0xffff00
                    })

        const   hotSpot = new THREE.Mesh(geo,mat)
                hotSpot.position.set(this.position.x,this.position.y,this.position.z);
                hotSpot.scale.set(.1,.1,.1);

        this.pushHotspotGroup(hotSpot)
        scene.add(hotSpot);
    };

    /** Anadismos nuevos grupos para segmentación de comportamientos futuros */
    pushHotspotGroup(newHotspot){

        this.hotSpotgroupes.push(newHotspot)
        console.log(this.hotSpotgroupes)
    };

    lookAtCamera(camera){
        this.hotSpotgroupes.map(hotspot=>{
            hotspot.lookAt(camera.position)
        })
    }


    /** Funcionalidad que no he explorado :S  */
    removeHotSpot(hotSpot3D){

    };

};

const buildHotspot = new Hotspot();
export default buildHotspot;