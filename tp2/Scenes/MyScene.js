import { CGFscene, CGFcamera, CGFaxis } from "../../lib/CGF.js";
import { MyDiamond } from "../Shapes/MyDiamond.js"
import { MyTriangle } from "../Shapes/MyTriangle.js"
import { MyTriangleBig } from "../Shapes/MyTriangleBig.js"
import { MyTriangleSmall } from "../Shapes/MyTriangleSmall.js"
import { MyParallelogram } from "../Shapes/MyParallelogram.js"

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.head = new MyDiamond(this);
    this.body = new MyTriangleBig(this);
    this.backLeg = new MyTriangle(this);
    this.frontLeg = new MyTriangleBig(this);
    this.tail = new MyParallelogram(this);
    this.leftEar = new MyTriangleSmall(this);
    this.rightEar = new MyTriangleSmall(this);

    this.showAxis = true;
    this.showHead = true;
    this.showBody = true;
    this.showBackLeg = true;
    this.showFrontLeg = true;
    this.showTail = true;
    this.showRightEar = true;
    this.showLeftEar = true;

    this.degreeToRad = (degree) => Math.PI*degree/180;
    
    this.translateMatrix = (x,y,z) => 
      [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
      ]

    this.rotateZMatrix = (degree) => 
      [
        Math.cos(degree), Math.sin(degree), 0, 0,
        -Math.sin(degree), Math.cos(degree), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];

    this.mirrorYZ = () => [
      -1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();

      let tMatrix = this.translateMatrix(-2,0,0);

      this.multMatrix(tMatrix);

      if (this.showBody)
        this.body.display();

    this.popMatrix();

    this.pushMatrix();

      let rotMatrix = this.rotateZMatrix(this.degreeToRad(-45));
      tMatrix = this.translateMatrix(-2+Math.sqrt(2),-Math.sqrt(2),0);

      this.multMatrix(tMatrix);
      this.multMatrix(rotMatrix);

      if (this.showFrontLeg)
        this.frontLeg.display();

    this.popMatrix();

    
    this.pushMatrix();

    rotMatrix = this.rotateZMatrix(this.degreeToRad(90));

    let scaMatrix = this.mirrorYZ();

    tMatrix = this.translateMatrix(-2,2,0);
    
    this.multMatrix(tMatrix);
    this.multMatrix(scaMatrix);
    this.multMatrix(rotMatrix);

    if (this.showTail)
      this.tail.display();

    this.popMatrix();

    this.pushMatrix();

    rotMatrix = this.rotateZMatrix(this.degreeToRad(45));
    tMatrix = this.translateMatrix(-2-Math.sqrt(2), 2, 0);

    this.multMatrix(tMatrix);
    this.multMatrix(rotMatrix);

    if(this.showBackLeg)
      this.backLeg.display();

    this.popMatrix();

    this.pushMatrix();

    tMatrix = this.translateMatrix(2*Math.sqrt(2) - 1, -0.5, 0);
    
    this.multMatrix(tMatrix);

    if(this.showHead)
      this.head.display();

    this.popMatrix();

    this.pushMatrix();

    rotMatrix = this.rotateZMatrix(this.degreeToRad(-90));
    const earX = Math.sqrt(2) - 2 + Math.sqrt(2);
    tMatrix = this.translateMatrix(earX,0.5,0)

    this.multMatrix(tMatrix);

      this.pushMatrix();

      this.multMatrix(rotMatrix);

      if(this.showLeftEar)
        this.leftEar.display();

      this.popMatrix();

    rotMatrix = this.rotateZMatrix(this.degreeToRad(90));
    tMatrix = this.translateMatrix(2,0,0);
    
    this.multMatrix(tMatrix);
    this.multMatrix(rotMatrix);


    if(this.showRightEar)
      this.rightEar.display();
    

    this.popMatrix();

    // if (this.showBackLeg)    
    //   this.backLeg.display();

    // ---- END Primitive drawing section
  }
}
