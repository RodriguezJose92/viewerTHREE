import {CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js';

const   HTMLRenderer = new CSS3DRenderer();
        HTMLRenderer.setSize(innerWidth,innerHeight);
        HTMLRenderer.domElement.className='overlayMudiHTML'
        HTMLRenderer.domElement.id='containerMudiHTML';

export default HTMLRenderer;