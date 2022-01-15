import Constant from "../workflows/basic/templates/Constant";
import PBRMaterial from "../workflows/material/templates/PBRMaterial";
import Vector2D from "../workflows/algebra/templates/Vector2D";
import VectorScalar from "../workflows/algebra/templates/VectorScalar";
import AddVector from "../workflows/algebra/templates/AddVector";
import Vector4D from "../workflows/algebra/templates/Vector4D";
import Vector3D from "../workflows/algebra/templates/Vector3D";
import SubtractVector from "../workflows/algebra/templates/SubtractVector";
import ObjectArray from "../templates/ObjectArray";
import CrossProduct from "../workflows/algebra/templates/CrossProduct";
import Subtract from "../workflows/basic/templates/Subtract";
import Add from "../workflows/basic/templates/Add";
import Multiply from "../workflows/basic/templates/Multiply";
import Divide from "../workflows/basic/templates/Divide";
import DotProduct from "../workflows/algebra/templates/DotProduct";
import Rgba from "../workflows/material/templates/Rgba";
import Rgb from "../workflows/material/templates/Rgb";
import Power from "../workflows/basic/templates/Power";
import TextureSample from "../workflows/material/templates/TextureSample";
import {getFetchPromise} from "../../shared/utils/loadMaterial";

export default function parseNodes(database, nodes, responseOBJ, workflow, callback) {
    const updatePlacement = (obj, node) => {
        node.x = obj.x
        node.y = obj.y

        node.id = obj.id
    }

    let parsedNodes = nodes === undefined || nodes === null || nodes.length === 0 ? [] : nodes.map(n => {
        switch (n.instanceOf) {
            case 'Constant': {
                const newClass = new Constant()
                newClass.value = n.values
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

                updatePlacement(n, newClass)
                return newClass
            }
            case 'Rgb': {
                const newClass = new Rgb()
                newClass.rgb = n.rgb
                newClass.r = n.r
                newClass.g = n.g
                newClass.b = n.b

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

            case 'TextureSample': {
                const newClass = new TextureSample()
                newClass.sample = n.sample
                newClass.name = n.name

                updatePlacement(n, newClass)
                return newClass
            }
            default:
                return n
        }
    })

    const loadTexture = (file) => {

        return {
            id: file.id,
            blob: file.blob,
            name: file.name
        }
    }
    if (workflow === "PBRMaterial") {
        let albedo = getFetchPromise(responseOBJ.albedo, database, true),
            metallic = getFetchPromise(responseOBJ.metallic, database, true),
            normal = getFetchPromise(responseOBJ.normal, database, true),
            height = getFetchPromise(responseOBJ.height, database, true),
            ao = getFetchPromise(responseOBJ.ao, database, true),
            roughness = getFetchPromise(responseOBJ.roughness, database, true)

        Promise.all([albedo, metallic, normal, height, ao, roughness]).then(res => {
            const newPBR = new PBRMaterial()
            newPBR.id = responseOBJ.id
            newPBR.name = responseOBJ.name
            parsedNodes.push(newPBR)

            const albedoTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.albedo.ref),
                metallicTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.metallic.ref),
                normalTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.normal.ref),
                heightTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.height.ref),
                aoTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.ao.ref),
                roughnessTexture = parsedNodes.find(n => n instanceof TextureSample && n.sample === responseOBJ.roughness.ref)

            if (albedoTexture)
                albedoTexture.sample = loadTexture(res[0])
            if (metallicTexture)
                metallicTexture.sample = loadTexture(res[1])
            if (normalTexture)
                normalTexture.sample = loadTexture(res[2])
            if (heightTexture)
                heightTexture.sample = loadTexture(res[3])
            if (aoTexture)
                aoTexture.sample = loadTexture(res[4])
            if (roughnessTexture)
                roughnessTexture.sample = loadTexture(res[5])

            parsedNodes = parsedNodes.map(n => {
                if(n.id === albedoTexture?.id)
                    return albedoTexture
                if(n.id === metallicTexture?.id)
                    return metallicTexture
                if(n.id === normalTexture?.id)
                    return normalTexture
                if(n.id === heightTexture?.id)
                    return heightTexture
                if(n.id === aoTexture?.id)
                    return aoTexture
                if(n.id === roughnessTexture?.id)
                    return roughnessTexture

                return n
            })

            console.log(albedoTexture)

            callback(parsedNodes)
        })
    }


}
