#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSandSampler;
uniform sampler2D uSandBumpSampler;
uniform float maxHeight;

void main(){
    vec4 color=texture2D(uSandSampler,vTextureCoord);
    vec4 color_filter=texture2D(uSandBumpSampler,vTextureCoord);
    
    float split=color_filter.r*1.4;
    if(split>1.)split=1.;
    
    color=split*color+(1.-split)*color_filter;
    
    gl_FragColor=color;
}
