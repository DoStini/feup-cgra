#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 color_filter = texture2D(uSampler2, vTextureCoord);
	float split = 0.80;
	color.rgb *= split;
	color += (vec4(1.0,1.0,1.0,2.0) - color_filter)*(1.-split);
	gl_FragColor = color;
}
