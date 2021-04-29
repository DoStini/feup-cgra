import { CGFobject } from "../../../lib/CGF.js";
import { MyQuad } from "../../shapes/MyQuad.js"
import { degreeToRad } from "../../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../../utils/matrix/MatrixGenerator.js";
import { Material } from "../../utils/Material.js"
import { MyCylinder } from "../MyCylinder.js"
import CastleWall from "../../materials/castle/CastleWall.js";
import { MyPlane } from "../../shapes/MyPlane.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyCone } from "./MyCone.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene
 */

 export class MyCastle extends CGFobject { 
    constructor(scene, length) {
		super(scene);
        this.scene = scene;
        this.length = length;
        this.init();
	}

    init() {
        this.wallMat = new Material(this.scene, CastleWall, {
            tex: '/project/textures/castleWall.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          });
        this.towerMat = new Material(this.scene, CastleWall, {
            tex: '/project/textures/castleTower.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          } );
        this.doorMat = new Material(this.scene, CastleWall, {
            tex: '/project/textures/castleDoor.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          } );
        this.towers = new Array(4).fill(0).map(_ => new MyCylinder(this.scene, 8, this.towerMat));
        console.log(this.towers);
        this.walls = new Array(4).fill(0).map(_ => new MyUnitCube(this.scene, this.wallMat));
        this.roofs = new Array(4).fill(0).map(_ => new MyCone(this.scene, 8, 8));
    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(scaleMatrix(this.length/5,this.length/5,this.length/5));

        let idx = 0;
        const towerHeight = 7.;
        for (let i = -1; i <= 1; i+=2) {
            for (let j = -1; j <= 1; j+=2) {
                this.scene.pushMatrix();
                
                this.scene.multMatrix(translateMatrix(5*i,0,5*j));
                this.scene.pushMatrix();

                this.scene.multMatrix(scaleMatrix(1.5, towerHeight, 1.5));
                this.towers[idx].display();

                this.scene.popMatrix();

                //this.scene.pushMatrix();
                this.scene.multMatrix(translateMatrix(0, towerHeight*0.95, 0));
                this.scene.multMatrix(scaleMatrix(1.75, 0.4*towerHeight, 1.75));
                this.roofs[idx].display();
                //this.scene.popMatrix();

                this.scene.popMatrix();
                idx++;
            }
        }

        const wallHeight = towerHeight-1.5;
        for (let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            
            this.scene.multMatrix(rotateYMatrix(degreeToRad(90*i)));
            this.scene.multMatrix(translateMatrix(0,wallHeight/2,5));
            this.scene.multMatrix(scaleMatrix(10, wallHeight, 0.8)); // isto sao as parededs
            this.walls[i].display();

            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}