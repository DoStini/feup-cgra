import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../../../lib/CGF.js';
import { rotateXMatrix, rotateZMatrix } from '../../../tp4/Utils/Matrix/MatrixGenerator.js';
import { MyRectTriangle } from '../../shapes/MyRectTriangle.js';
import { degreeToRad } from '../../utils/math/MathUtils.js';
import { rotateYMatrix, scaleMatrix, translateMatrix } from '../../utils/matrix/MatrixGenerator.js';
import { Vector3 } from '../../utils/Vector3.js';
import { MySphere } from '../MySphere.js';
import { MyAnimatedWing } from './AnimatedWing.js';
import { MyAnimatedTail } from './AnimatedTail.js';
import { Material } from '../../utils/Material.js';
import DefaultMaterial from '../../materials/DefaultMaterial.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param lenght - lenght of the fish
 * @param width - width of the fish
*/
export class MyFish extends CGFobject {
    constructor(scene, bodyShader, tailShader, eyeShader, length, width, height, position) {
        super(scene);
        this.scene = scene;
        this.bodyShader = bodyShader;
        this.tailShader = tailShader;
        this.eyeShader = eyeShader;
        this.length = length;
        this.width = width;
        this.height = height;
        this.tex = new CGFtexture(this.scene, "textures/fish_texture.jpg");
        this.position = position || new Vector3(0, 3, 0);
        this.init();
    }

    init() {
        this.body = new MySphere(this.scene, 32, 16);
        this.leftEye = new MySphere(this.scene, 8, 4);
        this.rightEye = new MySphere(this.scene, 8, 4);
        this.tail = new MyAnimatedTail(this.scene, -40, 40, 80);
        this.leftWing = new MyAnimatedWing(this.scene, -40, -20, 40);
        this.rightWing = new MyAnimatedWing(this.scene, -40, -20, 40);
        this.dorsal = new MyRectTriangle(this.scene);
    }

    displayBody() {
        this.scene.pushMatrix();
        // The sphere used has a radius of 1 (diameter of 2), hence the division by 2
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z));
        this.scene.multMatrix(scaleMatrix(this.width/2, this.height/2, this.length/2));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(90)));
        this.scene.activeTexture = this.tex;
        this.body.display();
        
        this.scene.popMatrix();
    }

    displayEyes() {
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x + this.width*0.4, this.position.y + this.height/10, this.position.z + this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(-20)));
        this.scene.multMatrix(rotateZMatrix(degreeToRad(-90)));
        this.leftEye.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x-this.width*0.4, this.position.y + this.height/10, this.position.z + this.length/4));
        this.scene.multMatrix(scaleMatrix(this.width/8, this.width/8, this.width/8));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(20)));
        this.scene.multMatrix(rotateZMatrix(degreeToRad(90)));
        this.rightEye.display();
        this.scene.popMatrix();
    }

    displayDorsal() {
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y + this.height*0.48, this.position.z + 0.1*this.length));
        this.scene.multMatrix(scaleMatrix(-0.25*this.length, 0.25*this.length, 0.25*this.length));
        this.scene.multMatrix(rotateYMatrix(degreeToRad(90)));
        this.dorsal.display();

        this.scene.popMatrix();
    }

    displayWings() {
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
    }

    displayTail() {
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z-this.length/2));
        this.scene.multMatrix(scaleMatrix(this.length/3, this.length/3, this.length/3));
        this.tail.display();
        this.scene.popMatrix();
    }
    
    update(t, lastDelta) {
        this.leftWing.update(t, lastDelta);
        this.rightWing.update(t, lastDelta);
        this.tail.update(t, lastDelta);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.setActiveShader(this.bodyShader);

        this.displayBody();

        this.scene.setActiveShader(this.eyeShader);
        this.displayEyes();

        this.scene.activeTexture = null;

        this.scene.setActiveShader(this.tailShader);
        
        this.displayTail();

        this.displayWings();

        this.displayDorsal();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}


