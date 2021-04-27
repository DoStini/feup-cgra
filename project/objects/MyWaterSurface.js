import { CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "../shapes/MyPlane.js";

/**
 * MyWaterCeiling
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyWaterCeiling extends CGFobject {
    constructor(scene, divs) {
		super(scene);
        this.scene = scene;
        this.divs = divs;
        this.init();
	}


    init() {
        this.object = new MyPlane(this.scene, this.divs);
        this.texture = new CGFtexture(this.scene, "textures/water-ceil/pier.jpg");
        this.bump = new CGFtexture(this.scene, "textures/water-ceil/distortionmap.png");
        this.shader = new CGFshader(this.scene.gl, "shaders/water/water.vert", "shaders/water/water.frag");
    }

    update(t) {
        this.shader.setUniformsValues({
            timeFactor: t/1000
        });
    }

    display() {

        this.texture.bind(1);
        this.bump.bind(2);

        this.shader.setUniformsValues({
            uWaterSampler: 1,
            uWaterSampler2: 2,
        });

        this.scene.activeTexture = this.texture;
        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        this.object.display();
        this.scene.popMatrix();
 
        this.scene.activeTexture = null;
 
    }
}