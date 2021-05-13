#ifdef GL_ES
precision highp float;
#endif

uniform vec4 algaeColor;
uniform float algaeTimeFactor;

void main() {
	// gl_FragColor = algaeColor;
    float val = sin(algaeTimeFactor);
	gl_FragColor = vec4(val, val, val,1.);
}
