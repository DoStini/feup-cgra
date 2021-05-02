import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import AlgaeMaterial from "../../materials/algae/AlgaeMaterial.js";
import { Material } from "../../utils/Material.js";
import { degreeToRad, random } from "../../utils/math/MathUtils.js";
import { rotateXMatrix, rotateYMatrix, rotateZMatrix, scaleMatrix, translateMatrix } from "../../utils/matrix/MatrixGenerator.js";
import {MyPyramid} from "../../objects/MyPyramid.js";
import { Vector3 } from "../../utils/Vector3.js";

export class MyAlgae extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param {Vector3} position - Algae position.
   */
  constructor(scene, position) {
    super(scene);
    this.scene = scene;
    this.position = position;
    this.scale = [random(0.1, 0.3),random(0.4, 0.6),random(0.1, 0.3)];
    this.rotation = random(0, 360);
    this.material = new Material(this.scene, AlgaeMaterial);
    this.shape = new MyPyramid(this.scene, 3);
  }

  display() {
      this.material.safeApply();

      this.scene.pushMatrix();
      this.scene.multMatrix(translateMatrix(this.position.x,this.position.y,this.position.z));
      this.scene.multMatrix(rotateYMatrix(degreeToRad(this.rotation)));
      this.scene.multMatrix(scaleMatrix(this.scale[0], this.scale[1], this.scale[2]));
      this.shape.display();
      
      this.scene.popMatrix()
  }
}
