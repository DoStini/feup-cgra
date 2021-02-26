import {CGFobject} from '../../lib/CGF.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
}