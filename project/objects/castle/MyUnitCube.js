import { CGFobject } from "../../../lib/CGF.js";
import { MyQuad } from "../../shapes/MyQuad.js"
import { degreeToRad } from "../../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, rotateXMatrix, rotateZMatrix } from "../../utils/matrix/MatrixGenerator.js";
import { Material } from "../../utils/Material.js"



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
        this.frontQuad.disableNormalViz();
        this.backQuad = new MyQuad(this.scene);
        this.backQuad.disableNormalViz();
        this.leftQuad = new MyQuad(this.scene);
        this.leftQuad.disableNormalViz();
        this.rightQuad = new MyQuad(this.scene);
        this.rightQuad.disableNormalViz();
        this.topQuad = new MyQuad(this.scene);
        this.topQuad.disableNormalViz();
        this.botQuad = new MyQuad(this.scene);
        this.botQuad.disableNormalViz();
    }

    display() {
        this.material.safeApply();

        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            this.frontQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            this.scene.multMatrix(translateMatrix(0,0,-0.5));
            this.scene.multMatrix(rotateYMatrix(degreeToRad(180)));
        
            this.backQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, -0.5, 0);
            let rotMatrix = rotateXMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            
            this.botQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, 0.5, 0);
            rotMatrix = rotateXMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.topQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.rightQuad.display();


        this.scene.popMatrix();


        this.scene.pushMatrix();

            tMatrix = translateMatrix(-0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
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