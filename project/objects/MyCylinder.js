import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../shapes/MyQuad.js"
import { degreeToRad } from "../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../utils/matrix/MatrixGenerator.js";
import { Material } from "../utils/Material.js"

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyCylinder extends CGFobject {
    constructor(scene, slices, material) {
		super(scene);
        this.scene = scene;
        this.slices = slices;
        this.material = material;
        this.initBuffers();
	}

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angleInc = 2*Math.PI / this.slices;
        let angle = 0;
        let cosAngle;
        let sinAngle;

        for(let slice = 0; slice <= this.slices; slice++) {
            cosAngle = Math.cos(angle);
            sinAngle = Math.sin(angle);

            this.vertices.push(cosAngle, 0, sinAngle);
            this.normals.push(cosAngle, 0, sinAngle);
            this.texCoords.push((this.slices-slice)/this.slices,1);
            this.vertices.push(cosAngle, 1, sinAngle);
            this.normals.push(cosAngle, 0, sinAngle);
            this.texCoords.push((this.slices-slice)/this.slices,0);

            if(slice > 0) {
                this.indices.push(slice*2+1, slice*2-2, slice*2-1);
                this.indices.push(slice*2, slice*2-2, slice*2+1);
            }

            angle += angleInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateSlices(slices) {
        this.slices = slices;
        this.initBuffers();
    }

    display() {
        this.material.safeApply();
        super.display();
    }
}