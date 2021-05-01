import { CGFappearance } from "../../lib/CGF.js";

/**
 * Material
 * @constructor
 * @param scene - Reference to MyScene object
 * @param mat - JSON Object containing information about the material (optional)
 * @param tex - JSON Object containing information about the texture (optional)
 */
export class Material {
    constructor(scene, mat, tex) {
        this.material = new CGFappearance(scene);
        this.tex = tex;
        this.scene = scene;
        if (mat)
            this.initMaterial(mat, tex);
    }

    hexToRgbA(hex)
    {
        var ret;
        if(hex === 0) hex = "#000000";
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
        this.material.setEmission(...this.hexToRgbA(mat.Emission || 0));
        this.material.setShininess(mat.Shininess);
        if(tex) {
            this.material.loadTexture(tex.tex);
            this.material.setTextureWrap(tex.SMODE, tex.TMODE);
        }
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

    safeApply() {
        if(this.tex)  {
            if(this.material.texture.texID != -1) {
                this.material.apply();

                if (!this.scene.linearRender)
                    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
                else
                    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
            }
        } else {
            this.material.apply();
        }
    }
}
