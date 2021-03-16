import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../shapes/MyQuad.js"
import { degreeToRad } from "../Utils/Math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, rotateXMatrix } from "../Utils/Matrix/MatrixGenerator.js";


/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textures, params) {
		super(scene);
        this.scene = scene;
        this.init(textures, params)
	}

    init(textures, params) {
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.botQuad = new MyQuad(this.scene);

        if (!textures)  textures = [];

        this.topTex = textures[0];
        this.frontTex = textures[1];
        this.rightTex = textures[2];
        this.backTex = textures[3];
        this.leftTex = textures[4];
        this.bottomTex = textures[5];

    }

    // Sets default if tex undefined
    safeApply(tex) {
        if (!tex) {
            if (this.scene.defaultMaterial) this.scene.defaultMaterial.apply();
        } else {
            tex.getMaterial().apply();
        }

        if (!this.scene.linear)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    }

    display() {
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            this.safeApply(this.frontTex);
            this.frontQuad.display();

            tMatrix = translateMatrix(0,0,-1);
            let inv = mirrorYZ();

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(inv);
            this.safeApply(this.backTex);            
            this.backQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, -0.5, 0);
            let rotMatrix = rotateXMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.bottomTex);
            this.botQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, 0.5, 0);
            rotMatrix = rotateXMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.topTex);
            this.topQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.rightTex);
            this.rightQuad.display();


        this.scene.popMatrix();


        this.scene.pushMatrix();

            tMatrix = translateMatrix(-0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.safeApply(this.leftTex);
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