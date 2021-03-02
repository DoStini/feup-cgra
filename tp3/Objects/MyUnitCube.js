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
			// Front Face
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,

			// Back face
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,

			// Ceiling
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			
			// Side XPOS
			0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			
			// Side XNEG
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,

			// Bottom
			-0.5, -0.5, 0.5, // 20
			-0.5, -0.5, -0.5, // 21
			0.5, -0.5, 0.5, // 22
			0.5, -0.5, -0.5, // 23

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
            8, 9, 10,
            9, 11, 10,

            // X Positive side
            14, 13, 12,
            13, 14, 15,

            // X Negative side
            17, 19, 18,
            16, 17, 18, 
			
            // Floor
            20, 21, 22,
            22, 21, 23,
		];

		this.normals = [
			// front face
			0, 0, 1, // 0
			0, 0, 1,     /// normals for the front face
			0, 0, 1,
			0, 0, 1, // 3

			// back face
			0, 0, -1, // 4
			0, 0, -1,	/// normals for the back face
			0, 0, -1,
			0, 0, -1, // 7

			// ceiling

			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			
			// XPOS face normals
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// XNEG face normals
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			
			// floor
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    updateBuffers(complexity){
    }
}

