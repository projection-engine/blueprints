export default {
    static: `#version 300 es
    
precision highp float;
// IN
#define MAX_POINT_LIGHTS 24
#define MAX_LIGHTS 2
#define PI  3.14159265359 

in vec4 vPosition;
in  vec2 texCoord;
in mat3 toTangentSpace;
uniform int dirLightQuantity;
uniform mat4 dirLightPOV[MAX_LIGHTS];

uniform vec3 cameraVec;

// [
//    POSITION [0][0] [0][1] [0][2] EMPTY
//    COLOR [1][0] [1][1] [1][2]  EMPTY
//    ATTENUATION [2][0] [2][1] [2][2] EMPTY
//    zFar [3][0] zNear [3][1] hasShadowMap [3][2] EMPTY
// ] = mat4
uniform mat4 pointLightData[MAX_POINT_LIGHTS];
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

 
@import(fresnelSchlickRoughness)
@import(fresnelSchlick)
@import(geometrySchlickGGX)
@import(distributionGGX)
@import(geometrySmith)
@import(computeDirectionalLight)
        `,
    wrapper: (body, ambient) => `


@import(computePointLight)

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
    float quantityToDivide = float(dirLightQuantity) + float(lightQuantity);
    for (int i = 0; i < dirLightQuantity; i++){
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
            vec4 currentLightData = computePointLights(pointLightData[i],  fragPosition, V, N, quantityToDivide, roughness, metallic, albedo, F0, i);
            Lo += currentLightData.rgb;
            shadows += currentLightData.a;    
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
    vec3 color;
    if(length(gEmissive) <= 1.)
        color = Lo + gEmissive.rgb;
    else
        color = gEmissive.rgb;
    finalColor = vec4(color, opacity);
}
        `,
    inputs: ``,
    functions: ``
}

export const vertex = (bodyOperations, inputs, functions) => {
   return `#version 300 es
#define MAX_LIGHTS 2
#define PI  3.14159265359 

layout (location = 1) in vec3 position;
layout (location = 2) in vec3 normal;
layout (location = 3) in vec2 uvTexture;
layout (location = 4) in vec3 tangentVec;

uniform mat4 viewMatrix;
uniform mat4 transformMatrix;
uniform mat3 normalMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraVec; 
uniform int dirLightQuantity;


out vec4 vPosition;
out vec2 texCoord;
out mat3 toTangentSpace;
out vec3 normalVec;  
 
${inputs}
${functions}
 

void main(){


    vPosition =  transformMatrix *   vec4(position, 1.0);
    
    vec3 T = normalize( normalMatrix  * normalize(tangentVec));
    vec3 N =  normalize(normalMatrix * normal);
    vec3 biTangent = cross(N, tangentVec); 
    vec3 B =  normalize(normalMatrix * biTangent);
    B = dot(biTangent, B)  > 0. ? -B : B;
    
    toTangentSpace = mat3(T, B, N);

    texCoord = uvTexture;
    gl_Position = vPosition;

    ${bodyOperations}
    
    gl_Position *= projectionMatrix * viewMatrix; 
}
`
}