import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { degreeToRad } from "../Utils/Math/MathUtils.js";
import { translateMatrix, rotateZMatrix, mirrorYZ } from "../Utils/Matrix/MatrixGenerator.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
		this.init();
	}

    init() {
        this.head = new MyDiamond(
            this.scene, 
            { 
                texCoords: [
                    0, 0.5,
                    0.25, 0.75,
                    0.25, 0.25,
                    0.5, 0.5
                ] 
            });
        this.body = new MyTriangleBig(
            this.scene, 
            { 
                texCoords: [
                    0, 0,
                    1, 0,
                    0.5, 0.5,
                ]
            });
        this.backLeg = new MyTriangle(
            this.scene,
            { 
                texCoords: [
                    0.5, 1,
                    0, 1,
                    0, 0.5,
                ]
            });
        this.frontLeg = new MyTriangleBig(
            this.scene,
            { 
                texCoords: [
                    1, 1,
                    1, 0,
                    0.5, 0.5,
                ]
            });
        this.tail = new MyParallelogram(
            this.scene, 
            { 
                texCoords: [
                    1, 1,
                    0.75, 1,
                    0.75, 0.75,
                    0.5, 1,
                    0.5,0.75,
                    0.25,0.75,
                ] 
            });
        this.leftEar = new MyTriangleSmall(
            this.scene,
            { 
                texCoords: [
                    0.25, 0.75,
                    0.75, 0.75,
                    0.5, 0.5,
                ] 
            });
        this.rightEar = new MyTriangleSmall(
            this.scene, 
            { 
                texCoords: [
                    0, 0,
                    0, 0.5,
                    0.25, 0.25,
                ]
            });


        this.normals = [];


        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.loadTexture("./images/tangram.png");
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    updateBuffers() {

	}

    display() {

        this.scene.pushMatrix();

            let tMatrix = translateMatrix(-2,0,0);

            this.scene.multMatrix(tMatrix);

            this.tangramMaterial.apply();
            this.body.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            let rotMatrix = rotateZMatrix(degreeToRad(-45));
            tMatrix = translateMatrix(-2+Math.sqrt(2),-Math.sqrt(2),0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            this.tangramMaterial.apply();

            this.frontLeg.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));

            let scaMatrix = mirrorYZ();

            tMatrix = translateMatrix(-2,2,0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(scaMatrix);
            this.scene.multMatrix(rotMatrix);

            this.tangramMaterial.apply();
            this.tail.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(45));
            tMatrix = translateMatrix(-2-Math.sqrt(2), 2, 0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            this.tangramMaterial.apply();
            this.backLeg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(2*Math.sqrt(2) - 1, -0.5, 0);
            
            this.scene.multMatrix(tMatrix);

            this.tangramMaterial.apply();

            this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(-90));

            tMatrix = translateMatrix(2*Math.sqrt(2) - 2,0.5,0)

            this.scene.multMatrix(tMatrix);

            this.scene.pushMatrix();

                this.scene.multMatrix(rotMatrix);

                this.tangramMaterial.apply();

                this.leftEar.display();

            this.scene.popMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));
            tMatrix = translateMatrix(2,0,0);
            
            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);


            this.tangramMaterial.apply();
            
            this.rightEar.display();
        

        this.scene.popMatrix();
    }

    updateTexCoords() {}

}