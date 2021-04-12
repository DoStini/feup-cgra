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

        const scenePhysics = this.gui.addFolder('Scene Physics');
        scenePhysics.add(this.scene, 'dragCoefficient',0.0, 2.0).name('Drag Coefficient');
        scenePhysics.add(this.scene, 'useDrag').name('Use drag coefficient');

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.initKeys();
        return true;
    }
}