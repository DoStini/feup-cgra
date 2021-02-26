import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'showTangram').name('Show Tangram');

        this.gui.add(this.scene.myTangram, 'showBody').name('Show Body');
        this.gui.add(this.scene.myTangram, 'showBackLeg').name('Show Back Leg');
        this.gui.add(this.scene.myTangram, 'showFrontLeg').name('Show Front Leg');
        this.gui.add(this.scene.myTangram, 'showTail').name('Show Tail');
        this.gui.add(this.scene.myTangram, 'showHead').name('Show Head');
        this.gui.add(this.scene.myTangram, 'showLeftEar').name('Show Left Ear');
        this.gui.add(this.scene.myTangram, 'showRightEar').name('Show Right Ear');

        return true;
    }
}