export default {
    static: `#version 300 es
precision mediump float;
in vec3 texCoord;
uniform float gamma;
uniform float exposure;
uniform samplerCube uTexture;

out vec4 finalColor;
`,
    wrapper: (body) => `
  
void main(){
    gPosition = vPosition;
    
    ${body}
 
 
    vec3 fragment = vec3(1.0) - exp(-gAlbedo.rgb * exposure);
    fragment = pow(fragment, vec3(1.0/gamma));
    finalColor = vec4(fragment, 1.);
}
        `,
    inputs: ``,
    functions: ``
}


export const vertex = (bodyOperations) => {
    return `#version 300 es
layout (location = 0) in vec3 position;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

out highp vec3 texCoord;


void main(){
    texCoord = position;
    
    mat4 m = viewMatrix ;
   m[3][0]  = 0.0;
   m[3][1]  = 0.0;
   m[3][2]  = 0.0;

    gl_Position = vec4(position, 1.0);
    
    ${bodyOperations}
    
    gl_Position *= projectionMatrix * m; 
}
`
}