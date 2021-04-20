#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main() {
    vec4 color = uColor;

    if(vVertexPosition.x < 0.2) color = texture2D(uSampler, vTextureCoord);
	gl_FragColor = color;
}
