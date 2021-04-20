import {CGFobject} from '../../lib/CGF.js';
import { rotateXMatrix } from '../../tp4/Utils/Matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../shapes/MyRectTriangle.js';
import { degreeToRad } from '../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../utils/Vector3.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param lenght - lenght of the fish
 * @param width - width of the fish
*/
export class MyFish extends CGFobject {
    constructor(scene, length, width, height, position) {
        super(scene);
        this.scene = scene;
        this.length = length;
        this.width = width;
        this.height = height;
        this.position = position || new Vector3(0, 3, 0);
        this.init();
    }

    init() {
        this.body = new MySphere(this.scene, 32, 16);
        this.leftEye = new MySphere(this.scene, 8, 4);
        this.rightEye = new MySphere(this.scene, 8, 4);
        this.tail = new MyRectTriangle(this.scene);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        // The sphere used has a radius of 1 (diameter of 2), hence the division by 2
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z));
        this.scene.multMatrix(scaleMatrix(this.width/2, this.height/2, this.length/2));
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.width*0.4, this.position.y + this.height/10, this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(-this.width*0.4, this.position.y + this.height/10, this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.leftEye.display();
        this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z-this.length/2-0.5*this.length/3));
        // this.scene.multMatrix(scaleMatrix(this.length/3, this.length/3, this.length/3));
        // this.scene.multMatrix(rotateXMatrix(degreeToRad(-45)));
        // this.scene.multMatrix(rotateYMatrix(degreeToRad(90)));
        // this.tail.display();

        this.scene.popMatrix();
    }

}


