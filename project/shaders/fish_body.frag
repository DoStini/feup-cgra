#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;
varying vec4 vFinalColor;

uniform sampler2D uSampler2;
uniform vec4 uColor;

void main() {
    vec2 tex = vec2(vVertexPosition.x, vVertexPosition.y);
    vec4 color = texture2D(uSampler2, vTextureCoord);

    color.b = color.b + 0.3;
    color.r = color.r + 0.1;

    color = clamp(color, vec4(0.), vec4(1.));

	gl_FragColor = vFinalColor*mix(color, uColor, step(0.2, vVertexPosition.y));
}
