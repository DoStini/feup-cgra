import { CGFobject, CGFshader, CGFtexture } from "../../../lib/CGF.js";
import { Vector3 } from "../../utils/Vector3.js";

export class MyStackablePyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }


    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var alphaAng = 2*Math.PI/this.slices;
        
        var height = 0;
        var heightInc = 1/(this.stacks-1);

        for (let j = 0; j < this.stacks; j++) {
            var ang = 0;
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different
    
                var factor = 1-height;

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca*factor, height, -sa*factor);
                this.vertices.push(caa*factor, height, -saa*factor);

                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    ca*saa-sa*caa,
                    caa-ca
                ];
    
                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;
    
                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);

                if (j > 0) {
                    if (j < this.stacks-1) {
                        this.indices.push(2*(j*this.slices+i), 2*((j-1)*this.slices+i), 2*(j*this.slices+i)+1);
                    }
                    this.indices.push(2*(j*this.slices+i)+1, 2*((j-1)*this.slices+i), 2*((j-1)*this.slices+i)+1);
                }

                ang+=alphaAng;
            }
            height += heightInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
