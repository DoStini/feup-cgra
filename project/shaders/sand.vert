attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSandSampler;
uniform sampler2D uSandBumpSampler;
uniform float uDisplacement;
uniform float uMaxHeight;

void main(){
    vec3 vertex=aVertexPosition;
    vTextureCoord = aTextureCoord;

    vec4 bumpColor = texture2D(uSandBumpSampler, vTextureCoord);

    vertex.z = bumpColor.r*2. - 1.; // normalizes the displacement so the object doesn't move 
    vertex.z *= uDisplacement;

    vertex.z = clamp( vertex.z, 0., uMaxHeight);
    
    gl_Position=uPMatrix*uMVMatrix*vec4(vertex,1.);
}

