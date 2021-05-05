import { degreeToRad, random } from "./math/MathUtils.js";

export class Vector3 {
    constructor(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    
    magnitude = () => Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2));
    sum = (vec) => {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
    }
    mult = (val) => {
        this.x *= val;
        this.y *= val;
        this.z *= val;    
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * @param {Vector3} other
     */
    diffSquared(other) {
        const deltaX = this.x - other.x;
        const deltaZ = this.z - other.z;

        return deltaX*deltaX + deltaZ*deltaZ;
    }
    setRandomX = (min, max) => {
        this.x = random(min, max); 
        return this;
    }
    setRandomY = (min, max) => {
        this.y = random(min, max); 
        return this;
    }
    setRandomZ = (min, max) => {
        this.z = random(min, max); 
        return this;
    }

}