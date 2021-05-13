#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSandSampler;
uniform sampler2D uSandBumpSampler;
uniform float uBlendMultiplier;

void main(){
    vec4 color=texture2D(uSandSampler,vTextureCoord);
    vec4 color_filter=texture2D(uSandBumpSampler,vTextureCoord);
    
    // enhance the blacks of the bump map, diminish the whites of the bump map, giving more weight to the original texture
    float split= clamp(color_filter.r*uBlendMultiplier,0.,1.);
    
    color=split*color+(1.-split)*color_filter;
    
    gl_FragColor=color;
}
