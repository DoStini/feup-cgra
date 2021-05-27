import {CGFobject} from '../../../lib/CGF.js';
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

    update(t, lastDelta, factor) {
        factor = factor || 1.0;
        this.rotation += this.direction * this.rotSpeed * lastDelta * factor;
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
