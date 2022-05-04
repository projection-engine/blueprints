### Blueprint system compilation process

This engine supports a custom node based programming interface, both for GLSL code and for scripting.
The compilation process is very similar between the two modes, the only big diference is that the code for scripting
follows a structure for class instantiation and has an execution line that doesn't always finish on the same node, 
while GLSL code has its own template and converges to an endpoint

##### Node structure to GLSL

The first step to compile the shader is to build the uniforms and functions dependencies tree, this is done by looping through each node and getting its 
function instance (if not already instantiated) `getFunctionInstance` and its uniforms `getInputInstance`, these two methods will return
the "stringfied" code  required. If the node doesn't need any of these two it will simply return an empty string.

The GLSL body compiler works by finding the starting point (Material node) and traces the dependency structure down to the first node without a parent.
While doing this trace we build the structure by getting the current node function call with `getFunctionCall`,
this method requires the linked inputs and current node index and generates one or multiple outputs (adds to itself the key that represents the GLSL variable name), the method then returns the string code for its execution.

After all of this we wrap the resulting structure with a template for the selected rendering method (forward or deferred).

##### Node structure to JavaScript 

Similar to the GLSL structure we will continue to have the 3 base methods for compiling the code (`getFunctionInstance`,  `getInputInstance` and  `getFunctionCall`),
and they will work basically the same way that the GLSL did, the only diference is that the `getFunctionInstance` method will only be called for `START_POINT` nodes,
that means that only event triggering nodes will generate a function call, 
the result from this method will then be wrapped around the `execute` entry point.

When calling the `getFunctionCall` method we will pass the currently built function body from the traced dependencies and generate the method that will be called inside the `execute`entry point.


##### Javascript string code to class instance

The parsing occurs on the start of the renderer, it will take the code string and generate a class instance.

All javascript code that needs to be executed in the ScriptSystem needs one entry point,
that being the `execute` method, this method will receive the required attributes to perform any operation.
These are the following attributes:
```js
{
    elapsed, // Elapsed time
    entities, // Entities hash map ({[entityID]: entityRef})
    renderTarget, // DOM render target
    pressedKeys, // Currently pressed keys (example: {KeyA: true})
    KEYS, // Hash map referencing the JS events for keys (example: {KeyA: "KeyA"})
    mousePosition, // Current mouse position {x, y}
    camera, // RootCameraInstance instance 
    glMatrix, // all glMatrix methods
    COMPONENTS // components names for accessing the components inside an entity.
}
```

The `COMPONENTS` object: 
```js
 {
    TRANSFORM,
    CUBE_MAP,
    COLLIDER,
    DIRECTIONAL_LIGHT,
    POINT_LIGHT,
    PICK,
    SPOT_LIGHT,
    FOLDER,
    MATERIAL,
    MESH,
    PHYSICS,
    SKYBOX,
    TERRAIN,
    SKYLIGHT,
    SCRIPT,
    CAMERA
}
```

