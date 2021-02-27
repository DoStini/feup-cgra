import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../Shapes/MyQuad.js"
import { degreeToRad } from "../Utils/Math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, rotateXMatrix } from "../Utils/Matrix/MatrixGenerator.js";


/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
		super(scene);
        this.scene = scene;
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

    display() {
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            this.frontQuad.display();

            tMatrix = translateMatrix(0,0,-1);
            let inv = mirrorYZ();

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(inv);
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
}