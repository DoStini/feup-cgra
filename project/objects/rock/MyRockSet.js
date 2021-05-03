import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import RockMaterial from "../../materials/rock/RockMaterial.js";
import { Material } from "../../utils/Material.js";
import { random } from "../../utils/math/MathUtils.js";
import { Vector3 } from "../../utils/Vector3.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param {Object} forbiddenArea - Object containing position, width and height {position: Vector3, area: number > 0}
     * @param  {integer} baseNumRocks - number of rocks
     * @param  {integer} threshold - variation of the number of rocks
     */
    constructor(scene, forbiddenArea, baseNumRocks, threshold, minLim, maxLim) {
        super(scene);
        this.scene = scene;
        this.forbiddenArea = forbiddenArea;
        this.numRocks = baseNumRocks + Math.round(random(-threshold, threshold));
        this.minLim = minLim;
        this.maxLim = maxLim;
        this.material = new Material(this.scene, RockMaterial);
        this.genRocks();
    }

    validPosition(p) {
        const side = Math.sqrt(this.forbiddenArea.area) / 2;
        const fPos = this.forbiddenArea.position;
        return !(p.x >= fPos.x - side && p.x <= fPos.x + side && p.z >= fPos.z - side && p.z <= fPos.z + side)
    } 
    genRocks() {
        this.rocks = new Array(this.numRocks).fill(0)
                        .map(_ => {
                            let pos = new Vector3().setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
                            while (!this.validPosition(pos)) {
                                pos = new Vector3().setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
                            }
                            return new MyRock(this.scene, 4, 4, pos,
                                            [random(0, 360),random(0, 360),random(0, 360)]);  
                        });
    }

    display() {
        this.material.safeApply();
        this.rocks.forEach(rock => rock.display());
    }
}
