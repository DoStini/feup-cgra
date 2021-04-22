import {CGFobject, CGFshader, CGFtexture} from '../../../lib/CGF.js';
import { rotateXMatrix } from '../../../tp4/Utils/Matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../../shapes/MyRectTriangle.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MySphere } from '../MySphere.js';
import { MyAnimatedWing } from './AnimatedWing.js';
import { MyAnimatedTail } from './AnimatedTail.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param lenght - lenght of the fish
 * @param width - width of the fish
*/
export class MyFish extends CGFobject {
    constructor(scene, shader, tex, length, width, height, position) {
        super(scene);
        this.scene = scene;
        this.shader = shader;
        this.tex = tex;
        this.length = length;
        this.width = width;
        this.height = height;
        this.position = position || new Vector3(0, 3, 0);
        this.init();
    }

    init() {
        this.body = new MySphere(this.scene, 32, 16);
        this.leftEye = new MySphere(this.scene, 8, 4);
        this.rightEye = new MySphere(this.scene, 8, 4);
        this.tail = new MyAnimatedTail(this.scene, -40, 40);
        this.leftWing = new MyAnimatedWing(this.scene, -40, -20);
        this.rightWing = new MyAnimatedWing(this.scene, -40, -20);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.setActiveShader(this.shader);
        this.tex.bind(2);

        this.scene.pushMatrix();
        // The sphere used has a radius of 1 (diameter of 2), hence the division by 2
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z));
        this.scene.multMatrix(scaleMatrix(this.width/2, this.height/2, this.length/2));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(90)));
        this.scene.activeTexture = this.tex;
        this.body.display();
        this.scene.activeTexture = null;
        
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x + this.width*0.4, this.position.y + this.height/10, this.position.z + this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x-this.width*0.4, this.position.y + this.height/10, this.position.z + this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.rightEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z-this.length/2));
        this.scene.multMatrix(scaleMatrix(this.length/3, this.length/3, this.length/3));
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x + 0.48*this.width, this.position.y - this.width/5, this.position.z + 0.1*this.length));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(90)));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(-90)));
        this.scene.multMatrix(scaleMatrix(0.25*this.length, 0.25*this.length, 0.25*this.length))
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x - 0.48*this.width, this.position.y - this.width/5, this.position.z + 0.1*this.length));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(-90)));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(-90)));
        this.scene.multMatrix(scaleMatrix(-0.25*this.length, 0.25*this.length, 0.25*this.length))
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

}


