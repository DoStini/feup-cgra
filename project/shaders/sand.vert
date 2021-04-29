attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSandSampler;
uniform sampler2D uSandBumpSampler;
uniform float uDisplacement;
uniform float uMaxHeight;

void main(){
    vec3 vertex=aVertexPosition;
    vTextureCoord=aTextureCoord;
    vVertexPosition=aVertexPosition;

    vec4 bumpColor = texture2D(uSandBumpSampler, vTextureCoord);

    //float displacement = uDisplacement * 2.; // beacause we remove half of the displacement to keep the floor in the same height when applying the bump map, we mult by 2 to keep the displacement value.
    //vertex.z += bumpColor.r*displacement - 0.5*displacement;
    vertex.z = bumpColor.r*2. - 1.; // normalizes the displacement so the object doesn't move 
    vertex.z *= uDisplacement;
    
    if(vertex.z > uMaxHeight) vertex.z = uMaxHeight;
    if(vertex.z < -uMaxHeight) vertex.z = -uMaxHeight;

    //vec4 gVertex = uMVMatrix*vec4(vertex,1.);
    //if(gVertex.y > 1.) vertex.y = 1.;
    
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

