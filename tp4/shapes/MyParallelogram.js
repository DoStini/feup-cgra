import {CGFobject} from '../../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, params) {
		super(scene);
		this.initBuffers(params);
	}
	
	initBuffers(params) {
		this.vertices = [
			0, 0, 0,
			1, 0, 0,
			1, 1, 0,
			2, 0, 0,
			2, 1, 0,
			3, 1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,
			2, 1, 3,
			3, 1, 2,
			4, 2, 3,
			3, 2, 4,
			5, 4, 3,
			3, 4, 5
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
		];

		this.texCoords = [...params.texCoords];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

