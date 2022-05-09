import Material from "../nodes/Material";
import SceneColor from "../nodes/SceneColor";
import Add from "../nodes/math/Add";
import TextureSample from "../nodes/TextureSample";
import TextureCoords from "../nodes/static/TextureCoords";
import Float from "../nodes/math/Float";
import Divide from "../nodes/math/Divide";
import Sine from "../nodes/math/Sine";
import NormalVector from "../nodes/static/NormalVector";
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import RGB from "../nodes/RGB";
import ToTangentSpace from "../nodes/static/ToTangentSpace";
import AbsoluteWorldPosition from "../nodes/static/AbsoluteWorldPosition";
import ViewDirection from "../nodes/static/ViewDirection";
import CameraCoords from "../nodes/static/CameraCoords";
import ElapsedTime from "../nodes/static/ElapsedTime";
import Multiply from "../nodes/math/Multiply";
import PerlinNoise from "../nodes/math/PerlinNoise";
import BreakVec2 from "../nodes/vec/BreakVec2";
import BreakVec3 from "../nodes/vec/BreakVec3";
import BreakVec4 from "../nodes/vec/BreakVec4";
import DotVec2 from "../nodes/vec/DotVec2";
import DotVec3 from "../nodes/vec/DotVec3";
import DotVec4 from "../nodes/vec/DotVec4";
import LerpVec2 from "../nodes/vec/LerpVec2";
import LerpVec3 from "../nodes/vec/LerpVec3";
import LerpVec4 from "../nodes/vec/LerpVec4";
import Max from "../nodes/math/Max";
import Min from "../nodes/math/Min";
import Vec2 from "../nodes/vec/Vec2";
import Vec3 from "../nodes/vec/Vec3";
import Vec4 from "../nodes/vec/Vec4";
import OneMinus from "../nodes/math/OneMinus";
import Saturate from "../nodes/math/Saturate";
import Clamp from "../nodes/math/Clamp";
import Saturation from "../nodes/math/Saturation";
import Pow from "../nodes/math/Pow";
import MakeVector from "../nodes/vec/MakeVector";

export default function getInstanceName(instance) {
    switch (true) {
        case instance instanceof Material:
            return 'Material'
        case instance instanceof SceneColor:
            return 'SceneColor'
        case instance instanceof Add:
            return 'Add'
        case instance instanceof TextureSample:
            return 'TextureSample'
        case instance instanceof TextureCoords:
            return 'TextureCoords'
        case instance instanceof Float:
            return 'Float'
        case instance instanceof Divide:
            return 'Divide'
        case instance instanceof Sine:
            return 'Sine'
        case instance instanceof NormalVector:
            return 'NormalVector'
        case instance instanceof ParallaxOcclusionMapping:
            return 'ParallaxOcclusionMapping'
        case instance instanceof RGB:
            return 'RGB'
        case instance instanceof ToTangentSpace:
            return 'ToTangentSpace'
        case instance instanceof AbsoluteWorldPosition:
            return 'AbsoluteWorldPosition'
        case instance instanceof ViewDirection:
            return 'ViewDirection'
        case instance instanceof CameraCoords:
            return 'CameraCoords'
        case instance instanceof ElapsedTime:
            return 'ElapsedTime'
        case instance instanceof Multiply:
            return 'Multiply'
        case instance instanceof PerlinNoise:
            return 'PerlinNoise'
        case instance instanceof BreakVec2:
            return 'BreakVec2'
        case instance instanceof BreakVec3:
            return 'BreakVec3'
        case instance instanceof BreakVec4:
            return 'BreakVec4'
        case instance instanceof DotVec2:
            return 'DotVec2'
        case instance instanceof DotVec3:
            return 'DotVec3'
        case instance instanceof DotVec4:
            return 'DotVec4'
        case instance instanceof LerpVec2:
            return 'LerpVec2'
        case instance instanceof LerpVec3:
            return 'LerpVec3'
        case instance instanceof LerpVec4:
            return 'LerpVec4'
        case instance instanceof Max:
            return 'Max'
        case instance instanceof Min:
            return 'Min'
        case instance instanceof Vec2:
            return 'Vec2'
        case instance instanceof Vec3:
            return 'Vec3'
        case instance instanceof Vec4:
            return 'Vec4'
        case instance instanceof OneMinus:
            return 'OneMinus'
        case instance instanceof Saturate:
            return 'Saturate'
        case instance instanceof Clamp:
            return 'Clamp'
        case instance instanceof Saturation:
            return 'Saturation'
        case instance instanceof Pow:
            return 'Pow'
        case instance instanceof MakeVector:
            return 'MakeVector'
        default:
            return null
    }
}