import * as THREE  from 'three';

const   GLTFRenderer = new THREE.WebGLRenderer({antialias:true})
        GLTFRenderer.setPixelRatio(window.devicePixelRatio);
        GLTFRenderer.setSize(innerWidth,innerHeight);
        GLTFRenderer.domElement.id='containerCanvasMudi';
        GLTFRenderer.domElement.className='MudiViewerPro'

export default GLTFRenderer;