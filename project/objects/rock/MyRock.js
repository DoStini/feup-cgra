import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import { degreeToRad, random } from "../../utils/math/MathUtils.js";
import { rotateXMatrix, rotateYMatrix, rotateZMatrix, scaleMatrix, translateMatrix } from "../../utils/matrix/MatrixGenerator.js";
import { Vector3 } from "../../utils/Vector3.js";
//import { exports } from "../../../lib/CGF.js"

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   * @param {Vector3} position
   */
  constructor(scene, slices, stacks, position, rotation, minRand, maxRand) {
    super(scene);
    this.scene = scene;
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.minRand = minRand || 0.7;
    this.maxRand = maxRand || 1.0; // Reassuring that the rock doesnt exceed 0.2 units size
    this.position = position;
    this.scale = [random(0.05, 0.1),random(0.05, 0.1),random(0.05, 0.1)]; // The sphere has a preset radius of 1, so to get 0.2 rock diameter, we need to divide by 2
    this.rotation = rotation;
    this.offset = 0;
    this.fishRotation = 0;
    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      let first;
      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;

        if (longitude === this.longDivs) {
            this.vertices.push(first[0], first[1], first[2]);
        } else {
            const factor = random(this.minRand, this.maxRand);
            this.vertices.push(x*factor, y*factor, z*factor);
            
            if (longitude === 0) {
                first = [x*factor, y*factor, z*factor];
            }
        }
        

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);

        //--- Texture Coordinates
        this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);

        theta += thetaInc;
      }
      phi += phiInc;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.finalMatrix = mat4.create();

    mat4.multiply(this.finalMatrix, this.finalMatrix, rotateZMatrix(degreeToRad(this.rotation[2])));
    mat4.multiply(this.finalMatrix, this.finalMatrix, rotateYMatrix(degreeToRad(this.rotation[1])));
    mat4.multiply(this.finalMatrix, this.finalMatrix, rotateXMatrix(degreeToRad(this.rotation[0])));
    mat4.multiply(this.finalMatrix, this.finalMatrix, scaleMatrix(this.scale[0], this.scale[1], this.scale[2]));
    
    this.initGLBuffers();
  }

  display() {
      this.scene.pushMatrix();
      
      this.scene.multMatrix(translateMatrix(this.position.x,this.position.y,this.position.z));
      this.scene.multMatrix(rotateYMatrix(degreeToRad(this.fishRotation)));
      this.scene.multMatrix(translateMatrix(0,0,this.offset));
      this.scene.multMatrix(this.finalMatrix);
      super.display();
      
      this.scene.popMatrix()
  }
}
