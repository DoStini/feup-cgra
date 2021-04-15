import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        this.scene.gui = this;

        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed

        this.activeKeys = {};

    }

    processKeyDown(event) {

        // called when a key is pressed down

        // mark it as active in the array

        this.activeKeys[event.code] = true;

    };

    processKeyUp(event) {

        // called when a key is released, mark it as inactive in the array

        this.activeKeys[event.code] = false;

    };

    isKeyPressed(keyCode) {

        if (this.activeKeys[keyCode] === true &&

            (keyCode == "keyL" || keyCode == "keyP")) {

            this.activeKeys[keyCode] = false;

            return true;

        }

        return this.activeKeys[keyCode] || false;

    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        const controllable = this.gui.addFolder('Vehicle');
        controllable.add(this.scene.movmObject, 'accel', 0.5, 20).name('Acceleration');
        controllable.add(this.scene.movmObject, 'maxVelocity',0.5, 50).name('Max Velocity');
        controllable.add(this.scene.movmObject, 'rotSpeed', 0.1, 100).name('Rotation Speed');
        
        
        const cylinder = this.gui.addFolder('Cylinder');
        cylinder.add(this.scene.cylinder, 'slices',3, 50, 1).name('Slices')
            .onChange(this.scene.cylinder.updateSlices.bind(this.scene.cylinder));


        const scenePhysics = this.gui.addFolder('Scene Physics');
        scenePhysics.add(this.scene, 'dragCoefficient',0.0, 2.0).name('Drag Coefficient');
        scenePhysics.add(this.scene, 'useDrag').name('Use drag coefficient');

        //Checkbox element in GUI
        this.gui.add(this.scene, 'linearRender').name('Linear Render');

        const selectBox = this.gui.addFolder('Display Scene Objects');
        selectBox.add(this.scene, 'displayAxis').name('Display Axis');
        selectBox.add(this.scene, 'displayVehicle').name('Display Vehicle');
        selectBox.add(this.scene, 'displayCylinder').name('Display Cylinder');
        selectBox.add(this.scene, 'displaySphere').name('Display Sphere');
        selectBox.add(this.scene, 'displaySkybox').name('Display Skybox');

        const skybox = this.gui.addFolder('Skybox');
        skybox.add(this.scene.skybox, 'selectedTexture', this.scene.skybox.texNames).name('Skybox Texture')
            .onChange(this.scene.skybox.updateCubemap.bind(this.scene.skybox));
        this.initKeys();
        return true;
    }
}