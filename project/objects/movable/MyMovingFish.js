import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix, rotateYMatrix, translateMatrix, scaleMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MyFish } from '../fish/MyFish.js';
import { MyMovingObject } from './MyMovingObject.js'
import MovementState from './HorizontalMovementState.js';
import VerticalMovementState from './VerticalMovementState.js';

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
    constructor(scene, direction, velocity, position, fishColor, infLimit, supLimit) {
        const fish = new MyFish(scene, fishColor, 0.5, 0.2, 0.30, new Vector3());
        super(scene, fish, direction, velocity, position);
        this.state = VerticalMovementState.UP;
        this.supLimit = supLimit;
        this.infLimit = infLimit;
        this.verticalVelocity = 2;
    }

    checkKeys(delta) {
        super.checkKeys(delta);
        if (this.scene.gui.isKeyPressed("KeyP")) {
            if (this.state === VerticalMovementState.DOWN)
                this.state = VerticalMovementState.GOING_UP;
        }
        if (this.scene.gui.isKeyPressed("KeyL")) {
            if (this.state === VerticalMovementState.UP)
                this.state = VerticalMovementState.GOING_DOWN;
        }
    }

    updateUp(delta) {
        const vel = new Vector3(0, this.verticalVelocity*delta, 0);
        this.position.sum(vel);
        if (this.position.y > this.supLimit) {
            this.position.y = this.supLimit;
            this.state = VerticalMovementState.UP;
        }
    }

    updateDown(delta) {
        const vel = new Vector3(0, -this.verticalVelocity*delta, 0);
        this.position.sum(vel);
        if (this.position.y < this.infLimit) {
            this.position.y = this.infLimit;
            this.state = VerticalMovementState.DOWN;
        }

    }

    update(t, delta) {
        super.update(t, delta);
        if (this.state === VerticalMovementState.GOING_DOWN)
            this.updateDown(delta);
        else if (this.state === VerticalMovementState.GOING_UP)
            this.updateUp(delta);

        this.object.update(t, delta, MovementState.LEFT);
    }
}
