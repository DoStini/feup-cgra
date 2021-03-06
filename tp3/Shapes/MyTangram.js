import {CGFobject} from '../../lib/CGF.js';
import { degreeToRad } from "../Utils/Math/MathUtils.js";
import { translateMatrix, rotateZMatrix, mirrorYZ } from "../Utils/Matrix/MatrixGenerator.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { Material } from "../Utils/Material.js";
import TangramMaterials from "../Materials/TangramMaterials/TangramMaterials.js"
import TailMaterial from '../Materials/TangramMaterials/TailMaterial.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene, defaultMaterial) {
		super(scene);
        this.scene = scene;
		this.init();
        this.defaultMaterial = defaultMaterial;
	}

    init() {
        this.head = new MyDiamond(this.scene);
        this.body = new MyTriangleBig(this.scene);
        this.backLeg = new MyTriangle(this.scene);
        this.frontLeg = new MyTriangleBig(this.scene);
        this.tail = new MyParallelogram(this.scene);
        this.leftEar = new MyTriangleSmall(this.scene);
        this.rightEar = new MyTriangleSmall(this.scene);

        this.normals = [];

        this.tailMaterial = new Material(this.scene, TangramMaterials.TailMaterial);
        this.backLegMaterial = new Material(this.scene, TangramMaterials.BackLegMaterial);
        this.bodyMaterial = new Material(this.scene, TangramMaterials.BodyMaterial);
        this.rightEarMaterial = new Material(this.scene, TangramMaterials.RightEarMaterial);
        this.leftEarMaterial = new Material(this.scene, TangramMaterials.LeftEarMaterial);
        this.frontLegMaterial = new Material(this.scene, TangramMaterials.FrontLegMaterial)
    }

    updateBuffers() {

	}

    display() {

        if (this.scene.displayNormals) {
            this.head.enableNormalViz();
            this.body.enableNormalViz();
            this.backLeg.enableNormalViz();
            this.frontLeg.enableNormalViz();
            this.tail.enableNormalViz();
            this.leftEar.enableNormalViz();
            this.rightEar.enableNormalViz();

        } else {
            this.head.disableNormalViz();
            this.body.disableNormalViz();
            this.backLeg.disableNormalViz();
            this.frontLeg.disableNormalViz();
            this.tail.disableNormalViz();
            this.leftEar.disableNormalViz();
            this.rightEar.disableNormalViz();

        }

        this.scene.pushMatrix();

            let tMatrix = translateMatrix(-2,0,0);

            this.scene.multMatrix(tMatrix);

            this.bodyMaterial.getMaterial().apply();
            this.body.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            let rotMatrix = rotateZMatrix(degreeToRad(-45));
            tMatrix = translateMatrix(-2+Math.sqrt(2),-Math.sqrt(2),0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            this.frontLegMaterial.getMaterial().apply();

            this.frontLeg.display();

        this.scene.popMatrix();

        
        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));

            let scaMatrix = mirrorYZ();

            tMatrix = translateMatrix(-2,2,0);
            
            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(scaMatrix);
            this.scene.multMatrix(rotMatrix);

            this.tailMaterial.getMaterial().apply();
            this.tail.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(45));
            tMatrix = translateMatrix(-2-Math.sqrt(2), 2, 0);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);

            this.backLegMaterial.getMaterial().apply();
            this.backLeg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(2*Math.sqrt(2) - 1, -0.5, 0);
            
            this.scene.multMatrix(tMatrix);

            this.defaultMaterial.getMaterial().apply();

            this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(-90));

            tMatrix = translateMatrix(2*Math.sqrt(2) - 2,0.5,0)

            this.scene.multMatrix(tMatrix);

            this.scene.pushMatrix();

                this.scene.multMatrix(rotMatrix);

                this.leftEarMaterial.getMaterial().apply();

                this.leftEar.display();

            this.scene.popMatrix();

            rotMatrix = rotateZMatrix(degreeToRad(90));
            tMatrix = translateMatrix(2,0,0);
            
            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);


            this.rightEarMaterial.getMaterial().apply();
            
            this.rightEar.display();
        

        this.scene.popMatrix();
    }

}