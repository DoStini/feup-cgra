import {CGFobject} from '../../lib/CGF.js';
/**
 * MyRectTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRectTriangle extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	
	initBuffers(texCoords) {
		this.vertices = [
            1, 0, 0,
            0, 0, 0,
            0, 1, 0,
            1, 0, 0,
            0, 0, 0,
            0, 1, 0,
		];

		this.indices = [
			0, 2, 1,
            3, 4, 5
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
            0,0,-1,
			0,0,-1,
			0,0,-1,
		]

		this.texCoords = texCoords || [];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {

	}
}

