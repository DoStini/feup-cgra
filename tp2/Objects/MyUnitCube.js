import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// Front face
            0, 2, 3,
			0, 3, 1,

            // Back face
            4, 7, 6,
			4, 5, 7,

            // Ceiling
            0, 1, 4,
            1, 5, 4,
            
            // Floor
            2, 6, 3,
            3, 6, 7,

            // X Positive side
            5, 1, 7,
            1, 3, 7,

            // Y Negative side
            2, 0, 6,
            6, 0, 4
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

