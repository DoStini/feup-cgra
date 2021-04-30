import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import RockMaterial from "../../materials/rock/RockMaterial.js";
import { Material } from "../../utils/Material.js";
import { random } from "../../utils/math/MathUtils.js";
import { Vector3 } from "../../utils/Vector3.js";
import { MyRock } from "./MyRock..js";

export class MyRockSet extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} baseNumRocks - number of rocks
     * @param  {integer} threshold - variation of the number of rocks
     */
    constructor(scene, baseNumRocks, threshold) {
        super(scene);
        this.scene = scene;
        this.numRocks = baseNumRocks + Math.floor(Math.random() * -threshold) + threshold;
        this.genRocks();
    }

    genRocks() {
        this.rocks = new Array(this.numRocks).fill(0)
                        .map(_ => new MyRock(this.scene, 16, 8, 
                            new Vector3().setRandomX(-50, 50).setRandomZ(-50, 50),
                            [random(0, 360),random(0, 360),random(0, 360)]));
    }

    getRandom = () => Math.floor(Math.random() * this.maxRand) + this.minRand;

    display() {
        this.rocks.forEach(rock => rock.display());
    }
}
