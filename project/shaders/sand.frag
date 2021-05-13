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
    gl_FragColor=mix(color_filter, color, clamp(color_filter.r*uBlendMultiplier,0.,1.));
}
