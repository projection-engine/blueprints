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