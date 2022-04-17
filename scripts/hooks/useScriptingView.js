import {useContext, useEffect, useState} from "react";
import QuickAccessProvider from "../../../../pages/project/utils/hooks/QuickAccessProvider";
import EventTick from "../../../../engine/shared/nodes/events/EventTick";
import EVENTS from "../../../../pages/project/utils/utils/EVENTS";
import GetWorldTranslation from "../../../../engine/shared/nodes/transformation/GetWorldTranslation";
import GetWorldRotation from "../../../../engine/shared/nodes/transformation/GetWorldRotation";
import SetWorldTranslation from "../../../../engine/shared/nodes/transformation/SetWorldTranslation";
import SetWorldRotation from "../../../../engine/shared/nodes/transformation/SetWorldRotation";
import QuaternionToEuler from "../../../../engine/shared/nodes/transformation/QuaternionToEuler";
import Getter from "../../../../engine/shared/nodes/utils/Getter";
import Setter from "../../../../engine/shared/nodes/utils/Setter";
import Add from "../../../../engine/shared/nodes/operators/math/Add";
import Subtract from "../../../../engine/shared/nodes/operators/math/Subtract";
import Divide from "../../../../engine/shared/nodes/operators/math/Divide";
import Multiply from "../../../../engine/shared/nodes/operators/math/Multiply";
import SetTransformationRelativeOrigin from "../../../../engine/shared/nodes/transformation/SetTransformationRelativeOrigin";
import SetLocalRotation from "../../../../engine/shared/nodes/transformation/SetLocalRotation";
import ToVector from "../../../../engine/shared/nodes/operators/conversions/ToVector";
import FromVector from "../../../../engine/shared/nodes/operators/conversions/FromVector";
import Print from "../../../../engine/shared/nodes/utils/Print";
import And from "../../../../engine/shared/nodes/operators/boolean/And";
import Branch from "../../../../engine/shared/nodes/branches/Branch";
import Equal from "../../../../engine/shared/nodes/operators/boolean/Equal";
import Greater from "../../../../engine/shared/nodes/operators/boolean/Greater";
import GreaterEqual from "../../../../engine/shared/nodes/operators/boolean/GreaterEqual";
import Less from "../../../../engine/shared/nodes/operators/boolean/Less";
import LessEqual from "../../../../engine/shared/nodes/operators/boolean/LessEqual";
import Nand from "../../../../engine/shared/nodes/operators/boolean/Nand";
import Nor from "../../../../engine/shared/nodes/operators/boolean/Nor";
import Not from "../../../../engine/shared/nodes/operators/boolean/Not";
import NotEqual from "../../../../engine/shared/nodes/operators/boolean/NotEqual";
import Or from "../../../../engine/shared/nodes/operators/boolean/Or";
import MouseX from "../../../../engine/shared/nodes/events/MouseX";
import MouseY from "../../../../engine/shared/nodes/events/MouseY";
import MousePosition from "../../../../engine/shared/nodes/events/MousePosition";
import EntityReference from "../../../../engine/shared/nodes/events/EntityReference";
import ProjectLoader from "../../../../pages/project/utils/workers/ProjectLoader";
import COMPONENTS from "../../../../engine/shared/templates/COMPONENTS";
import {ENTITY_ACTIONS} from "../../../../engine/utils/entityReducer";
import Cos from "../../../../engine/shared/nodes/operators/math/Cos";
import Sin from "../../../../engine/shared/nodes/operators/math/Sin";
import ASin from "../../../../engine/shared/nodes/operators/math/ASin";
import ACos from "../../../../engine/shared/nodes/operators/math/ACos";
import ATan from "../../../../engine/shared/nodes/operators/math/ATan";
import Tan from "../../../../engine/shared/nodes/operators/math/Tan";
import Mod from "../../../../engine/shared/nodes/operators/math/Mod";
import Abs from "../../../../engine/shared/nodes/operators/math/Abs";
import KeyPress from "../../../../engine/shared/nodes/events/KeyPress";
import RotateVector from "../../../../engine/shared/nodes/transformation/RotateVector";
import GetCameraPosition from "../../../../engine/shared/nodes/camera/GetCameraPosition";
import GetCameraRotation from "../../../../engine/shared/nodes/camera/GetCameraRotation";
import SetCameraFOV from "../../../../engine/shared/nodes/camera/SetCameraFOV";
import SetCameraPosition from "../../../../engine/shared/nodes/camera/SetCameraPosition";
import SetCameraRotation from "../../../../engine/shared/nodes/camera/SetCameraRotation";
import UpdateCameraLookAt from "../../../../engine/shared/nodes/camera/UpdateCameraLookAt";
import UpdateCameraProjection from "../../../../engine/shared/nodes/camera/UpdateCameraProjection";
import SetViewTarget from "../../../../engine/shared/nodes/camera/SetViewTarget";
import OnSpawn from "../../../../engine/shared/nodes/events/OnSpawn";
import QuatRotateZ from "../../../../engine/shared/nodes/operators/math/QuatRotateZ";
import QuatRotateY from "../../../../engine/shared/nodes/operators/math/QuatRotateY";
import QuatRotateX from "../../../../engine/shared/nodes/operators/math/QuatRotateX";
import OnInterval from "../../../../engine/shared/nodes/events/OnInterval";
import FollowAround from "../../../../engine/shared/nodes/camera/FollowAround";
import useFlow from "../../base/hooks/useFlow";


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
        if (engine.gpu || isLevelBlueprint)
            parse(file, quickAccess, setNodes, setLinks, setVariables, setGroups, load, engine, quickAccess.fileSystem, isLevelBlueprint)
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
    [GetWorldTranslation.name]: () => new GetWorldTranslation(),
    [GetWorldRotation.name]: () => new GetWorldRotation(),
    [SetWorldTranslation.name]: () => new SetWorldTranslation(),
    [SetWorldRotation.name]: () => new SetWorldRotation(),

    [QuaternionToEuler.name]: () => new QuaternionToEuler(),
    [EventTick.name]: () => new EventTick(),
    [Getter.name]: () => new Getter(),
    [Setter.name]: () => new Setter(),

    [Add.name]: () => new Add(),
    [Subtract.name]: () => new Subtract(),
    [Divide.name]: () => new Divide(),
    [Multiply.name]: () => new Multiply(),

    [SetTransformationRelativeOrigin.name]: () => new SetTransformationRelativeOrigin(),
    [SetLocalRotation.name]: () => new SetLocalRotation(),
    [ToVector.name]: () => new ToVector(),
    [FromVector.name]: () => new FromVector(),

    [Print.name]: () => new Print(),


    [And.name]: () => new And(),
    [Branch.name]: () => new Branch(),
    [Equal.name]: () => new Equal(),
    [Greater.name]: () => new Greater(),
    [GreaterEqual.name]: () => new GreaterEqual(),
    [Less.name]: () => new Less(),
    [LessEqual.name]: () => new LessEqual(),
    [Nand.name]: () => new Nand(),
    [Nor.name]: () => new Nor(),
    [Not.name]: () => new Not(),
    [NotEqual.name]: () => new NotEqual(),
    [Or.name]: () => new Or(),

    [MouseX.name]: () => new MouseX(),
    [MouseY.name]: () => new MouseY(),
    [MousePosition.name]: () => new MousePosition(),
    [EntityReference.name]: () => new EntityReference(),

    [Cos.name]: () => new Cos(),
    [Sin.name]: () => new Sin(),
    [ASin.name]: () => new ASin(),
    [ACos.name]: () => new ACos(),
    [ATan.name]: () => new ATan(),
    [Tan.name]: () => new Tan(),
    [Mod.name]: () => new Mod(),
    [Abs.name]: () => new Abs(),
    [KeyPress.name]: () => new KeyPress(),
    [RotateVector.name]: () => new RotateVector(),
    [GetCameraPosition.name]: () => new GetCameraPosition(),
    [GetCameraRotation.name]: () => new GetCameraRotation(),
    [SetCameraFOV.name]: () => new SetCameraFOV(),
    [SetCameraPosition.name]: () => new SetCameraPosition(),
    [SetCameraRotation.name]: () => new SetCameraRotation(),
    [UpdateCameraLookAt.name]: () => new UpdateCameraLookAt(),
    [UpdateCameraProjection.name]: () => new UpdateCameraProjection(),
    [SetViewTarget.name]: () => new SetViewTarget(),
    [OnSpawn.name]: () => new OnSpawn(),


    [QuatRotateX.name]: () => new QuatRotateX(),
    [QuatRotateY.name]: () => new QuatRotateY(),
    [QuatRotateZ.name]: () => new QuatRotateZ(),

    [OnInterval.name]: () => new OnInterval(),
    [FollowAround.name]: () => new FollowAround()

}

function parse(file, quickAccess, setNodes, setLinks, setVariables, setGroups, load, engine, fileSystem, isLevelBlueprint) {
    if (!isLevelBlueprint)
        quickAccess.fileSystem
            .readRegistryFile(file.registryID)
            .then(res => {
                if (res) {
                    quickAccess.fileSystem
                        .readFile(quickAccess.fileSystem.path + '\\assets\\' + res.path, 'json')
                        .then(file => {
                            parseFile(file, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint)
                        })
                } else
                    load.finishEvent(EVENTS.LOADING_MATERIAL)
            })
    else {
        quickAccess.fileSystem.readFile(quickAccess.fileSystem.path + '\\levelBlueprint.flow')
            .then(async res => {
                if (!res)
                    await quickAccess.fileSystem.createFile('levelBlueprint.flow', JSON.stringify({
                        nodes: [],
                        links: [],
                        variables: [],
                        groups: []
                    }))
                else {
                    const f = await quickAccess.fileSystem.readFile(quickAccess.fileSystem.path + '\\levelBlueprint.flow', 'json')

                    parseFile(f, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint)
                }
            })
    }
}

function parseFile(file, load, engine, setLinks, setNodes, setVariables, setGroups, fileSystem, isLevelBlueprint) {

    if (file && Object.keys(file).length > 0) {
        const newNodes = file.nodes.map(f => {
            const i = INSTANCES[f.instance]()
            Object.keys(f).forEach(o => {
                if (o !== 'size')
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
                .then(meshes => {
                    engine.setMeshes(meshes.filter(m => m))
                    engine.dispatchEntities({
                        type: ENTITY_ACTIONS.DISPATCH_BLOCK,
                        payload: file.entities.map((e, i) => ProjectLoader.mapEntity(e, i, meshes, [], engine.gpu))
                    })
                })
        }


        load.finishEvent(EVENTS.LOAD_FILE)
    } else
        load.finishEvent(EVENTS.LOAD_FILE)

}