#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

    float filter =  color.r * 0.299 + color.g *0.587 + color.b * 0.114;
    vec4 fragColor = vec4(filter, filter, filter, 1.0);
	gl_FragColor = fragColor;
}