#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying float y_value;

void main() {
		// gl_FragColor = 0.05*vec4(1.0, 1.0, 1.0, 1.0) * coords;
        if(y_value >= 0.5) {
		    gl_FragColor = vec4(0.9333, 1.0, 0.0, 1.0);
        } else {
		    gl_FragColor = vec4(0.3686, 0.6235, 0.7922, 1.0);
        }
}