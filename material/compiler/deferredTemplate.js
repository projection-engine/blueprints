export default {
    static: `
            #version 300 es
            precision highp float;
    
#define PI  3.14159265359 
in vec3 normalVec;
in mat4 normalMatrix;
in mat3 toTangentSpace;
in vec3 viewDirection;
in vec2 texCoord;
in vec4 vPosition;
uniform float elapsedTime;
uniform sampler2D brdfSampler;
uniform samplerCube irradianceMap;
uniform samplerCube prefilteredMapSampler;
uniform float ambientLODSamples;
uniform vec3 cameraVec;
layout (location = 0) out vec4 gPosition;
layout (location = 1) out vec4 gNormal;
layout (location = 2) out vec4 gAlbedo;    // R  G         B
layout (location = 3) out vec4 gBehaviour; // AO ROUGHNESS METALLIC
layout (location = 4) out vec4 gAmbient;
// layout (location = 5) out vec4 gEmissive;


`,
    wrapper: (body, ambient) => `
    
${ambient ? `@import(fresnelSchlickRoughness)` : ''}
 
void main(){
    gPosition = vPosition;
    ${body}
    
   ${ambient ? `
        vec3 diffuse = vec3(0.);
        vec3 specular = vec3(0.);
        
        vec3 V = normalize(cameraVec - vPosition.xyz);
        float NdotV    = max(dot(gNormal.rgb, V), 0.000001);
        vec3 F0 = mix(vec3(0.04), gAlbedo.rgb, gBehaviour.b);
        
        vec3 F    = fresnelSchlickRoughness(NdotV, F0, gBehaviour.g);
        vec3 kD = (1.0 - F) * (1.0 - gBehaviour.b);
        diffuse = texture(irradianceMap, vec3(gNormal.x, -gNormal.y, gNormal.z)).rgb * gAlbedo.rgb * kD;
        
        vec3 prefilteredColor = textureLod(prefilteredMapSampler, reflect(-V, gNormal.rgb), gBehaviour.g * ambientLODSamples).rgb;
        vec2 brdf = texture(brdfSampler, vec2(NdotV, gBehaviour.g)).rg;
        specular = prefilteredColor * (F * brdf.r + brdf.g);
        
        gAmbient = vec4((diffuse + specular), 1.);
    ` : `gAmbient = vec4(vec3(0.), 1.);`}
    
}
        `,
    inputs: ``,
    functions: ``
}


export const vertex = (bodyOperations, inputs, functions) => {
    return `#version 300 es
layout (location = 1) in vec3 position;
layout (location = 2) in vec3 normal;
layout (location = 3) in vec2 uvTexture;
layout (location = 4) in vec3 tangentVec;

uniform mat4 viewMatrix;
uniform mat4 transformMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraVec;


out vec4 vPosition;
out vec2 texCoord;
out mat3 toTangentSpace;
out vec3 normalVec;

out vec3 viewDirection;
${inputs}
${functions}

void main(){
    vPosition =  transformMatrix *   vec4(position, 1.0);
    
    vec3 T = normalize( mat3(transformMatrix)  * normalize(tangentVec));
    vec3 N =  normalize(mat3(transformMatrix) * normal);
    vec3 biTangent = cross(N, tangentVec); 
    vec3 B =  normalize(mat3(transformMatrix) * biTangent);
    B = dot(biTangent, B)  > 0. ? -B : B;
    
    toTangentSpace = mat3(T, B, N);
    
    viewDirection = transpose(toTangentSpace) * (vPosition.xyz - cameraVec);
    texCoord = uvTexture;
    normalVec = normal;

   
     gl_Position = vPosition;

    ${bodyOperations}
    
    gl_Position *= projectionMatrix * viewMatrix; 
}
`
}