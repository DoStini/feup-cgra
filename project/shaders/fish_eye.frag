#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;

void main() {
	gl_FragColor = vec4(vec3(1.-step(0.8, vVertexPosition.y)), 1.0);
}
