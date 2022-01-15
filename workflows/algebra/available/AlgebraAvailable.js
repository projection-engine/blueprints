import Vector2D from "../templates/Vector2D";
import Vector3D from "../templates/Vector3D";
import Vector4D from "../templates/Vector4D";
import AddVector from "../templates/AddVector";
import SubtractVector from "../templates/SubtractVector";
import VectorScalar from "../templates/VectorScalar";
import CrossProduct from "../templates/CrossProduct";
import DotProduct from "../templates/DotProduct";

export const algebraAvailable=[
    {
        label: 'Vector 2D',
        dataTransfer: 'vec2',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new Vector2D()
    },
    {
        label: 'Vector 3D',
        dataTransfer: 'vec3',
        tooltip: 'Node for a 3D vector (x, y, z).',
        getNewInstance: () => new Vector3D()
    },
    {
        label: 'Vector 4D',
        dataTransfer: 'vec4',
        tooltip: 'Node for a 4D vector (x, y, z, w).',
        getNewInstance: () => new Vector4D()
    },
    {
        label: 'Vector addition',
        dataTransfer: 'add-vec',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new AddVector()
    },
    {
        label: 'Vector subtraction',
        dataTransfer: 'sub-vec',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new SubtractVector()
    },
    {
        label: 'Vector scalar multiplication',
        dataTransfer: 'scalar',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new VectorScalar()
    },
    {
        label: 'Vector cross product',
        dataTransfer: 'cross',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new CrossProduct()
    },
    {
        label: 'Vector dot product',
        dataTransfer: 'dot',
        tooltip: 'Node for a 2D vector (x, y).',
        getNewInstance: () => new DotProduct()
    },

]