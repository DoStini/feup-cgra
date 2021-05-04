import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix } from '../../../tp4/Utils/Matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../../shapes/MyRectTriangle.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../../utils/Vector3.js';
import MovementState from '../movable/HorizontalMovementState.js';
import { MySphere } from '../MySphere.js';
/**
* MyRotationAnimatedObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param minRot - minimum animation rotation of the fish
 * @param maxRot - maximum animation rotation of the fish
 * @param rotSpeed - rotation speed
*/
export class MyRotationAnimatedObject extends CGFobject {
    constructor(scene, minRot, maxRot, rotSpeed) {
        super(scene);
        this.scene = scene;
        this.minRot = minRot;
        this.maxRot = maxRot;
        this.rotSpeed = rotSpeed;
    }

    init() {
        this.rotation = (this.minRot + this.maxRot)/2;
        this.direction = 1;
    }

    update(t, lastDelta) {
        this.rotation += this.direction * this.rotSpeed * lastDelta;
        if (this.rotation > this.maxRot) {
            this.direction *= -1;
            this.rotation = this.maxRot;
        }
        else if (this.rotation < this.minRot) {
            this.direction *= -1;
            this.rotation = this.minRot;
        }
    }
}
