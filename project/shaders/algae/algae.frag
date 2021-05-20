#ifdef GL_ES
precision highp float;
#endif

uniform vec4 algaeColor;
uniform float algaeTimeFactor;

void main() {
	gl_FragColor = algaeColor;
}
