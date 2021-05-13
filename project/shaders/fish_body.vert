#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;
varying vec4 vFinalColor;

struct lightProperties {
    vec4 position;                  // Default: (0, 0, 1, 0)
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 half_vector;
    vec3 spot_direction;            // Default: (0, 0, -1)
    float spot_exponent;            // Default: 0 (possible values [0, 128]
    float spot_cutoff;              // Default: 180 (possible values [0, 90] or 180)
    float constant_attenuation;     // Default: 1 (value must be >= 0)
    float linear_attenuation;       // Default: 0 (value must be >= 0)
    float quadratic_attenuation;    // Default: 0 (value must be >= 0)
    bool enabled;                   // Default: false
};

struct materialProperties {
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 emission;                  // Default: (0, 0, 0, 1)
    float shininess;                // Default: 0 (possible values [0, 128])
};

#define NUMBER_OF_LIGHTS 8

uniform vec4 uGlobalAmbient;

uniform lightProperties uLight[NUMBER_OF_LIGHTS];

uniform materialProperties uFrontMaterial;
uniform materialProperties uBackMaterial;

vec4 gouraudShading(vec4 vertex){
    vec3 normal=normalize(vec3(uNMatrix*vec4(aVertexNormal,1.)));
    vec3 viewer=normalize(-vec3(vertex.xyz));// this is, direction of vertex to camera, 
                                             // since vertex was previously multiplied
                                             // by the mvmatrix, which converts it from 
                                             // local to camera space.

    vec4 result = vec4(0.,0.,0.,1.);

    for(int i = 0; i < NUMBER_OF_LIGHTS; i++) {
        if(uLight[i].enabled) { // better to use conditional then calculate needlesly.
            float attenuation = 1.0;
            float spot_result = 1.0; // result of applying spot_cutoff, exponent, direction.
                                     // defaults to 1 (no effect) if cutoff is special val 180.
            vec3 light_ray = vec3(0.0);

            // directional light sources will not be used in this project
            //if(uLight[i].position.w != 0.) { // opengl only specifies that 0 is directional source
                light_ray = (uLight[i].position - vertex).xyz;
                float dist = length(light_ray);
                light_ray = normalize(light_ray);

                if(uLight[i].spot_cutoff != 180.0) { // if the light isn't omnidirectional, calculate spot light.
                    vec3 spot_direction = normalize(vec3(uLight[i].spot_direction));
                    // spot is masked if angle between direction and light ray is bigger than the cutoff
                    // the color is calculated by raising the cosine of the angle between the direction
                    // and the light ray to the power of the spot exponent.
                    float cos_angle_light_vertex = dot(spot_direction, -light_ray);
                    float cos_spot_cutoff = cos(radians(uLight[i].spot_cutoff));
                    
                    // only case considered is if cos_angle_light_vertex between -90 and 90
                    // other values will be result in color 0 anyway because of the lambert_term.
                    // larger cosine values mean angle is smaller.
                    // if angle between direction and light_ray is bigger, then cosine is smaller, step returns 0.
                    float is_cutoff = step(cos_spot_cutoff, cos_angle_light_vertex);
                    // no clamping of exponent needed, leaving the resposibility of keeping the exponent
                    // between 0 and 128 out of the shader. the same was done for the spot_cutoff.
                    spot_result = is_cutoff * pow(cos_angle_light_vertex, uLight[i].spot_exponent);
                }

                attenuation = 1.0 / (uLight[i].constant_attenuation + uLight[i].linear_attenuation * dist + uLight[i].quadratic_attenuation * dist * dist);
            //} else {
                // light's position is the direction.
            //    light_ray = normalize(uLight[i].position.xyz);
            //}

            float lambert_term = max(dot(normal, light_ray), 0.0);

            vec4 I_ambient = uLight[i].ambient * uFrontMaterial.ambient;
            vec4 I_diffuse = uLight[i].diffuse * uFrontMaterial.diffuse * lambert_term;

            vec3 max_reflection = reflect(-light_ray, normal);
            float shininess = pow(max(dot(max_reflection, viewer), 0.0), uFrontMaterial.shininess);

            vec4 I_specular =vec4(0.0, 0.0, 0.0, 1.0) + step(0., lambert_term)*(uLight[i].specular * uFrontMaterial.specular * shininess);
            
            // in open gl even ambient light is affected by the attenuation.
            result += attenuation * spot_result * (I_ambient + I_diffuse + I_specular);
        }
    }

	result += uGlobalAmbient * uFrontMaterial.ambient + uFrontMaterial.emission;
    result = clamp(result, vec4(0.0), vec4(1.0));
    
    return vec4(result.rgb, 1.);
}

void main(){
    vec4 vertex=uMVMatrix*vec4(aVertexPosition,1.);
    vFinalColor = gouraudShading(vertex);
    
    vTextureCoord=aTextureCoord;
    vVertexPosition=aVertexPosition;
    
    gl_Position=uPMatrix*vertex;
}

