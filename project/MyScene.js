import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyMovingObject } from "./objects/MyMovingObject.js";
import { MyPyramid } from "./objects/MyPyramid.js";
import { MySphere } from "./objects/MySphere.js";
import { MyCubeMap } from "./objects/MyCubeMap.js";
import { MyQuad } from "./shapes/MyQuad.js";
import { Vector3 } from "./utils/Vector3.js";
import { mirrorXY, mirrorYZ, scaleMatrix, translateMatrix } from "./utils/matrix/MatrixGenerator.js";
import { MyCylinder } from "./objects/MyCylinder.js";
import { Material } from "./utils/Material.js";
import DefaultMaterial from "./materials/DefaultMaterial.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    reset() {
        this.movmObject.reset();
    }

    checkKeys() {
        this.movmObject.checkKeys();

        if (this.gui.isKeyPressed("KeyR")) {
            this.reset();
        }
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

        this.setUpdatePeriod(1);

        this.enableTextures(true);

        //Initialize scene objects        // create reference from the scene to the GUI
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.skybox = new MyCubeMap(this);
        this.quad = new MyQuad(this);
        this.cylinderMaterial = new Material(this, DefaultMaterial, {
            tex: "/project/textures/FEUP.jpg",
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
        });
        this.cylinder = new MyCylinder(this, 25, this.cylinderMaterial);

        this.movmObject = new MyMovingObject(
                this,
                new MyPyramid(this, 3, 1), 
                0, 0, new Vector3(0,0,-0.5));

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);

        this.linearRender = false;

        this.initDelta();
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.dragCoefficient = 0.5;
        this.useDrag = false;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    /**
     * Updates the current update delta time
     * 
     * @param {*} t Current timeframe
     */
    updateDelta(t) {
        this.lastDelta = (t - this.lastUpdate)/1000;
        this.lastUpdate = t;
    }

    /**
     * Initializes auxiliary variables to use with update delta time 
     */
    initDelta() {
        this.lastUpdate = Date.now();
        this.lastDelta = 0;
    }

    /**
     * Update delta time
     * 
     * @returns The last update delta time
     */
    getDelta = () => this.lastDelta;

    /**
     * Updates the scenes objects and properties
     * 
     * @param {*} t Current time frame
     */
    update(t) {
        this.updateDelta(t);
        this.checkKeys();
        this.movmObject.update(t);
    }

    /**
     * Displays the scene objects
     */
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


        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        // his.incompleteSphere.display();

        //this.movmObject.display();
        this.pushMatrix();
        
        let cylinderScale = scaleMatrix(1,2,1);
        this.multMatrix(cylinderScale);
        
        this.cylinder.display();

        this.popMatrix();

        this.pushMatrix();


        const cameraOffset = translateMatrix(
            this.camera.position[0],
            this.camera.position[1],
            this.camera.position[2]);
        
        this.multMatrix(cameraOffset);

        let slMatrix = scaleMatrix(500,500,500);
        this.multMatrix(slMatrix);

        this.skybox.display();

        this.popMatrix();
        // ---- END Primitive drawing section
    }
}