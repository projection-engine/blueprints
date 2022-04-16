import Add from "./nodes/Add";
import TextureSample from "./nodes/TextureSample";
import Material from "./nodes/Material";
import TextureCoord from "./nodes/TextureCoord";
import Float from "./nodes/Float";
import ElapsedTime from "./nodes/ElapsedTime";
import Multiply from "./nodes/Multiply";
import Sin from "./nodes/Sin";
import Divide from "./nodes/Divide";
import Max from "./nodes/Max";
import Min from "./nodes/Min";

export const allNodes = [
    {
        label: 'Add',
        dataTransfer: 'Add',
        tooltip: 'Adds two values (float, int, vec2, vec3, vec4)',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Add()
    },
    {
        label: 'TextureSample',
        dataTransfer: 'TextureSample',
        tooltip: 'Gets texture value (sampler 2d)',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new TextureSample()
    },
    {
        label: 'Material',
        unique:true,
        dataTransfer: 'Material',
        tooltip: 'Mesh Material',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Material()
    },
    {
        label: 'TextureCoord',
        dataTransfer: 'TextureCoord',
        tooltip: 'Fragment texture coordinate.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new TextureCoord()
    },  {
        label: 'Float',
        dataTransfer: 'Float',
        tooltip: 'Float uniform.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Float()
    },  {
        label: 'Elapsed',
        dataTransfer: 'ElapsedTime',
        tooltip: 'Elapsed time.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ElapsedTime()
    }, {
        label: 'Multiply',
        dataTransfer: 'Multiply',
        tooltip: 'Multiplies two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Multiply()
    },
    {
        label: 'Sine',
        dataTransfer: 'Sine',
        tooltip: 'Sine of a value.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Sin()
    },    {
        label: 'Divide',
        dataTransfer: 'Divide',
        tooltip: 'Divides two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Divide()
    },{
        label: 'Min',
        dataTransfer: 'Min',
        tooltip: 'Min between two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Min()
    },{
        label: 'Max',
        dataTransfer: 'Max',
        tooltip: 'Max between two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Max()
    },
]