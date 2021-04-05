import {CGFobject} from '../../lib/CGF.js';
import { rotateXMatrix, translateMatrix } from '../utils/matrix/MatrixGenerator.js';
import { degreeToRad } from '../utils/math/MathUtils.js';

/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);

        this.object = object;
        this.scene = scene;
    }

    update() {

    }

    display() {
        
        this.scene.pushMatrix();

        let matrix = rotateXMatrix(degreeToRad(90));
        this.scene.multMatrix(matrix);
        matrix = translateMatrix(0,-0.5,0);
        this.scene.multMatrix(matrix);


        this.object.display();

        this.scene.popMatrix();
    }
}


