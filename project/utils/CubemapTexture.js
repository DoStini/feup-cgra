/**
 * CubemapTexture
 * @constructor
 * @param scene - Reference to MyScene
 * @param textures - List of paths to cubemap textures
 * @param cubeMaterial - Material of the cube
 */

import { Material } from "./Material.js";

 export class CubemapTexture {
    constructor(scene, textures, cubeMaterial) {
        this.scene = scene;
        this.init(textures, cubeMaterial);
	}
    
    init(textures, cubeMaterial) {
        this.topTex = new Material(this.scene, cubeMaterial, {
          tex: textures[0],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.frontTex = new Material(this.scene, cubeMaterial, {
          tex: textures[1],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.rightTex = new Material(this.scene, cubeMaterial, {
          tex: textures[2],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.backTex = new Material(this.scene, cubeMaterial, {
          tex: textures[3],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.leftTex = new Material(this.scene, cubeMaterial, {
          tex: textures[4],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
        this.bottomTex = new Material(this.scene, cubeMaterial, {
          tex: textures[5],
          SMODE: 'REPEAT',
          TMODE: 'REPEAT',
        });
    }

 }