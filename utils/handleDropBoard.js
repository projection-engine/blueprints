import Types from "../constants/Types";
import Constant from "../templates/basic/constants/Constant";
import PBRMaterial from "../templates/engine/PBRMaterial";
import Vector2D from "../templates/basic/objects/Vector2D";
import VectorScalar from "../templates/basic/functions/algebra/VectorScalar";
import AddVector from "../templates/basic/functions/algebra/AddVector";
import Vector4D from "../templates/basic/objects/Vector4D";
import Vector3D from "../templates/basic/objects/Vector3D";
import SubtractVector from "../templates/basic/functions/algebra/SubtractVector";
import ObjectArray from "../templates/basic/objects/ObjectArray";
import CrossProduct from "../templates/basic/functions/algebra/CrossProduct";
import Subtract from "../templates/basic/functions/basic/Subtract";
import Add from "../templates/basic/functions/basic/Add";
import Multiply from "../templates/basic/functions/basic/Multiply";
import Divide from "../templates/basic/functions/basic/Divide";
import DotProduct from "../templates/basic/functions/algebra/DotProduct";
import Rgba from "../templates/engine/Rgba";
import Rgb from "../templates/engine/Rgb";
import Power from "../templates/basic/functions/basic/Power";
import BasicMaterial from "../templates/engine/BasicMaterial";

export default function handleDropBoard(data){
    let newNode
    switch (data){
        case Types.CONSTANT:
            newNode = new Constant()
            break
        case Types.PBR:
            newNode = new PBRMaterial()
            break
        case Types.VEC_2D:
            newNode = new Vector2D()
            break
        case Types.VEC_SCALAR:
            newNode = new VectorScalar()
            break
        case Types.VEC_ADD:
            newNode = new AddVector()
            break
        case Types.VEC_4D:
            newNode = new Vector4D()
            break
        case Types.VEC_3D:
            newNode = new Vector3D()
            break
        case Types.VEC_SUB:
            newNode = new SubtractVector()
            break
        case Types.ARRAY:
            newNode = new ObjectArray()
            break
        case Types.CROSS_P:
            newNode = new CrossProduct()
            break
        case Types.SUB:
            newNode = new Subtract()
            break
        case Types.ADD:
            newNode = new Add()
            break
        case Types.MULT:
            newNode = new Multiply()
            break
        case Types.DIV:
            newNode = new Divide()
            break
        case Types.DOT_P:
            newNode = new DotProduct()
            break
        case Types.RGBA:
            newNode = new Rgba(0,0,0, 0)
            break
        case Types.RGB:
            newNode = new Rgb(0,0,0)
            break
        case Types.POW:
            newNode = new Power()
            break
        case Types.BASIC_MAT:
            newNode = new BasicMaterial()
            break
        default:
            break
    }

    return newNode
}