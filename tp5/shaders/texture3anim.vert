
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main(){
    vec3 v_offset=vec3(0.,0.,0.);
    vec3 h_offset=vec3(0.,0.,0.);
    
    vTextureCoord=aTextureCoord;
    
    if(texture2D(uSampler2,vec2(0.,.1)+vTextureCoord).b>.5)
    v_offset=aVertexNormal*normScale*.1*sin(timeFactor);
    h_offset.x=.5*normScale*sin(timeFactor);
    
    gl_Position=uPMatrix*uMVMatrix*vec4(aVertexPosition+v_offset+h_offset,1.);
}

