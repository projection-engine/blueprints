import Material from "../nodes/Material"
import SceneColor from "../nodes/SceneColor"
import Add from "../nodes/math/Add"
import TextureSample from "../nodes/TextureSample"
import TextureCoords from "../nodes/static/TextureCoords"
import Float from "../nodes/math/Float"
import Divide from "../nodes/math/Divide"
import Sine from "../nodes/math/Sine"
import NormalVector from "../nodes/static/NormalVector"
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping"
import RGB from "../nodes/RGB"
import ToTangentSpace from "../nodes/static/ToTangentSpace"
import AbsoluteWorldPosition from "../nodes/static/AbsoluteWorldPosition"
import ViewDirection from "../nodes/static/ViewDirection"
import CameraCoords from "../nodes/static/CameraCoords"
import ElapsedTime from "../nodes/static/ElapsedTime"
import Multiply from "../nodes/math/Multiply"
import PerlinNoise from "../nodes/math/PerlinNoise"
import BreakVec2 from "../nodes/vec/BreakVec2"
import BreakVec3 from "../nodes/vec/BreakVec3"
import BreakVec4 from "../nodes/vec/BreakVec4"
import DotVec2 from "../nodes/vec/DotVec2"
import DotVec3 from "../nodes/vec/DotVec3"
import DotVec4 from "../nodes/vec/DotVec4"
import LerpVec2 from "../nodes/vec/LerpVec2"
import LerpVec3 from "../nodes/vec/LerpVec3"
import LerpVec4 from "../nodes/vec/LerpVec4"
import Max from "../nodes/math/Max"
import Min from "../nodes/math/Min"
import Vec2 from "../nodes/vec/Vec2"
import Vec3 from "../nodes/vec/Vec3"
import Vec4 from "../nodes/vec/Vec4"
import OneMinus from "../nodes/math/OneMinus"
import Saturate from "../nodes/math/Saturate"
import Clamp from "../nodes/math/Clamp"
import Saturation from "../nodes/math/Saturation"
import Pow from "../nodes/math/Pow"
import MakeVector from "../nodes/vec/MakeVector"
import Cosine from "../nodes/math/Cosine"
import SineH from "../nodes/math/SineH"
import CosineH from "../nodes/math/CosineH"
import DDX from "../nodes/math/DDX"
import DDY from "../nodes/math/DDY"
import Normalize from "../nodes/math/Normalize"
import Reflect from "../nodes/math/Reflect"
import Refract from "../nodes/math/Refract"
import Tan from "../nodes/math/Tan"
import EmbeddedTextureSample from "../nodes/EmbeddedTextureSample"

export default function getNewInstance(name) {

    switch (name) {
    case Cosine.name:
        return new Cosine()
    case Sine.name:
        return new Sine()
    case SineH.name:
        return new SineH()
    case CosineH.name:
        return new CosineH()
    case Tan.name:
        return new Tan()
    case DDX.name:
        return new DDX()
    case DDY.name:
        return new DDY()
    case Reflect.name:
        return new Reflect()
    case Refract.name:
        return new Refract()
    case Normalize.name:
        return new Normalize()

    case Material.name:
        return new Material()
    case SceneColor:
        return new SceneColor()
    case Add:
        return new Add()
    case TextureSample.name:
        return new TextureSample()
    case TextureCoords.name:
        return new TextureCoords()
    case Float.name:
        return new Float()
    case Divide.name:
        return new Divide()
    case NormalVector.name:
        return new NormalVector()
    case ParallaxOcclusionMapping.name:
        return new ParallaxOcclusionMapping()
    case RGB.name:
        return new RGB()
    case ToTangentSpace.name:
        return new ToTangentSpace()
    case AbsoluteWorldPosition.name:
        return new AbsoluteWorldPosition()
    case ViewDirection.name:
        return new ViewDirection()
    case CameraCoords.name:
        return new CameraCoords()
    case ElapsedTime.name:
        return new ElapsedTime()
    case Multiply.name:
        return new Multiply()
    case PerlinNoise.name:
        return new PerlinNoise()
    case BreakVec2.name:
        return new BreakVec2()
    case BreakVec3.name:
        return new BreakVec3()
    case BreakVec4.name:
        return new BreakVec4()
    case DotVec2.name:
        return new DotVec2()
    case DotVec3.name:
        return new DotVec3()
    case DotVec4.name:
        return new DotVec4()
    case LerpVec2.name:
        return new LerpVec2()
    case LerpVec3.name:
        return new LerpVec3()
    case LerpVec4.name:
        return new LerpVec4()
    case Max.name:
        return new Max()
    case Min.name:
        return new Min()
    case Vec2.name:
        return new Vec2()
    case Vec3.name:
        return new Vec3()
    case Vec4.name:
        return new Vec4()
    case OneMinus.name:
        return new OneMinus()
    case Saturate.name:
        return new Saturate()
    case Clamp.name:
        return new Clamp()
    case Saturation.name:
        return new Saturation()
    case Pow.name:
        return new Pow()
    case MakeVector.name:
        return new MakeVector()
    case EmbeddedTextureSample.name:
        return new TextureSample()
    default:
        return null
    }
}