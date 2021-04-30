import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import RockMaterial from "../../materials/rock/RockMaterial.js";
import { Material } from "../../utils/Material.js";
import { degreeToRad, random } from "../../utils/math/MathUtils.js";
import { rotateXMatrix, scaleMatrix, translateMatrix } from "../../utils/matrix/MatrixGenerator.js";

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, position, rotation, minRand, maxRand) {
    console.log("hello")
    super(scene);
    this.scene = scene;
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.minRand = minRand || 1; // Reassuring that the rock doesnt exceed 0.2 units size
    this.maxRand = maxRand || 0.5;
    this.position = position;
    this.scale = random(0.05, 0.1); // The sphere has a preset radius of 1, so to get 0.2 rock diameter, we need to divide by 2
    this.rotation = rotation;
    this.material = new Material(this.scene, RockMaterial);
    this.initBuffers();
  }

  getRandomVertex = () => random(this.minRand, this.maxRand);

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

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;

        const random = this.getRandomVertex;
        this.vertices.push(x*random, y*random, z*random);

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
    this.initGLBuffers();
  }

  display() {
      this.material.safeApply();

      this.scene.pushMatrix();
      
      this.scene.multMatrix(translateMatrix(this.position.x,this.position.y,this.position.z));
      this.scene.multMatrix(rotateZMatrix(degreeToRad(this.rotation[2])));
      this.scene.multMatrix(rotateYMatrix(degreeToRad(this.rotation[1])));
      this.scene.multMatrix(rotateXMatrix(degreeToRad(this.rotation[0])));
      this.scene.multMatrix(scaleMatrix(this.scale, this.scale, this.scale));
      super.display();
      
      this.scene.popMatrix()
  }
}
