import {CGFobject} from '../../lib/CGF.js';
import { rotateXMatrix, rotateYMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../utils/math/MathUtils.js';
import { Vector3 } from '../utils/Vector3.js';

/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {    
    constructor(scene, object, direction, velocity, position) {
        super(scene);

        this.object = object;
        this.scene = scene;
        this.direction = degreeToRad(direction || 0);
        this.velocity = velocity || 0;
        this.position = position || new Vector3(0,0,0);
    }

    update() {

    }

    display() {
        
        this.scene.pushMatrix();
        
        let matrix = translateMatrix(this.position.x, this.position.y, this.position.z);
        this.scene.multMatrix(matrix);

        matrix = rotateYMatrix(degreeToRad(30));
        this.scene.multMatrix(matrix);

        matrix = rotateXMatrix(degreeToRad(90));
        this.scene.multMatrix(matrix);
        

        this.object.display();

        this.scene.popMatrix();
    }
}


