import {useEffect, useState} from "react"
import EventTick from "./nodes/events/EventTick"
import Getter from "./nodes/utils/Getter"
import Setter from "./nodes/utils/Setter"
import SetViewTarget from "./nodes/camera/SetViewTarget"
import OnSpawn from "./nodes/events/OnSpawn"
import useFlow from "../../components/hooks/useFlow"
import EntityReference from "./nodes/utils/EntityReference"
import Add from "./nodes/math/Add"
import Print from "./nodes/utils/Print"
import ConstantNumber from "./nodes/math/ConstantNumber"
import GetCameraPosition from "./nodes/camera/GetCameraPosition"
import SetCameraPosition from "./nodes/camera/SetCameraPosition"
import Subtract from "./nodes/math/Subtract"
import Multiply from "./nodes/math/Multiply"
import Divide from "./nodes/math/Divide"
import KeyPress from "./nodes/events/KeyPress"
import FILE_TYPES from "../../../../../../public/project/glTF/FILE_TYPES"
import FileSystem from "../../../../utils/files/FileSystem"


export default function useScriptingView(file, isLevelBlueprint) {
    const {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,
    } = useFlow()

    const [variables, setVariables] = useState([])


    useEffect(() => {
        parse(file,  setNodes, setLinks, setVariables, setGroups, isLevelBlueprint).catch()
    }, [])


    return {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,

        variables, setVariables
    }
}


const INSTANCES = {

    [EventTick.name]: () => new EventTick(),
    [Getter.name]: () => new Getter(),
    [Setter.name]: () => new Setter(),


    [SetViewTarget.name]: () => new SetViewTarget(),
    [OnSpawn.name]: () => new OnSpawn(),
    [EntityReference.name]: () => new EntityReference(),
    [ConstantNumber.name]: () => new ConstantNumber(),
    [Add.name]: () => new Add(),
    [Print.name]: () => new Print(),


    [GetCameraPosition.name]: () => new GetCameraPosition(),
    [SetCameraPosition.name]: () => new SetCameraPosition(),
    [Subtract.name]: () => new Subtract(),
    [Multiply.name]: () => new Multiply(),
    [Divide.name]: () => new Divide(),

    [KeyPress.name]: () => new KeyPress(),
}

async function parse(file,  setNodes, setLinks, setVariables, setGroups, isLevelBlueprint) {
    if (!isLevelBlueprint) {
        const res = await document.fileSystem
            .readRegistryFile(file.registryID)

        if (res) {
            const file = await document.fileSystem
                .readFile(document.fileSystem.path + FileSystem.sep + "assets" +FileSystem.sep +  res.path, "json")
            parseFile(file, setLinks, setNodes, setVariables, setGroups)

        } 
    } else {
        const res = await document.fileSystem.readFile(document.fileSystem.path + FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT)
        if (!res)
            await document.fileSystem.writeFile(FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT, JSON.stringify({
                nodes: [],
                links: [],
                variables: [],
                groups: []
            }))
        else {
            const f = await document.fileSystem.readFile(document.fileSystem.path + FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT, "json")
            parseFile(f,  setLinks, setNodes, setVariables, setGroups)
        }
    }
}

function parseFile(file, setLinks, setNodes, setVariables, setGroups) {

    if (file && Object.keys(file).length > 0) {
        const newNodes = file.nodes.map(f => {
            const i = INSTANCES[f.instance]()
            Object.keys(f).forEach(o => {
                if (o !== "size")
                    i[o] = f[o]
            })
            return i
        })

        setNodes(newNodes)
        setLinks(file.links)
        if (file.groups)
            setGroups(file.groups)
        if (file.variables)
            setVariables(file.variables)
    }

}