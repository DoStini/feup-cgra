import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../../shapes/MyRectTriangle.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../../utils/Vector3.js';
import MovementState from '../movable/HorizontalMovementState.js';
import { MySphere } from '../MySphere.js';
import { MyRotationAnimatedObject } from './MyRotationAnimatedObject.js';
/**
* MyAnimatedWing
* @constructor
 * @param scene - Reference to MyScene object
 * @param minRot - minimum animation rotation of the fish
 * @param maxRot - maximum animation rotation of the fish
 * @param rotSpeed - rotation speed
*/
export class MyAnimatedWing extends MyRotationAnimatedObject {
    constructor(scene, minRot, maxRot, rotSpeed) {
        super(scene, minRot, maxRot, rotSpeed);
        this.init();
    }

    init() {
        super.init();
        this.element = new MyRectTriangle(this.scene);
    }

    update(t, lastDelta, rotate) {
        if (rotate)
            super.update(t, lastDelta);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateXMatrix(-degreeToRad(this.rotation)));
        this.scene.multMatrix(translateMatrix(0, -1, 0));
        this.element.display();
        this.scene.popMatrix();
    }

}
