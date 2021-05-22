//@ts-check

import {CGFobject} from '../../../lib/CGF.js';
import { rotateXMatrix, rotateYMatrix, translateMatrix, scaleMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MyFish } from '../fish/MyFish.js';
import {MyRock} from "../../objects/rock/MyRock.js";
import { MyMovingObject } from './MyMovingObject.js'
import MovementState from './HorizontalMovementState.js';
import VerticalMovementState from './VerticalMovementState.js';
import { MyCastle } from '../castle/MyCastle.js';

/**
* MyMovingFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param object - The object itself
 * @param direction - The initial angle (degrees - z to x positive)
 * @param velocity - The initial velocity of the object
 * @param {Vector3} position - The initial position of the object
*/
export class MyMovingFish extends MyMovingObject {    
    constructor(scene, direction, velocity, position, fishColor, infLimit, supLimit) {
        const fish = new MyFish(scene, fishColor, 0.5, 0.2, 0.30, new Vector3());
        super(scene, fish, direction, velocity, position);
        this.state = VerticalMovementState.UP;
        this.supLimit = supLimit;
        this.infLimit = infLimit;
        this.verticalVelocity = 2;
        /** @type {MyRock} */ this.pickedUpRock = null;
        /** @type {Vector3} */ this.pickedUpRockPos = null;
    }

    resetRock() {
        this.pickedUpRock.fishRotation = 0;
        this.pickedUpRock.offset = 0;
        this.pickedUpRockPos = null;
        this.pickedUpRock = null;
    }

    reset() {
        super.reset();

        if(this.pickedUpRock) {
            this.pickedUpRock.position = this.pickedUpRockPos.clone();

            this.resetRock();
        }

        this.state = VerticalMovementState.UP;
    }

    dropRock() {
        /** @type {Vector3} */ let castlePosition = this.scene.castle.getCenterPosition();
        let castleX = [castlePosition.x-this.scene.castle.length/2,castlePosition.x+this.scene.castle.length/2]
        let castleZ = [castlePosition.z-this.scene.castle.length/2,castlePosition.z+this.scene.castle.length/2]
        /** @type {MyCastle} */ let castle = this.scene.castle;

        if(this.position.x > castleX[1] || this.position.x < castleX[0] || this.position.z > castleZ[1] || this.position.z < castleZ[0]) {
            return;
        }

        if(castle.dropRock(this.pickedUpRock)) {
            this.resetRock();
        }
    }

    pickupRock() {
        let minPositionX = Infinity, minPositionZ = Infinity, minDistance = Infinity;
        /** @type {MyRock} */ let closestRock = null;
        let closestRockIndex = 0;
        

        this.scene.rocks.rocks.forEach((/** @type {MyRock} */ rock, index) => {
            if(!rock.canPickup) return;
            
            let distanceSquared = this.position.diffSquared(rock.position);
            if(distanceSquared < minDistance) {
                minDistance = distanceSquared;
                minPositionX = rock.position.x;
                minPositionZ = rock.position.z;
                closestRockIndex = index;
            }
        });

        if(minDistance <= 1.5) {
            closestRock = this.scene.rocks.rocks[closestRockIndex];
            this.pickedUpRock = closestRock;
            this.pickedUpRockPos = closestRock.position.clone();
        }
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
        if(this.scene.gui.isKeyPressed("KeyC")) {
            if(this.state === VerticalMovementState.DOWN) {
                if(!this.pickedUpRock) this.pickupRock();
                else this.dropRock();
            }
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

        const velocityFactor = Math.max(this.velocity/this.maxVelocity, 0.05);

        this.object.update(t, delta, velocityFactor, this.horizontalState);
        if(this.pickedUpRock) {
            this.pickedUpRock.position.x = this.position.x;
            this.pickedUpRock.position.y = this.position.y;
            this.pickedUpRock.position.z = this.position.z;
            this.pickedUpRock.offset = this.object.length/2;
            this.pickedUpRock.fishRotation = this.direction;
        }
    }
}
