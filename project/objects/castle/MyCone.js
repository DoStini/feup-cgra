import {CGFobject} from '../../../lib/CGF.js';
import { Material } from "../../utils/Material.js"

/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, material) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.material = material;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices + 1; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices+i+1);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.texCoords.push((this.slices-i)/this.slices,0);
            this.texCoords.push((this.slices-i)/this.slices,1);

            ang+=alphaAng;
        }
        for(var i = 0; i < this.slices+1; i++){
            this.vertices.push(0,1,0);
            this.normals.push(0,1,0);
            
            ang+=alphaAng;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    display() {
        //console.log(this.scene.activeShader.getUniformsValues());
        this.material.safeApply();
        //console.log(this.scene.activeShader.getUniformsValues());
        super.display();
    }
}


