#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler2;
uniform vec4 uColor;

void main() {
    vec4 color = uColor;

    if(vVertexPosition.y < 0.2) {
        vec2 tex = vec2(vVertexPosition.x, vVertexPosition.y);
        color = texture2D(uSampler2, vTextureCoord);
        //color = vec4(vTextureCoord, 1., 1.);
        color.b = clamp(color.b + 0.3, 0., 1.);
        color.r = clamp(color.r + 0.1, 0., 1.);
    }
	gl_FragColor = color;
}
