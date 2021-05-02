import { CGFobject } from "../../lib/CGF.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../utils/matrix/MatrixGenerator.js";
import { Material } from "../utils/Material.js"
import DefaultMaterial from "../materials/DefaultMaterial.js";
import { MyCylinder } from "./MyCylinder.js";
import PillarMaterial from "../materials/pillar/PillarMaterial.js";

/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyPillar extends CGFobject {
    constructor(scene, position, radius, height) {
		super(scene);
        this.scene = scene;
        this.position = position;
        this.radius = radius;
        this.height = height;
        this.material = new Material(scene, PillarMaterial,{
            tex: '/project/textures/wood_moss.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
        }); // Texture from https://texturehaven.com/tex/?t=wooden_rough_planks
        this.elem = new MyCylinder(scene, 32, this.material);
	}

    display() {
        this.scene.pushMatrix();

        this.scene.multMatrix(translateMatrix(this.position.x, this.position.y, this.position.z));
        this.scene.multMatrix(scaleMatrix(this.radius, this.height, this.radius));
        this.elem.display();        
        
        this.scene.popMatrix();
    }
}