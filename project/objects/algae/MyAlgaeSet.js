import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import AlgaeMaterial from "../../materials/algae/AlgaeMaterial.js";
import { Material } from "../../utils/Material.js";
import { random } from "../../utils/math/MathUtils.js";
import { Vector3 } from "../../utils/Vector3.js";
import { MyAlgae } from "./MyAlgae.js";

export class MyAlgaeSet extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param {Object} forbiddenArea - Object containing position, width and height {position: Vector3, area: number > 0}
     * @param  {integer} baseNumAlgae - number of algae
     * @param  {integer} threshold - variation of the number of algae
     */
    constructor(scene, forbiddenArea, baseNumAlgae, threshold, minLim, maxLim) {
        super(scene);
        this.scene = scene;
        this.forbiddenArea = forbiddenArea;
        this.numAlgae = baseNumAlgae + Math.round(random(-threshold, threshold));
        this.minLim = minLim;
        this.maxLim = maxLim;
        this.algaePerGroup = 5;
        this.algaeRadius = 0.2;
        this.material = new Material(this.scene, AlgaeMaterial);
        this.genAlgae();
    }

    validPosition(p) {
        const side = Math.sqrt(this.forbiddenArea.area) / 2;
        const fPos = this.forbiddenArea.position;
        return !(p.x >= fPos.x - side && p.x <= fPos.x + side && p.z >= fPos.z - side && p.z <= fPos.z + side)
    } 

    genAlgae() {
        this.algae = new Array();

        for(let i = 0; i < this.numAlgae; i++) {
            let algaeGroup = Math.round(random(1, this.algaePerGroup));

            let pos = new Vector3().setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
            while (!this.validPosition(pos)) {
                pos = new Vector3().setRandomX(this.minLim, this.maxLim).setRandomZ(this.minLim, this.maxLim);
            }

            for(let j = 0; j < algaeGroup; j++) {
                let singlePos = new Vector3().setRandomX(pos.x-this.algaeRadius, pos.x+this.algaeRadius).setRandomZ(pos.z-this.algaeRadius, pos.z+this.algaeRadius);
                while (!this.validPosition(singlePos) || singlePos.x < this.minLim || singlePos.x > this.maxLim || singlePos.z < this.minLim || singlePos.z > this.maxLim) {
                    singlePos = new Vector3().setRandomX(pos.x-this.algaeRadius, pos.x+this.algaeRadius).setRandomZ(pos.z-this.algaeRadius, pos.z+this.algaeRadius);
                }
                
                this.algae.push(new MyAlgae(this.scene, singlePos));
            }
        }
    }

    display() {
        this.material.safeApply();
        this.algae.forEach(algae_ => algae_.display());
    }
}
