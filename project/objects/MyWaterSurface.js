import { CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "../shapes/MyPlane.js";
import { rotateXMatrix, rotateYMatrix, scaleMatrix, translateMatrix } from "../utils/matrix/MatrixGenerator.js"
import { degreeToRad } from "../utils/math/MathUtils.js"

/**
 * MyWaterCeiling
 * @constructor
 * @param scene - Reference to MyScene
 * @param divs - Number of divisions of the plane
 */

export class MyWaterCeiling extends CGFobject {
    constructor(scene, divs) {
		super(scene);
        this.scene = scene;
        this.divs = divs;
        this.distortion = 0.5;
        this.init();
	}


    init() {
        this.speed = 1.0;
        this.object = new MyPlane(this.scene, this.divs);
        this.texture = new CGFtexture(this.scene, "textures/water-ceil/pier.jpg");
        this.bump = new CGFtexture(this.scene, "textures/water-ceil/distortionmap.png");
        this.shader = new CGFshader(this.scene.gl, "shaders/water/water.vert", "shaders/water/water.frag");
    }

    update(t) {
        this.shader.setUniformsValues({
            timeFactor: t*this.speed/100000%1,
        });
    }

    display() {

        this.texture.bind(1);
        this.bump.bind(2);

        this.shader.setUniformsValues({
            uWaterSampler: 1,
            uWaterSampler2: 2,
            weight: this.distortion
        });

        this.scene.activeTexture = this.texture;
        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(0,10,0));
        this.scene.multMatrix(rotateXMatrix(degreeToRad(90)));
        this.scene.multMatrix(scaleMatrix(50,50,50));
        this.object.display();
        this.scene.popMatrix();
 
        this.scene.activeTexture = null;
 
    }
}