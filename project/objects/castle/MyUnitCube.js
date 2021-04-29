import { CGFobject } from "../../../lib/CGF.js";
import { MyQuad } from "../../shapes/MyQuad.js"
import { degreeToRad } from "../../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, rotateXMatrix } from "../../utils/matrix/MatrixGenerator.js";


/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyUnitCube extends CGFobject {
    constructor(scene, material) {
		super(scene);
        this.scene = scene;
        this.material = material;
        this.init()
	}

    init() {
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.botQuad = new MyQuad(this.scene);
    }

    // Sets default if tex undefined
    safeApply(tex) {
        if (!tex) {
            if (this.scene.defaultMaterial) this.scene.defaultMaterial.apply();
        } else if(tex.getMaterial().texture.texID != -1)  {
            tex.getMaterial().apply();

            if (!this.scene.linearRender)
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

    display() {
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            this.safeApply(this.material);
            this.frontQuad.display();

            tMatrix = translateMatrix(0,0,-1);
            let inv = mirrorYZ();

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(inv);
            this.safeApply(this.material);            
            this.backQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, -0.5, 0);
            let rotMatrix = rotateXMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.material);
            this.botQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, 0.5, 0);
            rotMatrix = rotateXMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.material);
            this.topQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.material);
            this.rightQuad.display();


        this.scene.popMatrix();


        this.scene.pushMatrix();

            tMatrix = translateMatrix(-0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.material);
            this.leftQuad.display();


        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
        [
            this.frontQuad ,
            this.backQuad,
            this.leftQuad,
            this.rightQuad,
            this.topQuad,
            this.botQuad,
        ].forEach(quad => quad.updateTexCoords(coords))
	}
}