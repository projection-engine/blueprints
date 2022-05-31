import Add from "./nodes/math/Add"
import TextureSample from "./nodes/TextureSample"
import TextureCoords from "./nodes/static/TextureCoords"
import Float from "./nodes/math/Float"
import ElapsedTime from "./nodes/static/ElapsedTime"
import Multiply from "./nodes/math/Multiply"
import Sine from "./nodes/math/Sine"
import Divide from "./nodes/math/Divide"
import Max from "./nodes/math/Max"
import Min from "./nodes/math/Min"
import RGB from "./nodes/RGB"
import AbsoluteWorldPosition from "./nodes/static/AbsoluteWorldPosition"
import CameraCoords from "./nodes/static/CameraCoords"
import NormalVector from "./nodes/static/NormalVector"
import ToTangentSpace from "./nodes/static/ToTangentSpace"
import ViewDirection from "./nodes/static/ViewDirection"
import ParallaxOcclusionMapping from "./nodes/ParallaxOcclusionMapping"
import PerlinNoise from "./nodes/math/PerlinNoise"
import BreakVec2 from "./nodes/vec/BreakVec2"
import BreakVec3 from "./nodes/vec/BreakVec3"
import BreakVec4 from "./nodes/vec/BreakVec4"
import DotVec2 from "./nodes/vec/DotVec2"
import DotVec3 from "./nodes/vec/DotVec3"
import DotVec4 from "./nodes/vec/DotVec4"
import LerpVec2 from "./nodes/vec/LerpVec2"
import LerpVec3 from "./nodes/vec/LerpVec3"
import LerpVec4 from "./nodes/vec/LerpVec4"
import Vec4 from "./nodes/vec/Vec4"
import Vec3 from "./nodes/vec/Vec3"
import Vec2 from "./nodes/vec/Vec2"
import OneMinus from "./nodes/math/OneMinus"
import Saturate from "./nodes/math/Saturate"
import Clamp from "./nodes/math/Clamp"
import Saturation from "./nodes/math/Saturation"
import Pow from "./nodes/math/Pow"
import SceneColor from "./nodes/SceneColor"
import Refract from "./nodes/math/Refract"

import Reflect from "./nodes/math/Reflect"
import Normalize from "./nodes/math/Normalize"
import DDY from "./nodes/math/DDY"
import DDX from "./nodes/math/DDX"
import SineH from "./nodes/math/SineH"
import CosineH from "./nodes/math/CosineH"
import Cosine from "./nodes/math/Cosine"
import MakeVector from "./nodes/vec/MakeVector"

export const allNodes = [
    {
        label: 'MakeVector',
        dataTransfer: 'MakeVector',
        tooltip: 'MakeVector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new MakeVector()
    },
    {
        label: 'Cosine',
        dataTransfer: 'Cosine',
        tooltip: 'Cosine.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Cosine()
    },
    {
        label: 'CosineH',
        dataTransfer: 'CosineH',
        tooltip: 'Hyperbolic cosine.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new CosineH()
    },
    {
        label: 'SineH',
        dataTransfer: 'SineH',
        tooltip: 'Hyperbolic sine.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new SineH()
    },
    {
        label: 'DDX',
        dataTransfer: 'DDX',
        tooltip: 'Partial derivative X.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new DDX()
    },
    {
        label: 'DDY',
        dataTransfer: 'DDY',
        tooltip: 'Partial derivative Y.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new DDY()
    },
    {
        label: 'Normalize',
        dataTransfer: 'Normalize',
        tooltip: 'Normalize vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Normalize()
    },
    {
        label: 'Reflect',
        dataTransfer: 'Reflect',
        tooltip: 'Reflect vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Reflect()
    },
    {
        label: 'Refract',
        dataTransfer: 'Refract',
        tooltip: 'Refract vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Refract()
    },



    {
        label: 'SceneColor',
        dataTransfer: 'SceneColor',
        tooltip: 'Scene color.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new SceneColor()
    },
    {
        label: 'Pow',
        dataTransfer: 'Pow',
        tooltip: 'Power to exponent.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Pow()
    },
    {
        label: 'Saturation',
        dataTransfer: 'Saturation',
        tooltip: 'Adjust saturation.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Saturation()
    },
    {
        label: 'Saturate',
        dataTransfer: 'Saturate',
        tooltip: 'Clamp between 0 and 1.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Saturate()
    },
    {
        label: 'Clamp',
        dataTransfer: 'Clamp',
        tooltip: 'One minus X.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Clamp()
    },
    {
        label: '1-X (OneMinusX)',
        dataTransfer: 'OneMinus',
        tooltip: 'One minus X.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new OneMinus()
    },
    {
        label: 'Vec2',
        dataTransfer: 'Vec2',
        tooltip: '2D vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Vec2()
    },
    {
        label: 'Vec3',
        dataTransfer: 'Vec3',
        tooltip: '3D vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Vec3()
    },
    {
        label: 'Vec4',
        dataTransfer: 'Vec4',
        tooltip: '4D vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Vec4()
    },


    {
        label: 'BreakVec2',
        dataTransfer: 'BreakVec2',
        tooltip: 'Break vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new BreakVec2()
    },
    {
        label: 'BreakVec3',
        dataTransfer: 'BreakVec3',
        tooltip: 'Break vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new BreakVec3()
    },
    {
        label: 'BreakVec4',
        dataTransfer: 'BreakVec4',
        tooltip: 'Break vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new BreakVec4()
    },
    {
        label: 'DotVec2',
        dataTransfer: 'DotVec2',
        tooltip: 'Dot product vec2',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new DotVec2()
    },
    {
        label: 'DotVec3',
        dataTransfer: 'DotVec3',
        tooltip: 'Dot product vec3',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new DotVec3()
    },
    {
        label: 'DotVec4',
        dataTransfer: 'DotVec4',
        tooltip: 'Dot product vec4',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new DotVec4()
    },

    {
        label: 'LerpVec2',
        dataTransfer: 'LerpVec2',
        tooltip: 'Linear interpolate vec2.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new LerpVec2()
    },
    {
        label: 'LerpVec3',
        dataTransfer: 'LerpVec3',
        tooltip: 'Linear interpolate vec3.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new LerpVec3()
    },
    {
        label: 'LerpVec4',
        dataTransfer: 'LerpVec4',
        tooltip: 'Linear interpolate vec4.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new LerpVec4()
    },





    {
        label: 'PerlinNoise',
        dataTransfer: 'PerlinNoise',
        tooltip: 'Perlin Noise.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new PerlinNoise()
    },
    {
        label: 'TextureCoords',
        dataTransfer: 'TextureCoords',
        tooltip: 'Fragment texture coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new TextureCoords()
    },
    {
        label: 'CameraCoords',
        dataTransfer: 'CameraCoords',
        tooltip: 'Camera coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new CameraCoords()
    },
    {
        label: 'AbsoluteWorldPosition',
        dataTransfer: 'AbsoluteWorldPosition',
        tooltip: 'Vertex coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new AbsoluteWorldPosition()
    },
    {
        label: 'NormalVector',
        dataTransfer: 'NormalVector',
        tooltip: 'Surface normal.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new NormalVector()
    },
    {
        label: 'ToTangentSpace',
        dataTransfer: 'ToTangentSpace',
        tooltip: 'To tangent space matrix.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ToTangentSpace()
    },
    {
        label: 'ViewDirection',
        dataTransfer: 'ViewDirection',
        tooltip: 'View direction vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ViewDirection()
    },
    {
        label: 'ParallaxOcclusionMapping',
        dataTransfer: 'ParallaxOcclusionMapping',
        tooltip: 'Parallax occlusion mapping.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ParallaxOcclusionMapping()
    },


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
        getNewInstance: () => new Sine()
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
    },{
        label: 'RGB',
        dataTransfer: 'RGB',
        tooltip: 'RGB color.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new RGB()
    },
]