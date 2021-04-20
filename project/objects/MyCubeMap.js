import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../shapes/MyQuad.js"
import { degreeToRad } from "../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../utils/matrix/MatrixGenerator.js";
import { Material } from "../utils/Material.js"
import CubeMaterial from "../materials/cubemap/CubeMaterial.js"
import SpaceCubemap from "../images/cubemaps/space/SpaceCubemap.js";
import MountainCubemap from "../images/cubemaps/mountain/MountainCubemap.js";
import DemoCubemap from "../images/cubemaps/demo_cubemap/DemoCubemap.js";
import { CubemapTexture } from "../utils/CubemapTexture.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyCubeMap extends CGFobject {
    constructor(scene) {
		super(scene);
        this.scene = scene;
        this.init();
	}

    loadCubemaps() {
        this.texNames = {
            'Space': 0,
            'Mountain': 1,
            'Valley': 2,
        };
        this.cubemaps = [
            new CubemapTexture(this.scene, SpaceCubemap.textures, CubeMaterial),
            new CubemapTexture(this.scene, MountainCubemap.textures, CubeMaterial),
            new CubemapTexture(this.scene, DemoCubemap.textures, CubeMaterial),
        ];
    }

    updateCubemap(index) {
        this.texture = this.cubemaps[index];
    }

    init() {
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.botQuad = new MyQuad(this.scene);
        this.selectedTexture = 0;
        this.loadCubemaps();
        this.updateCubemap(0);
    }

    // Sets default if tex undefined
    safeApply(tex) {
        if (!tex) {
            if (this.scene.defaultMaterial) this.scene.defaultMaterial.apply();
        } else if(tex.getMaterial().texture.texID != -1)  {
            tex.getMaterial().apply();

            if (!this.scene.linearRender)
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

    display() {
        this.scene.pushMatrix();

        // Matrices used to invert the cube surface to the inside
        const inv = mirrorYZ();
        const rot2Matrix = rotateYMatrix(degreeToRad(180));

        let slMatrix = scaleMatrix(1.001,1.001,1.001);
        
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            
            this.scene.pushMatrix();
            
                this.scene.multMatrix(inv);
                this.safeApply(this.texture.backTex);

                this.scene.multMatrix(slMatrix);
                this.backQuad.display();
                
             this.scene.popMatrix();

            tMatrix = translateMatrix(0,0,-1);

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(slMatrix);

            this.safeApply(this.texture.frontTex);    
            this.frontQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, -0.5, 0);
            let rotMatrix = rotateXMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rot2Matrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);
            this.scene.multMatrix(slMatrix);
            
            this.safeApply(this.texture.bottomTex);
            this.botQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, 0.5, 0);
            rotMatrix = rotateXMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rot2Matrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);
            this.scene.multMatrix(slMatrix);

            this.safeApply(this.texture.topTex);
            this.topQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);
            this.scene.multMatrix(slMatrix);

            this.safeApply(this.texture.rightTex);
            this.rightQuad.display();


        this.scene.popMatrix();


        this.scene.pushMatrix();

            tMatrix = translateMatrix(-0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);
            this.scene.multMatrix(slMatrix);

            this.safeApply(this.texture.leftTex);
            this.leftQuad.display();


        this.scene.popMatrix();
        
        let sclMatrix = scaleMatrix(0,0,-1);
        this.scene.multMatrix(sclMatrix);

        this.scene.popMatrix();
    }
}