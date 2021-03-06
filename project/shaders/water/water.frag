#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uWaterSampler;
uniform sampler2D uWaterSampler2;
uniform float timeFactor;
uniform float weight;

vec2 offset(vec4 mask, vec2 limits) {
    float m = limits.y - limits.x;
    float b = limits.x;
    return vec2(m*mask.r+b, m*mask.g+b);
}

void main() {

    vec2 texCoord = vTextureCoord + timeFactor;

	vec4 color = texture2D(uWaterSampler, vTextureCoord);
	vec4 mask = texture2D(uWaterSampler2, texCoord);

    vec2 limits = vec2(-0.5, 0.5);
    texCoord = vTextureCoord + weight*offset(mask, limits);

    texCoord = abs(min(texCoord, 2.0 - texCoord));

    color = texture2D(uWaterSampler, texCoord);
	gl_FragColor = color;
}
