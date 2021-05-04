attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

void main(){
    vec3 vertex=aVertexPosition;
    vTextureCoord=aTextureCoord;
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
    
}
