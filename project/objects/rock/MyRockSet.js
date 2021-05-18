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
     * @param  {integer} baseNumRocks - number of 
     * @param  {integer} threshold - variation of the number of rocks
     * @param {integer} slices - Number of slices of the rocks
     * @param {integer} stacks - Number of stacks of the rocks
     */
    constructor(scene, forbiddenArea, baseNumRocks, threshold, slices, stacks, minLim, maxLim, rockSizeFactor, minRandom, maxRandom) {
        super(scene);
        this.scene = scene;
        this.forbiddenArea = forbiddenArea;
        this.numRocks = baseNumRocks + Math.round(random(-threshold, threshold));
        this.minLim = minLim;
        this.maxLim = maxLim;
        this.slices = slices;
        this.stacks = stacks;
        this.material = new Material(this.scene, RockMaterial);
        this.rockSizeFactor = rockSizeFactor || 1;
        this.minRandom = minRandom || 0.7;
        this.maxRandom = maxRandom || 1.0;
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
                            let pos = new Vector3(0, 0.1, 0).setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
                            while (!this.validPosition(pos)) {
                                pos = new Vector3(0, 0.1, 0).setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
                            }
                            return new MyRock(this.scene, this.slices, this.stacks, pos,
                                            [random(0, 360),random(0, 360),random(0, 360)], this.rockSizeFactor, this.minRandom, this.maxRandom);
                        });
    }

    display() {
        this.material.safeApply();
        this.rocks.forEach(rock => rock.display());
    }
}
