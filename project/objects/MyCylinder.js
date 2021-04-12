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
    constructor(scene, slices) {
		super(scene);
        this.scene = scene;
        this.slices = slices;
        this.initBuffers()
	}

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angleInc = 2*Math.PI / this.slices;
        let angle = 0;
        let cosAngle;

        for(let slice = 0; slice <= this.slices; slice++) {
            cosAngle = Math.cos(angle);
            sinAngle = Math.sin(angle);

            this.vertices.push(cosAngle, 0, sinAngle);
            this.vertices.push(cosAngle, 1, sinAngle);

            if(slice > 0) {
                this.indices.push()
            }

            angle += angleInc;
        }
    }

    // Sets default if tex undefined
    safeApply(tex) {
        if (!tex) {
            if (this.scene.defaultMaterial) this.scene.defaultMaterial.apply();
        } else {
            tex.getMaterial().apply();
        }

        if (!this.scene.linearRender)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    }

    display() {

    }
}