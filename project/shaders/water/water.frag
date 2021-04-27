#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uWaterSampler;
uniform sampler2D uWaterSampler2;
uniform float timeFactor;

void main() {

    vec2 texCoord = vTextureCoord -0.5;

	vec4 color = texture2D(uWaterSampler, vTextureCoord);
	vec4 mask = texture2D(uWaterSampler2, texCoord);

    vec2 limits = vec2(-0.5, 0.5);
    float m = limits.y/limits.x;
    vec2 offset = m*vec2(mask.r-0.5, mask.g-0.5);
    texCoord = vTextureCoord + offset;

    if (texCoord.y < 0.0) texCoord.y = 0.0;
    if (texCoord.x < 0.0) texCoord.x = 0.0;
    if (texCoord.x > 1.0) texCoord.x = 1.0;
    if (texCoord.y > 1.0) texCoord.y = 1.0;

    color = texture2D(uWaterSampler, texCoord);

    // color = vec4(vTextureCoord, 0.5, 1.);
	gl_FragColor = color;
}
