attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float normScale;

uniform float timeFactor;

void main(){
    vec3 vertex=aVertexPosition;
    vTextureCoord=aTextureCoord;
    float new_time=timeFactor*.01;
    
    vec2 offset=vec2(new_time,new_time);
    vTextureCoord+=offset;
    
    vec4 texture=texture2D(uSampler2,vTextureCoord);
    vertex.z+=normScale*.005*texture.r;
    
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
    
}

