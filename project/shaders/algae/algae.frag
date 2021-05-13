#ifdef GL_ES
precision highp float;
#endif

uniform vec4 algaeColor;

void main() {
	gl_FragColor = algaeColor;
}
