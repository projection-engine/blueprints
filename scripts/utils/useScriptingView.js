import {useContext, useEffect, useState} from "react"
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider"
import EventTick from "./nodes/events/EventTick"
import EVENTS from "../../../../../static/misc/EVENTS"
import Getter from "./nodes/utils/Getter"
import Setter from "./nodes/utils/Setter"
import ProjectLoader from "../../../../templates/ProjectLoader"
import COMPONENTS from "../../../../engine/templates/COMPONENTS"
import {ENTITY_ACTIONS} from "../../../../engine/useEngineEssentials"
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


export default function useScriptingView(file, engine = {}, load, isLevelBlueprint) {
    const {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,
    } = useFlow()

    const [variables, setVariables] = useState([])
    const quickAccess = useContext(QuickAccessProvider)


    useEffect(() => {
        load.pushEvent(EVENTS.LOADING)
        if (engine.gpu || isLevelBlueprint)
            parse(file, quickAccess, setNodes, setLinks, setVariables, setGroups, load, engine, quickAccess.fileSystem, isLevelBlueprint).then(() => load.finishEvent(EVENTS.LOADING))
    }, [file, engine.gpu])


    return {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,

        variables, setVariables,
        quickAccess, load
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

async function parse(file, quickAccess, setNodes, setLinks, setVariables, setGroups, load, engine, fileSystem, isLevelBlueprint) {
    if (!isLevelBlueprint) {
        const res = await quickAccess.fileSystem
            .readRegistryFile(file.registryID)

        if (res) {
            const file = await quickAccess.fileSystem
                .readFile(quickAccess.fileSystem.path + FileSystem.sep + "assets" +FileSystem.sep +  res.path, "json")
            parseFile(file, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint)

        } else
            load.finishEvent(EVENTS.LOADING_MATERIAL)
    } else {
        const res = await quickAccess.fileSystem.readFile(quickAccess.fileSystem.path + FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT)
        if (!res)
            await quickAccess.fileSystem.writeFile(FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT, JSON.stringify({
                nodes: [],
                links: [],
                variables: [],
                groups: []
            }))
        else {
            const f = await quickAccess.fileSystem.readFile(quickAccess.fileSystem.path + FileSystem.sep + "levelBlueprint"+FILE_TYPES.SCRIPT, "json")
            parseFile(f, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint)
        }
    }
}

function parseFile(file, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint) {

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
        if (file.entities && !isLevelBlueprint) {
            ProjectLoader.loadMeshes(file.entities.map(e => e.components[COMPONENTS.MESH].meshID), fileSystem, engine.gpu)
                .then(async meshes => {
                    engine.setMeshes(meshes.filter(m => m))
                    const entities = []
                    for (let i = 0; i < file.entities.length; i++) {
                        const e = file.entities[i]
                        entities.push(await ProjectLoader.mapEntity(e, i, fileSystem, engine.gpu))
                    }
                    engine.dispatchEntities({
                        type: ENTITY_ACTIONS.DISPATCH_BLOCK,
                        payload: entities
                    })
                })
        }


        load.finishEvent(EVENTS.LOAD_FILE)
    } else
        load.finishEvent(EVENTS.LOAD_FILE)

}