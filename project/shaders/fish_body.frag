#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler2;
uniform vec4 uColor;

void main() {
    vec2 tex = vec2(vVertexPosition.x, vVertexPosition.y);
    vec4 color = texture2D(uSampler2, vTextureCoord);

    color.b = clamp(color.b + 0.3, 0., 1.);
    color.r = clamp(color.r + 0.1, 0., 1.);

	gl_FragColor = mix(color, uColor, step(0.2, vVertexPosition.y));
}
