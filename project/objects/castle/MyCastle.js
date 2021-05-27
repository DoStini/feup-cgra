import { CGFobject } from "../../../lib/CGF.js";
import { MyQuad } from "../../shapes/MyQuad.js"
import { degreeToRad } from "../../utils/math/MathUtils.js";
import { translateMatrix, rotateYMatrix, mirrorYZ, mirrorXY, rotateXMatrix, scaleMatrix } from "../../utils/matrix/MatrixGenerator.js";
import { Material } from "../../utils/Material.js"
import { MyCylinder } from "../MyCylinder.js"
import CastleWall from "../../materials/castle/CastleWall.js";
import CastleRoof from "../../materials/castle/CastleRoof.js";
import { MyPlane } from "../../shapes/MyPlane.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyCone } from "./MyCone.js";
import { Vector3 } from "../../utils/Vector3.js"
import { MyRock } from "../rock/MyRock.js";
import DefaultMaterial from "../../materials/DefaultMaterial.js";

/**
 * MyCylindert
 * @constructor
 * @param scene - Reference to MyScene
 */

 export class MyCastle extends CGFobject { 
    constructor(scene, position, length) {
		super(scene);
        this.scene = scene;
        this.length = length;
        this.area = length*length;
        this.position = position;
        this.curRockIndex = 0;
        this.rockPositions = 40;
        this.init();
	}

    getArea = () => this.area;
    getCenterPosition = () => this.position;

    dropRock(/** @type {MyRock} */ rock) {
        if(this.curRockIndex >= this.rockPositions) return false;

        let newPosition = this.rockPositions[this.curRockIndex];

        rock.position = newPosition;
        rock.canPickup = false;

        this.curRockIndex++;

        return true;
    }

    init() {
        this.wallMat = new Material(this.scene, CastleWall, {
            tex: 'textures/castle/castleWall.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          });
        this.towerMat = new Material(this.scene, CastleWall, {
            tex: 'textures/castle/castleTower.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          } );
        this.doorMat = new Material(this.scene, CastleWall, {
            tex: 'textures/castle/castleDoor.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          } );
        this.roofMat = new Material(this.scene, CastleRoof, {
            tex: 'textures/castle/castle_roof.jpg',
            SMODE: 'REPEAT',
            TMODE: 'REPEAT',
          } );

        this.door = new MyUnitCube(this.scene, this.doorMat);
        this.towers = new Array(4).fill(0).map(_ => new MyCylinder(this.scene, 8, this.towerMat));
        this.walls = new Array(4).fill(0).map(_ => new MyUnitCube(this.scene, this.wallMat));
        this.roofs = new Array(4).fill(0).map(_ => new MyCone(this.scene, 8, 8, this.roofMat));

        this.rockPositions = new Array(this.rockPositions).fill(0).map(() => {
            let xLimit = [this.position.x - this.length/2.15, this.position.x + this.length/2.15];
            let zLimit = [this.position.z - this.length/2.15, this.position.z + this.length/2.15];
            let pos = new Vector3(0, 0.1, 0).setRandomX(xLimit[0], xLimit[1]).setRandomZ(zLimit[0], zLimit[1]);

            return pos;
        })
    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix(this.position.x,this.position.y,this.position.z));
        this.scene.multMatrix(scaleMatrix(this.length/10,this.length/10,this.length/10));

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

        this.scene.multMatrix(translateMatrix(0, wallHeight/2, 5+0.42));
        this.scene.multMatrix(scaleMatrix(2,wallHeight*0.9,0.5));
        this.door.display();

        this.scene.popMatrix();
    }
}