import Integer from "../workflows/basic/Integer";
import Add from "../workflows/basic/Add";
import Subtract from "../workflows/basic/Subtract";
import Multiply from "../workflows/basic/Multiply";
import Divide from "../workflows/basic/Divide";
import Material from "../workflows/material/Material";
import Float from "../workflows/basic/Float";

export const basicAvailable=[
    {
        label: 'Integer',
        dataTransfer: 'integer',
        tooltip: 'Node for a integer.',
        getNewInstance: () => new Integer()
    },
    {
        label: 'Float',
        dataTransfer: 'float',
        tooltip: 'Node for a float.',
        getNewInstance: () => new Float()
    },
    {
        label: 'Addition',
        dataTransfer: 'add',
        tooltip: 'Node for the numeric Addition.',
        getNewInstance: () => new Add()
    },
    {
        label: 'Subtraction',
        dataTransfer: 'sub',
        tooltip: 'Node for the numeric subtraction.',
        getNewInstance: () => new Subtract()
    },{
        label: 'Multiplication',
        dataTransfer: 'mul',
        tooltip: 'Node for the numeric multiplication.',
        getNewInstance: () => new Multiply()
    },{
        label: 'Division',
        dataTransfer: 'div',
        tooltip: 'Node for the numeric division.',
        getNewInstance: () => new Divide()
    },{
        label: 'Power',
        dataTransfer: 'pow',
        tooltip: 'Node for the numeric function power.',
        getNewInstance: () => new Material()
    }
]