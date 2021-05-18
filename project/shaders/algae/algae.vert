attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec3 vVertexPosition;
uniform vec3 direction;
uniform float algaeTimeFactor;
uniform float variance;
uniform float speed;

float displacement(float x){
    return.9976489*pow(x,4.215844);
}

void main(){
    vec3 vertex=aVertexPosition;
    vertex+=variance*2.*sin(algaeTimeFactor/speed)*direction*displacement(aVertexPosition.y)*.5;
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

