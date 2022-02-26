import Numeric from "../workflows/basic/Numeric";
import Add from "../workflows/basic/Add";
import Multiply from "../workflows/basic/Multiply";

import Material from "../workflows/material/Material";
import Vector from "../workflows/basic/Vector";


export const basicAvailable=[
    {
        label: 'Number',
        dataTransfer: 'number',
        tooltip: 'Node for a numeric constant.',
        getNewInstance: () => new Numeric()
    },

    {
        label: 'Addition',
        dataTransfer: 'add',
        tooltip: 'Node for the numeric Addition.',
        getNewInstance: () => new Add()
    },
    {
        label: 'Multiplication',
        dataTransfer: 'mul',
        tooltip: 'Node for the numeric multiplication.',
        getNewInstance: () => new Multiply()
    },{
        label: 'Power',
        dataTransfer: 'pow',
        tooltip: 'Node for the numeric function power.',
        getNewInstance: () => new Material()
    },{
        label: 'Vector',
        dataTransfer: 'vec',
        tooltip: '3D vector node.',
        getNewInstance: () => new Vector()
    }
]