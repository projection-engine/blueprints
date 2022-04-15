import Add from "./nodes/Add";
import TextureSample from "./nodes/TextureSample";
import Material from "./nodes/Material";
import TextureCoord from "./nodes/TextureCoord";
import Float from "./nodes/Float";

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
    },
]