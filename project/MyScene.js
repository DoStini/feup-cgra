import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyMovingObject } from "./objects/MyMovingObject.js";
import { MyPyramid } from "./objects/MyPyramid.js";
import { MySphere } from "./objects/MySphere.js";
import { MyCubeMap } from "./objects/MyCubeMap.js";
import { MyQuad } from "./shapes/MyQuad.js";
import { Vector3 } from "./utils/Vector3.js";
import { mirrorXY, mirrorYZ, rotateYMatrix, scaleMatrix, translateMatrix } from "./utils/matrix/MatrixGenerator.js";
import { MyCylinder } from "./objects/MyCylinder.js";
import { Material } from "./utils/Material.js";
import DefaultMaterial from "./materials/DefaultMaterial.js";
import { MyFish } from "./objects/fish/MyFish.js";
import { degreeToRad } from "./utils/math/MathUtils.js";
import { MySandFloor } from "./shapes/MySandFloor.js";
import { MyCastle } from "./objects/castle/MyCastle.js";
import { MyWaterCeiling } from "./objects/MyWaterSurface.js";

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
        this.movmObject.checkKeys(this.lastDelta);

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
        this.sphere = new MySphere(this, 16, 16);
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
            0, 0, new Vector3(0, 0, -0.5));

        this.sandFloor = new MySandFloor(this, 30, 4, 50);
        this.castle = new MyCastle(this, new Vector3(-2, 0, -2), 2);

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.defaultAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.defaultAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.defaultAppearance.setShininess(120);

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture('textures/earth.jpg');

        this.fishTex = new CGFtexture(this, "textures/fish_texture.jpg"); // https://gumroad.com/juliosillet?sort=page_layout#ufEtG

        this.fishBodyShader = new CGFshader(this.gl, "shaders/fish_body.vert", "shaders/fish_body.frag");
        this.fishEyeShader = new CGFshader(this.gl, "shaders/fish_eye.vert", "shaders/fish_eye.frag");
        
        const fishColor = [237 / 255, 165 / 255, 21 / 255, 1.0];

        this.fishBodyShader.setUniformsValues({ uSampler2: 2, uColor: fishColor });
        this.fish = new MyFish(this, this.fishBodyShader, this.fishEyeShader, fishColor, this.fishTex, 0.5, 0.2, 0.30, new Vector3(0, 3, 0));

        this.waterCeiling = new MyWaterCeiling(this, 20);

        this.linearRender = true;

        this.initDelta();
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.dragCoefficient = 0.5;
        this.speedFactor = 1;
        this.useDrag = false;
        this.displayVehicle = false;
        this.displayFish = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displaySkybox = true;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.75, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
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
     * lastDelta is the last delta time between updates according to the timeFactor
     * lastPhysicsUpdate is the last update that takes in consideration timeFactor. We shall use this for animations
     * lastFixedUpdate is the real last update value so that the calculation of delta time is accurate
     * 
     * @param {*} t Current timeframe
     */
    updateDelta(t) {
        const delta = (t - this.lastFixedUpdate) * this.speedFactor;
        this.lastDelta = delta / 1000;
        this.lastPhysicsUpdate += delta;
        this.lastFixedUpdate = t;
    }

    /**
     * Initializes auxiliary variables to use with update delta time 
     */
    initDelta() {
        this.lastFixedUpdate = Date.now();
        this.lastPhysicsUpdate = this.lastFixedUpdate;
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
        this.movmObject.update(this.lastPhysicsUpdate, this.lastDelta);
        this.fish.update(this.lastPhysicsUpdate, this.lastDelta);
        this.waterCeiling.update(this.lastPhysicsUpdate);
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

        this.lights[0].update();

        this.fishTex.bind(2);

        this.defaultAppearance.apply();
        
        if (this.displayFish) {
            
            this.fish.display();
        }
        
        this.waterCeiling.display();
        
        this.setActiveShader(this.defaultShader);

        this.sandFloor.display();

        this.castle.display();

        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        if (this.displaySphere) {
            this.sphereAppearance.apply();
            this.sphere.display();
        }

        if (this.displayVehicle) {
            this.defaultAppearance.apply();

            this.movmObject.display();
        }

        if (this.displayCylinder) {
            this.pushMatrix();

            // let cylinderScale = scaleMatrix(1,2,1);
            // this.multMatrix(cylinderScale);

            this.cylinder.display();

            this.popMatrix();
        }

        if (this.displaySkybox) {
            this.pushMatrix();

            const cameraOffset = translateMatrix(
                this.camera.position[0],
                this.camera.position[1],
                this.camera.position[2]);

            this.multMatrix(cameraOffset);

            let slMatrix = scaleMatrix(500, 500, 500);
            this.multMatrix(slMatrix);

            this.skybox.display();

            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }
}
