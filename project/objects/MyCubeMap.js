import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../shapes/MyQuad.js"
import { degreeToRad } from "../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../utils/matrix/MatrixGenerator.js";
import { Material } from "../utils/Material.js"
import CubeMaterial from "../materials/cubemap/CubeMaterial.js"

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene
 */

export class MyCubeMap extends CGFobject {
    constructor(scene) {
		super(scene);
        this.scene = scene;
        this.init()
	}

    init() {
        this.frontQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.leftQuad = new MyQuad(this.scene);
        this.rightQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.botQuad = new MyQuad(this.scene);

        this.topTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/py.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.frontTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/pz.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.rightTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/px.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.backTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/nz.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.leftTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/nx.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.bottomTex = new Material(this.scene, CubeMaterial, {
          tex: 'images/test_cubemap/ny.png',
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });

    }

    // Sets default if tex undefined
    safeApply(tex) {
        if (!tex) {
            if (this.scene.defaultMaterial) this.scene.defaultMaterial.apply();
        } else {
            tex.getMaterial().apply();
        }

        if (!this.scene.linear)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    }

    display() {
        this.scene.pushMatrix();

        // Matrices used to invert the cube surface to the inside
        const inv = mirrorYZ();
        const rot2Matrix = rotateYMatrix(degreeToRad(180));

        let slMatrix = scaleMatrix(50,50,50);
        this.scene.multMatrix(slMatrix);
        
        this.scene.pushMatrix();

            let tMatrix = translateMatrix(0,0,0.5);
            
            this.scene.multMatrix(tMatrix);
            
            this.scene.pushMatrix();
            
                this.scene.multMatrix(inv);
                
                this.safeApply(this.frontTex);
                this.frontQuad.display();
                
             this.scene.popMatrix();

            tMatrix = translateMatrix(0,0,-1);

            this.scene.multMatrix(tMatrix);
            this.safeApply(this.backTex);            
            this.backQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, -0.5, 0);
            let rotMatrix = rotateXMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rot2Matrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);
            
            this.safeApply(this.bottomTex);
            this.botQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0, 0.5, 0);
            rotMatrix = rotateXMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rot2Matrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);

            this.safeApply(this.topTex);
            this.topQuad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

            tMatrix = translateMatrix(0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);

            this.safeApply(this.rightTex);
            this.rightQuad.display();


        this.scene.popMatrix();


        this.scene.pushMatrix();

            tMatrix = translateMatrix(-0.5, 0, 0);
            rotMatrix = rotateYMatrix(degreeToRad(-90));

            this.scene.multMatrix(tMatrix);
            this.scene.multMatrix(rotMatrix);
            this.scene.multMatrix(inv);

            this.safeApply(this.leftTex);
            this.leftQuad.display();


        this.scene.popMatrix();
        
        let sclMatrix = scaleMatrix(0,0,-1);
        this.scene.multMatrix(sclMatrix);

        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
        [
            this.frontQuad ,
            this.backQuad,
            this.leftQuad,
            this.rightQuad,
            this.topQuad,
            this.botQuad,
        ].forEach(quad => quad.updateTexCoords(coords))
	}
}