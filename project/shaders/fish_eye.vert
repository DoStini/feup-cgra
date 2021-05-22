attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vVertexPosition;

void main(){
    vec3 vertex=aVertexPosition;
    vVertexPosition=vertex;
    
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

