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

    vertex.z += bumpColor.r*maxHeight - 0.5*maxHeight;

    vec4 gVertex = uMVMatrix*vec4(vertex,1.);
    //if(gVertex.y > 1.) gVertex.y = 1.;
    
    gl_Position=uPMatrix*gVertex;
}

