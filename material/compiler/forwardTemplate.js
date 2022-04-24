export default {
    static: `#version 300 es
    
precision highp float;
// IN
#define MAX_LIGHTS 2
in vec4 vPosition;
in  vec2 texCoord;
in mat3 toTangentSpace;
flat in int dirLightsQuantity;
in mat4 dirLightPOV[MAX_LIGHTS];
 

uniform vec3 cameraVec;

uniform vec3 lightPosition[MAX_LIGHTS];
uniform vec3 lightColor[MAX_LIGHTS];
uniform vec3 lightAttenuationFactors[MAX_LIGHTS];
uniform int lightQuantity;
struct DirectionalLight {
    vec3 direction;
    vec3 ambient;
    vec2 atlasFace;
};
uniform DirectionalLight directionalLights[MAX_LIGHTS];


in vec3 normalVec;
in mat4 normalMatrix; 
in vec3 viewDirection;  
uniform float elapsedTime;
uniform sampler2D brdfSampler;
uniform samplerCube irradianceMap;
uniform samplerCube prefilteredMapSampler;
uniform float ambientLODSamples; 
uniform sampler2D sceneColor;

// OUTPUTS
out vec4 finalColor;

const float PI = 3.14159265359;
@import(fresnelSchlickRoughness)
@import(fresnelSchlick)
@import(geometrySchlickGGX)
@import(distributionGGX)
@import(geometrySmith)
@import(computeDirectionalLight)
        `,
    wrapper: (body, ambient) => `
void main(){
    ${body}
    vec3 fragPosition = vPosition.xyz;  
    vec3 albedo = vec3(gAlbedo);
         
    
    float roughness = gBehaviour.g;
    float metallic = gBehaviour.b;
    float ao = gBehaviour.r;
    vec3 normal = gNormal.rgb; 
    
    
    vec3 V = normalize(cameraVec - fragPosition);
    float NdotV    = max(dot(normal, V), 0.000001);
    vec3 F0 = vec3(0.04);
    vec3 Lo = vec3(0.0);
    F0 = mix(F0, albedo, metallic);
    
    // DIRECTIONAL LIGHT
    float quantityToDivide = float(dirLightsQuantity) + float(lightQuantity);
    for (int i = 0; i < dirLightsQuantity; i++){
        vec4  fragPosLightSpace  = dirLightPOV[i] * vec4(fragPosition, 1.0);
        vec3 lightDir =  normalize(directionalLights[i].direction);

        Lo += computeDirectionalLight(
            V,
            F0,
            lightDir,
            directionalLights[i].ambient,
            fragPosition,
            roughness,
            metallic,
            normal,
            albedo
        );
    }
 
    for (int i = 0; i < lightQuantity; ++i){
        vec3 L = normalize(lightPosition[i] - fragPosition);
        vec3 H = normalize(V + L);
        float distance    = length(lightPosition[i] - fragPosition);
        float attFactor = 1.0 / (lightAttenuationFactors[i].x + (lightAttenuationFactors[i].y * distance) + (lightAttenuationFactors[i].z * distance * distance));
        vec3 radiance     = lightColor[i] * attFactor;

        float NDF = distributionGGX(normal, H, roughness);
        float G   = geometrySmith(normal, V, L, roughness);
        vec3 F    = fresnelSchlick(max(dot(H, V), 0.0), F0);

        vec3 kS = F;
        vec3 kD = vec3(1.0) - kS;
        kD *= 1.0 - metallic;

        vec3 numerator    = NDF * G * F;
        float denominator = 4.0 * max(dot(normal, V), 0.0) * max(dot(normal, L), 0.0) + 0.0001;
        vec3 specular     = numerator / denominator;

        float NdotL = max(dot(normal, L), 0.0);
        
        Lo += (kD * albedo / PI + specular) * radiance * NdotL;
    }

    
   ${ambient ? `
    vec3 diffuse = vec3(0.);
    vec3 specular = vec3(0.);
    vec3 F    = fresnelSchlickRoughness(NdotV, F0, roughness);
    vec3 kD = (1.0 - F) * (1.0 - metallic);
    diffuse = texture(irradianceMap, vec3(normal.x, -normal.y, normal.z)).rgb * gAlbedo.rgb * kD;
    
    vec3 prefilteredColor = textureLod(prefilteredMapSampler, reflect(-V, normal.rgb), gBehaviour.g * ambientLODSamples).rgb;
    vec2 brdf = texture(brdfSampler, vec2(NdotV, roughness)).rg;
    specular = prefilteredColor * (F * brdf.r + brdf.g);
    Lo += (diffuse + specular);
    ` : ``}
    
    Lo = Lo / (Lo + vec3(1.0));
    finalColor = vec4(Lo + gEmissive.rgb, opacity);
}
        `,
    inputs: ``,
    functions: ``
}