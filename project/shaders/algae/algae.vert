attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec3 vVertexPosition;
uniform vec3 direction;
uniform float algaeTimeFactor;

void main(){
    vec3 vertex=aVertexPosition+sin(algaeTimeFactor)*direction*5.;
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

