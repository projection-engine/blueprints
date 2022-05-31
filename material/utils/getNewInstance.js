import Material from "./nodes/Material"
import SceneColor from "./nodes/SceneColor"
import Add from "./nodes/math/Add"
import TextureSample from "./nodes/TextureSample"
import TextureCoords from "./nodes/static/TextureCoords"
import Float from "./nodes/math/Float"
import Divide from "./nodes/math/Divide"
import Sine from "./nodes/math/Sine"
import NormalVector from "./nodes/static/NormalVector"
import ParallaxOcclusionMapping from "./nodes/ParallaxOcclusionMapping"
import RGB from "./nodes/RGB"
import ToTangentSpace from "./nodes/static/ToTangentSpace"
import AbsoluteWorldPosition from "./nodes/static/AbsoluteWorldPosition"
import ViewDirection from "./nodes/static/ViewDirection"
import CameraCoords from "./nodes/static/CameraCoords"
import ElapsedTime from "./nodes/static/ElapsedTime"
import Multiply from "./nodes/math/Multiply"
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
import Max from "./nodes/math/Max"
import Min from "./nodes/math/Min"
import Vec2 from "./nodes/vec/Vec2"
import Vec3 from "./nodes/vec/Vec3"
import Vec4 from "./nodes/vec/Vec4"
import OneMinus from "./nodes/math/OneMinus"
import Saturate from "./nodes/math/Saturate"
import Clamp from "./nodes/math/Clamp"
import Saturation from "./nodes/math/Saturation"
import Pow from "./nodes/math/Pow"
import MakeVector from "./nodes/vec/MakeVector"

export default function getNewInstance(name) {
    switch (name) {
        case 'Material':
            return new Material()
        case 'SceneColor':
            return new SceneColor()
        case 'Add':
            return new Add()
        case 'TextureSample':
            return new TextureSample()
        case 'TextureCoords':
            return new TextureCoords()
        case 'Float':
            return new Float()
        case 'Divide':
            return new Divide()
        case 'Sine':
            return new Sine()
        case 'NormalVector':
            return new NormalVector()
        case 'ParallaxOcclusionMapping':
            return new ParallaxOcclusionMapping()
        case 'RGB':
            return new RGB()
        case 'ToTangentSpace':
            return new ToTangentSpace()
        case 'AbsoluteWorldPosition':
            return new AbsoluteWorldPosition()
        case 'ViewDirection':
            return new ViewDirection()
        case 'CameraCoords':
            return new CameraCoords()
        case 'ElapsedTime':
            return new ElapsedTime()
        case 'Multiply':
            return new Multiply()
        case 'PerlinNoise':
            return new PerlinNoise()
        case 'BreakVec2':
            return new BreakVec2()
        case 'BreakVec3':
            return new BreakVec3()
        case 'BreakVec4':
            return new BreakVec4()
        case 'DotVec2':
            return new DotVec2()
        case 'DotVec3':
            return new DotVec3()
        case 'DotVec4':
            return new DotVec4()
        case 'LerpVec2':
            return new LerpVec2()
        case 'LerpVec3':
            return new LerpVec3()
        case 'LerpVec4':
            return new LerpVec4()
        case 'Max':
            return new Max()
        case 'Min':
            return new Min()
        case 'Vec2':
            return new Vec2()
        case 'Vec3':
            return new Vec3()
        case 'Vec4':
            return new Vec4()
        case 'OneMinus':
            return new OneMinus()
        case 'Saturate':
            return new Saturate()
        case 'Clamp':
            return new Clamp()
        case 'Saturation':
            return new Saturation()
        case 'Pow':
            return new Pow()
        case 'MakeVector':
            return new MakeVector()
        default:
            return null
    }
}