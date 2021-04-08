import {CGFobject} from '../../lib/CGF.js';
import { rotateXMatrix, rotateYMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../utils/math/MathUtils.js';
import { Vector3 } from '../utils/Vector3.js';

/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param object - The object itself
 * @param direction - The initial angle (degrees - z to x positive)
 * @param velocity - The initial velocity of the object
 * @param position - The initial position of the object
*/
export class MyMovingObject extends CGFobject {    
    constructor(scene, object, direction, velocity, position) {
        super(scene);

        this.object = object;
        this.scene = scene;
        this.baseDirection = direction || 0;
        this.direction = this.baseDirection;
        this.baseVelocity = velocity || 0;
        this.velocity = this.baseVelocity;
        this.basePosition = position || new Vector3(0,0,0);
        this.position = (new Vector3(this.basePosition.x, this.basePosition.y, this.basePosition.z));
        this.accel = 10;
        this.maxVelocity = 5;
        this.rotSpeed = 45;
        this.curAccel = 0;
        this.lastAccel = 0;
    }

    accelerate(val) {
        this.lastAccel = this.curAccel;
        this.curAccel = val;
        //this.velocity += val * this.scene.getDelta();
    }

    turn(val) {
        this.direction += val * this.scene.getDelta();
    }

    reset() {
        this.direction = this.baseDirection;
        this.velocity = this.baseVelocity;
        this.position = (new Vector3(this.basePosition.x, this.basePosition.y, this.basePosition.z));
    }

    checkKeys() {
        let moving = false;
        
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(this.accel);
            moving = true;
        }
        
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-this.accel);
            moving = true;
        }

        if(!moving) {
            this.accelerate(0);
        }

        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(this.rotSpeed);
        }

        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-this.rotSpeed);
        }

        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.reset();
        }
    }

    update(t) {
        if(this.curAccel != 0) {
            if(this.lastAccel != 0) {
                this.velocity += this.curAccel * this.scene.getDelta();
            }
        }

        this.velocity -= this.scene.dragCoefficient * this.velocity  * this.scene.getDelta();

        //console.log(this.velocity);

        if (this.velocity > this.maxVelocity)
            this.velocity = this.maxVelocity;
        else if (this.velocity < -this.maxVelocity)
            this.velocity = -this.maxVelocity;

        const vel = new Vector3(
                this.velocity*Math.sin(degreeToRad(this.direction)),
                0,
                this.velocity*Math.cos(degreeToRad(this.direction)));
        vel.mult(this.scene.getDelta());
        this.position.sum(vel);
    }

    display() {
        this.scene.pushMatrix();
        
        let matrix = translateMatrix(this.position.x, this.position.y, this.position.z);
        this.scene.multMatrix(matrix);

        matrix = rotateYMatrix(degreeToRad(this.direction));
        this.scene.multMatrix(matrix);

        matrix = rotateXMatrix(degreeToRad(90));
        this.scene.multMatrix(matrix);
        

        this.object.display();

        this.scene.popMatrix();
    }
}


