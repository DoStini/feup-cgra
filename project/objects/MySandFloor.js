import { CGFshader, CGFobject, CGFtexture } from '../../lib/CGF.js';
import {MyPlane} from '../shapes/MyPlane.js';
import { degreeToRad } from '../utils/math/MathUtils.js';
import { rotateXMatrix, scaleMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';

/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param displacement - max height displacement of the sand used in the shader.
 * @param length - length of side.
*/
export class MySandFloor extends CGFobject {
	constructor(scene, nrDivs, displacement, maxHeight, length) {
		super(scene);
		this.scene = scene;
        this.nrDivs = nrDivs;
        this.displacement = displacement;
        this.length = length;
        this.maxHeight = maxHeight;
        this.blendMultiplier = 1.8;
        this.init();
	}

    init() {
        this.plane = new MyPlane(this.scene, this.nrDivs);
        this.sandTex = new CGFtexture(this.scene, 'textures/sand.png');
        this.sandBump = new CGFtexture(this.scene, 'textures/maps/sandMap.png');

        this.planeShader = new CGFshader(this.scene.gl, 'shaders/sand.vert', 'shaders/sand.frag');
        this.planeShader.setUniformsValues({uSandSampler: 1, uSandBumpSampler: 2, uDisplacement: this.displacement, uMaxHeight: this.maxHeight, uBlendMultiplier : this.blendMultiplier});
    }

    updateDivs(nrDivs) {
        this.nrDivs = nrDivs;
        this.plane = new MyPlane(this.scene, this.nrDivs);
    }

    updateHeight(displacement) {
        this.displacement = displacement;
        this.planeShader.setUniformsValues({uDisplacement: this.displacement});
    }

    updateMaxHeight(maxHeight) {
        this.maxHeight = maxHeight;
        this.planeShader.setUniformsValues({uMaxHeight: this.maxHeight});
    }

    updateBlend(blend) {
        this.blendMultiplier = blend;
        this.planeShader.setUniformsValues({uBlendMultiplier: this.blendMultiplier});
    }

    display() {
        let oldTex = this.scene.activeTexture;
        this.scene.activeTexture = this.sandTex;

        this.scene.pushMatrix();
        
        this.scene.setActiveShader(this.planeShader);
        
        const scale = scaleMatrix(this.length, 1, this.length);
        const rotatePlane = rotateXMatrix(degreeToRad(-90));

        this.scene.multMatrix(scale);
        this.scene.multMatrix(rotatePlane);

        this.sandBump.bind(2);
        this.sandTex.bind(1);
        
        this.plane.display();

        this.scene.popMatrix();

        this.scene.activeTexture = oldTex;
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
