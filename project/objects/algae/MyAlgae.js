import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import { degreeToRad, random } from "../../utils/math/MathUtils.js";
import { rotateXMatrix, rotateYMatrix, rotateZMatrix, scaleMatrix, translateMatrix } from "../../utils/matrix/MatrixGenerator.js";
import {MyPyramid} from "../../objects/MyPyramid.js";
import { Vector3 } from "../../utils/Vector3.js";
import { MyStackablePyramid } from "./MyStackablePyramid.js";

export class MyAlgae extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param {Vector3} position - Algae position.
   */
  constructor(scene, position, shader) {
    super(scene);
    this.scene = scene;
    this.position = position;
    this.scale = [random(0.07, 0.12),random(0.4, 0.6),random(0.07, 0.12)];
    this.rotation = random(0, 360);
    this.shape = new MyStackablePyramid(this.scene, Math.round(random(3,4)), 6);
    this.direction = new Vector3().setRandomX(-1,1).setRandomZ(-1,1).normalize();
    this.animationSpeed = random(0, 1);
    this.color = [random(0, 160)/255, 1.0, 0., 1.];
    this.shader = shader;
    this.finalMatrix = mat4.create();

    mat4.multiply(this.finalMatrix, this.finalMatrix, translateMatrix(this.position.x,this.position.y,this.position.z));
    mat4.multiply(this.finalMatrix, this.finalMatrix, rotateYMatrix(degreeToRad(this.rotation)));
    mat4.multiply(this.finalMatrix, this.finalMatrix, scaleMatrix(this.scale[0], this.scale[1], this.scale[2]));
  }

  display() {
    this.scene.pushMatrix();

    this.scene.multMatrix(this.finalMatrix);
    
    this.shader.setUniformsValues(
        { 
            algaeColor: this.color,
            direction: [this.direction.x, this.direction.y, this.direction.z], 
        });

    this.shape.display();
    
    this.scene.popMatrix()
  }
}
