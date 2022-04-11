import Numeric from "../nodes/Numeric";
import Add from "../nodes/Add";
import Multiply from "../nodes/Multiply";
import Vector from "../nodes/Vector";
import Power from "../nodes/Power";
import TextureSample from "../nodes/TextureSample";
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import Color from "../nodes/Color";
import Mask from "../nodes/Mask";
import Lerp from "../nodes/Lerp";
import HeightLerp from "../nodes/HeightLerp";
import Atlas from "../nodes/Atlas";
import OneMinus from "../nodes/OneMinus";


export const allNodes = [
    {
        label: 'Number',
        dataTransfer: 'number',
        tooltip: 'Node for a numeric constant.',
        icon: <span className={'material-icons-round'}>123</span>,
        getNewInstance: () => new Numeric()
    },

    {
        label: 'Addition',
        dataTransfer: 'add',
        tooltip: 'Node for the numeric Addition.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Add()
    },
    {
        label: 'Multiplication',
        dataTransfer: 'mul',
        tooltip: 'Node for the numeric multiplication.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Multiply()
    }, {
        label: 'Power',
        dataTransfer: 'pow',
        tooltip: 'Node for the numeric function power.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Power()
    }, {
        label: 'Vector',
        dataTransfer: 'vec',
        tooltip: '3D vector node.',
        icon: <span className={'material-icons-round'}>data_array</span>,
        getNewInstance: () => new Vector()
    },
    {
        label: 'Texture sample',
        dataTransfer: 'texture-sample',
        icon: <span className={'material-icons-round'}>texture</span>,
        tooltip: 'Texture sample node.',
        getNewInstance: () => new TextureSample()
    },

    {
        label: 'Parallax occlusion mapping',
        dataTransfer: 'pom',
        icon: <span className={'material-icons-round'}>line_weight</span>,
        tooltip: 'POM node.',
        getNewInstance: () => new ParallaxOcclusionMapping()
    },
    {
        label: 'RGB',
        dataTransfer: 'rgb',
        icon: <span className={'material-icons-round'}>palette</span>,
        tooltip: 'RGB color node.',
        getNewInstance: () => new Color()
    },
    {
        label: 'Mask',
        dataTransfer: 'mask',
        icon: <span className={'material-icons-round'}>colorize</span>,
        tooltip: 'Extracts color channel from texture.',
        getNewInstance: () => new Mask()
    },
    {
        label: 'Lerp',
        dataTransfer: 'lerp',
        icon: <span className={'material-icons-round'}>blur_linear</span>,
        tooltip: 'Linear interpolates two textures.',
        getNewInstance: () => new Lerp()
    },
    {
        label: 'Height Lerp',
        dataTransfer: 'h-lerp',
        icon: <span className={'material-icons-round'}>blur_linear</span>,
        tooltip: 'Height based linear interpolation.',
        getNewInstance: () => new HeightLerp()
    },
    {
        label: 'Atlas layer blend',
        dataTransfer: 'atlas',
        icon: <span className={'material-icons-round'}>window</span>,
        tooltip: 'Layered terrain atlas node.',
        getNewInstance: () => new Atlas()
    },
    {
        label: '1-X',
        dataTransfer: 'one-',
        icon: <span className={'material-icons-round'}>invert_colors</span>,
        tooltip: 'Layered terrain atlas node.',
        getNewInstance: () => new OneMinus()
    }
]