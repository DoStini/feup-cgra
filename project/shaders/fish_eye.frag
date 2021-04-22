#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler3;
uniform vec4 uColor;

void main() {
    vec4 color = texture2D(uSampler3, vTextureCoord);
	gl_FragColor = color;
}
