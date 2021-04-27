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
uniform float maxHeight;

void main(){
    vec3 vertex=aVertexPosition;
    vTextureCoord=aTextureCoord;
    vVertexPosition=aVertexPosition;

    vec4 bumpColor = texture2D(uSandBumpSampler, vTextureCoord);

    vertex.z += bumpColor.r*0.03*maxHeight - 0.015*maxHeight;
    
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

