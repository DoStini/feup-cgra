attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying float y_value;
varying vec4 coords;

void main(){
    gl_Position=uPMatrix*uMVMatrix*vec4(aVertexPosition,1.);
    coords=vec4(aVertexPosition,1.);
    y_value=gl_Position.y;
}

