#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler3;
uniform vec4 uColor;

void main() {
    vec4 color = vec4(1.0);
    if (vVertexPosition.y > 0.8) {
        color = vec4(0.0, 0.0, 0.0, 1.0);
    }
	gl_FragColor = color;
}
