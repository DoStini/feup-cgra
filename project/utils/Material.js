import { CGFappearance } from "../../lib/CGF.js";

/**
 * Material
 * @constructor
 * @param scene - Reference to MyScene object
 * @param mat - JSON Object containing information about the material (optional)
 */
export class Material {
    constructor(scene, mat, tex) {
        this.material = new CGFappearance(scene);
        if (mat)
            this.initMaterial(mat, tex);
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }


    initMaterial(mat, tex) {
        this.material.setAmbient(...this.hexToRgbA(mat.Ambient || 0));
        this.material.setDiffuse(...this.hexToRgbA(mat.Diffuse || 0));
        this.material.setSpecular(...this.hexToRgbA(mat.Specular || 0));
        if(mat.Emission) this.material.setEmission(...this.hexToRgbA(mat.Emission));
        this.material.setShininess(mat.Shininess);
        this.material.loadTexture(tex.tex);
        this.material.setTextureWrap(tex.SMODE, tex.TMODE);
    }

    updateMaterial(specular, diffuse, ambient, shininess) {
        this.material.setAmbient(...this.hexToRgbA(ambient));
        this.material.setDiffuse(...this.hexToRgbA(diffuse));
        this.material.setSpecular(...this.hexToRgbA(specular));
        this.material.setShininess(shininess);
    }

    getMaterial() {
        return this.material;
    }
}
