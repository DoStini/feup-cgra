import { CGFshader, CGFobject, CGFtexture } from '../../lib/CGF.js';
import {MyPlane} from './MyPlane.js';
import { degreeToRad } from '../utils/math/MathUtils.js';
import { rotateXMatrix, scaleMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../utils/Vector3.js';

/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param maxHeight - max height of the sand used in the shader.
*/
export class MySandFloor extends CGFobject {
	constructor(scene, nrDivs, maxHeight) {
		super(scene);
		this.scene = scene;
        this.nrDivs = nrDivs;
        this.maxHeight = maxHeight;
        this.init();
	}

    init() {
        this.plane = new MyPlane(this.scene, this.nrDivs);
        this.planeShader = new CGFshader(this.scene.gl, '/project/shaders/sand.vert', '/project/shaders/sand.frag');
        this.planeShader.setUniformsValues({uSandSampler: 1, maxHeight: this.maxHeight});
        this.sandTex = new CGFtexture(this.scene, '/project/textures/sand.png')
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.setActiveShader(this.planeShader);
        
        const scale = scaleMatrix(10, 10, 10);
        const rotatePlane = rotateXMatrix(degreeToRad(-90));

        this.scene.multMatrix(scale);
        this.scene.multMatrix(rotatePlane);

        let oldTex = this.scene.activeTexture;
        this.scene.activeTexture = this.sandTex;
        this.sandTex.bind(1);
        this.plane.display();

        this.scene.popMatrix();

        this.scene.activeTexture = oldTex;
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
