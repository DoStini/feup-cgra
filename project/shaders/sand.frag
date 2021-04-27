#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSandSampler;
uniform float maxHeight;

void main() {
	gl_FragColor = texture2D(uSandSampler, vTextureCoord);;
}
