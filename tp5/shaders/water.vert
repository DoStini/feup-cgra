attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float normScale;


void main() {
	vec3 vertex = aVertexPosition;
	vTextureCoord = aTextureCoord;
	vec4 filter_good = texture2D(uSampler2, vTextureCoord);
	vertex.z += normScale*0.005*filter_good.r;

	gl_Position = uPMatrix * uMVMatrix * vec4(vertex, 1.0);
	
}

