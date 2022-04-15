# Fluxo de dados (compilação)

## Nodes

Nodes são blocos de informações que serão combinadas para formar o glsl final.

### Nodes

Possuem 3 possíveis tipos
- **Variáveis**: Nodes que receberão parâmetros via editor principal pela entidade relacionada ao componente do
  material. Os parâmetros passados serão entregues via `uniforms` para o shader glsl.
- **Funções**: Nodes que serão definidos como funções no código `glsl` e em algum momento serão executados. Esses nodes
  receberão parâmetros internos no código e vão ser atribuídos a uma variável de resultado no código
- **Output**: Resultado final do shader.

### Links
Referenciam trocas de dados entre funções
 - Links são fortemente tipados.
 - Links fazem conexão entre uniform -> funções ou função -> função. 
 
### Estrutura

```glsl
// inputs vindo do vertex shader
in vec3 vNormal;
in mat4 normalMatrix;
in mat3 toTangentSpace;
in vec3 viewDirection;
in vec2 texCoord;
in vec3 vPosition;

// uniforms estáticos
uniform float elapsedTime;
uniform sampler2D brdfSampler;
uniform samplerCube irradianceMap;
uniform samplerCube prefilteredMapSampler;
uniform float ambientLODSamples;

// constantes
const float PI = 3.14159265359;

// outputs
layout (location = 0) out vec4 gPosition;// valor estático - vPosition;
layout (location = 1) out vec4 gNormal;
layout (location = 2) out vec4 gAlbedo;
layout (location = 3) out vec4 gBehaviour;// AO - ROUGHNESS - METALLIC
layout (location = 4) out vec4 gAmbient;

// NODES VARIAVIES
// uniform <TYPE> <NAME>;
// uniform <TYPE> <NAME>;
// uniform <TYPE> <NAME>;
// uniform <TYPE> <NAME>;
// ...

// NODES FUNÇÕES
// <RESULT_TYPE> <NAME> (<[<TYPE> <NAME>, ...]>){
//     <CODE>
// }
// ...

void main(){
    // CALL FUNÇÕES
    // <RESULT_TYPE> <OUT_VAR_NAME> = <NAME>(<[<IN_VAR_NAME>, ...]>);
    // ...
    gPosition = vec4(vPosition, 1.);
    //  gNormal = <NORMAL_RESULT>;  OUTPUT NODE
    //  gAlbedo = <ALBEDO_RESULT>; OUTPUT NODE
    //  gBehaviour = <BEHAVIOUR_RESULT>; OUTPUT NODE 
    //  gAmbient = <AMBIENT_RESULT>; OUTPUT NODE
}
```


