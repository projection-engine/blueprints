import Constant from "../templates/Constant";
import Add from "../templates/Add";
import Subtract from "../templates/Subtract";
import Multiply from "../templates/Multiply";
import Divide from "../templates/Divide";
import PBRMaterial from "../../material/templates/PBRMaterial";

export const basicAvailable=[
    {
        label: 'Constant',
        dataTransfer: 'constant',
        tooltip: 'Node for a numeric constant.',
        getNewInstance: () => new Constant()
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
        getNewInstance: () => new PBRMaterial()
    }
]