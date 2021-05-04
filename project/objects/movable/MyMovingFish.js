import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix, rotateYMatrix, translateMatrix, scaleMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MyFish } from '../fish/MyFish.js';
import { MyMovingObject } from './MyMovingObject.js'
import MovementState from './MovementState.js';

/**
* MyMovingFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param object - The object itself
 * @param direction - The initial angle (degrees - z to x positive)
 * @param velocity - The initial velocity of the object
 * @param position - The initial position of the object
*/
export class MyMovingFish extends MyMovingObject {    
    constructor(scene, direction, velocity, position, fishColor) {
        const fish = new MyFish(scene, fishColor, 0.5, 0.2, 0.30, new Vector3());
        super(scene, fish, direction, velocity, position);
    }

    checkKeys(delta) {
        super.checkKeys(delta);
    }

    update(t, delta) {
        super.update(t, delta);
        this.object.update(t, delta, MovementState.LEFT);
    }
}
