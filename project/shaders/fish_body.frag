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
        color.b += 0.3;
        if(color.b > 1.0) color.b = 1.0;
        color.r += 0.1;
        if(color.r > 1.0) color.r = 1.0;
    }
	gl_FragColor = color;
}
