import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../../lib/CGF.js";
import { MyPyramid } from "../Objects/MyPyramid.js";
import { MyCone } from "../Objects/MyCone.js";
import { MyPlane } from "../Shapes/MyPlane.js";
import { MyTangram } from "../Shapes/MyTangram.js";
import { MyUnitCube } from "../Objects/MyUnitCube.js";
import { Material } from "../Materials/Material.js";
import material1Values from "../Materials/Material1.js";
import material2Values  from "../Materials/Material2.js"
import material3Values  from "../Materials/Material3.js"
import materialWoodValues  from "../Materials/WoodMaterial.js"

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.ambientIntensity = 0.3;

        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 5);
        this.cone = new MyCone(this, 3, 1);
        this.pyramid = new MyPyramid(this, 3, 1);
        this.tangram = new MyTangram(this);
        this.cube = new MyUnitCube(this);

        this.objects = [
            this.plane, 
            this.pyramid, 
            this.cone,
            this.tangram,
            this.cube,
        ];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = {
            'Plane': 0 , 
            'Pyramid': 1, 
            'Cone': 2,
            'Tangram' : 3,
            'Cube': 4,
        };

        //Other variables connected to MyInterface
        this.selectedObject = 4;
        this.selectedMaterial = 0;
        this.displayAxis = true;
        this.displayNormals = true;
        this.objectComplexity = 0.5;
        this.scaleFactor = 2.0;
    }
    initLights() {
        this.setGlobalAmbientLight(this.ambientIntensity, this.ambientIntensity, this.ambientIntensity, 1.0);
        
        this.lights[0].setPosition(2.0, 2.0, -1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].disable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(0.0, -1.0, 2.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].disable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }

    updateCustomMaterial() {
        this.customMaterial.updateMaterial(
            this.customMaterialValues.Specular,
            this.customMaterialValues.Diffuse,
            this.customMaterialValues.Ambient,
            this.customMaterialValues.Shininess
        );
    };

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }

    updateAmbientIntensity() {
        this.setGlobalAmbientLight(this.ambientIntensity, this.ambientIntensity, this.ambientIntensity, 1.0);
    }


    initMaterials() {
        // Custom material (can be changed in the interface)
        // initially midrange values on ambient, diffuse and specular, on R, G and B respectively
        this.material1 = new Material(this, material1Values);
        this.material2 = new Material(this, material2Values);
        this.material3 = new Material(this, material3Values);
        this.woodMaterial = new Material(this, materialWoodValues);

        
        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.customMaterial = new Material(this);

        this.updateCustomMaterial();

        this.materials = [
            this.material1, 
            this.material2,
            this.material3, 
            this.woodMaterial, 
            this.customMaterial
        ];
            

        // Labels and ID's for object selection on MyInterface
        this.materialIDs = {
            'Red Ambient': 0, 
            'Red Diffuse': 1, 
            'Red Specular': 2, 
            'Wood': 3, 
            'Custom': 4 
        };
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.lights[0].update();
        this.lights[1].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.materials[this.selectedMaterial].getMaterial().apply();

        this.pushMatrix();
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        
        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        this.objects[this.selectedObject].display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}