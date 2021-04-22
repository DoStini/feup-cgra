import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix } from '../../../tp4/Utils/Matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../../shapes/MyRectTriangle.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MySphere } from '../MySphere.js';
/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param lenght - lenght of the fish
 * @param width - width of the fish
*/
export class MyAnimatedTail extends CGFobject {
    constructor(scene, minRot, maxRot) {
        super(scene);
        this.scene = scene;
        this.minRot = minRot;
        this.maxRot = maxRot;
        this.init();
    }

    init() {
        this.element = new MyRectTriangle(this.scene);
        this.rotation = (this.minRot + this.maxRot)/2;
    }

    update(t) {

    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateYMatrix(degreeToRad(this.rotation)));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(-45)));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(90)));
        this.element.display();
        this.scene.popMatrix();
    }

}
