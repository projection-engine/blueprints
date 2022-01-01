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

export default function parseNodes(nodes) {
    const updatePlacement = (obj, node) => {
        node.x = obj.x
        node.y = obj.y

        node.id = obj.id
    }
    return nodes === undefined || nodes === null || nodes.length === 0 ? [] : nodes.map(n => {
        switch (n.instanceOf) {
            case 'Constant': {
                const newClass = new Constant()
                newClass.value = n.values
                updatePlacement(n, newClass)
                return newClass
            }
            case 'PBRMaterial': {
                const newClass = new PBRMaterial()
                newClass.specular = n.specular
                newClass.metallic = n.metallic
                newClass.baseColor = n.baseColor
                newClass.ao = n.ao
                newClass.normal = n.normal
                newClass.roughness = n.roughness
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Vector2D': {
                const newClass = new Vector2D()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'VectorScalar' : {
                const newClass = new VectorScalar()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'AddVector': {
                const newClass = new AddVector()
// TODO

                updatePlacement(n, newClass)
                return newClass
            }
            case 'Vector4D' : {
                const newClass = new Vector4D()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Vector3D': {
                const newClass = new Vector3D()
                updatePlacement(n, newClass)
// TODO
                return newClass
            }
            case 'SubtractVector': {
                const newClass = new SubtractVector()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Array': {
                const newClass = new ObjectArray()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'CrossProduct': {
                const newClass = new CrossProduct()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Subtract': {
                const newClass = new Subtract()
                newClass.response = n.response
                newClass.constA = n.constA
                newClass.constB = n.constB
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Add': {
                const newClass = new Add()
                newClass.response = n.response
                newClass.constA = n.constA
                newClass.constB = n.constB
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Multiply': {
                const newClass = new Multiply()
                newClass.response = n.response
                newClass.constA = n.constA
                newClass.constB = n.constB
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Divide': {
                const newClass = new Divide()
                newClass.response = n.response
                newClass.constA = n.constA
                newClass.constB = n.constB
                updatePlacement(n, newClass)
                return newClass
            }
            case 'DotProduct': {
                const newClass = new DotProduct()
// TODO
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Rgba': {
                const newClass = new Rgba()
                newClass.rgba = n.rgba
                newClass.r = n.r
                newClass.g = n.g
                newClass.b = n.b
                newClass.a = n.a
                newClass.updateShowcase()
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Rgb': {
                const newClass = new Rgb()
                newClass.rgb = n.rgb
                newClass.r = n.r
                newClass.g = n.g
                newClass.b = n.b

                newClass.updateShowcase()
                updatePlacement(n, newClass)
                return newClass
            }
            case 'Power': {
                const newClass = new Power()
                newClass.response = n.response
                newClass.constA = n.constA
                newClass.constB = n.constB
                updatePlacement(n, newClass)
                return newClass

            }
            case 'BasicMaterial' : {
                const newClass = new BasicMaterial()

                newClass.specular = n.specular
                newClass.shininess = n.shininess
                newClass.ambientColor = n.ambientColor
                newClass.diffuse = n.diffuse

                updatePlacement(n, newClass)
                return newClass
            }
            default:
                return n
        }
    })
}
