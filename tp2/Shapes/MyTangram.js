import {CGFobject} from '../../lib/CGF.js';
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
        this.head = new MyDiamond(this.scene);
        this.body = new MyTriangleBig(this.scene);
        this.backLeg = new MyTriangle(this.scene);
        this.frontLeg = new MyTriangleBig(this.scene);
        this.tail = new MyParallelogram(this.scene);
        this.leftEar = new MyTriangleSmall(this.scene);
        this.rightEar = new MyTriangleSmall(this.scene);

        this.showHead = true;
        this.showBody = true;
        this.showBackLeg = true;
        this.showFrontLeg = true;
        this.showTail = true;
        this.showRightEar = true;
        this.showLeftEar = true;
    }

    display() {
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(-2,0,0);

            this.scene.multMatrix(tMatrix);

            if (this.showBody)
                this.body.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            let rotMatrix = rotateZMatrix(degreeToRad(-45));
            tMatrix = translateMatrix(-2+Math.sqrt(2),-Math.sqrt(2),0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            if (this.showFrontLeg)
                this.frontLeg.display();

        this.scene.popMatrix();

        
        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));

            let scaMatrix = mirrorYZ();

            tMatrix = translateMatrix(-2,2,0);
            
            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(scaMatrix);
            this.scene.multMatrix(rotMatrix);

            if (this.showTail)
                this.tail.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(45));
            tMatrix = translateMatrix(-2-Math.sqrt(2), 2, 0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            if(this.showBackLeg)
                this.backLeg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(2*Math.sqrt(2) - 1, -0.5, 0);
            
            this.scene.multMatrix(tMatrix);

            if(this.showHead)
                this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(-90));

            tMatrix = translateMatrix(2*Math.sqrt(2) - 2,0.5,0)

            this.scene.multMatrix(tMatrix);

            this.scene.pushMatrix();

                this.scene.multMatrix(rotMatrix);

                if(this.showLeftEar)
                    this.leftEar.display();

            this.scene.popMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));
            tMatrix = translateMatrix(2,0,0);
            
            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);


            if(this.showRightEar)
                this.rightEar.display();
        

        this.scene.popMatrix();
    }

}