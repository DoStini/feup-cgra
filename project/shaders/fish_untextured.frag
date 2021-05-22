#ifdef GL_ES
precision highp float;
#endif

uniform vec4 uColor;
varying vec4 vFinalColor;

void main() {
	gl_FragColor = vFinalColor*uColor;
}
