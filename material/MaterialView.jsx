import Board from "../components/components/Board";
import s from './styles/MaterialView.module.css'
import {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../../router/components/ControlProvider";
import ResizableBar from "../../../../components/resizable/ResizableBar";
import Available from "../components/components/Available";
import NodeEditor from "./components/NodeEditor";
import MaterialViewport from "./components/MaterialViewport";
import {allNodes} from "./AllNodes";
import useMaterialView from "./hooks/useMaterialView";
import Material from "./nodes/Material";
import CompilationStatus from "./components/CompilationStatus";
import options from './utils/options'
import compileShaders from "./utils/compileShaders";
import {useParams} from "react-router-dom";
import {AlertProvider} from "@f-ui/core";
import {ROUTER_TYPES} from "../../router/TabRouter";
import useActiveRoute from "../../../hooks/useActiveRoute";


export default function MaterialView(props) {
    const alert = useContext(AlertProvider)

    function setAlert({message, type}) {
        alert.pushAlert(message, type)
    }

    const {registryID, name} = useParams()
    const [scale, setScale] = useState(1)
    const [status, setStatus] = useState({})
    const hook = useMaterialView({registryID, name}, setAlert)

    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof Material), [hook.nodes])
    const controlProvider = useContext(ControlProvider)
    const [init, setInit] = useState(false)

    useEffect(() => {
        if ((!init && hook.links.length > 0 || hook.impactingChange && hook.realTime) && hook.engine.renderer) {
            setInit(true)
            compileShaders(setAlert, hook, setStatus).catch()
        }
    }, [hook.impactingChange, hook.engine.renderer, hook.realTime, hook.links, init])
    useEffect(() => {
        controlProvider.setTabAttributes(options(() => compileShaders(setAlert, hook, setStatus).catch(), hook, props.submitPackage), name,
            <span
                style={{fontSize: '1.2rem'}}
                className={`material-icons-round`}>texture</span>, ROUTER_TYPES.MATERIAL, registryID)

    }, [hook.nodes, hook.links, hook.engine.gpu, hook.changed, hook.impactingChange, hook.realTime])

    useActiveRoute(ROUTER_TYPES.MATERIAL + '/' + registryID + '/' + name, hook.engine.update)


    return (<div className={s.wrapper} id={registryID + '-board'}>
        <div className={s.content}>
            <NodeEditor
                hook={hook}
                engine={hook.engine}
                selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}/>
            <ResizableBar type={'height'}/>
            <CompilationStatus status={status}/>
        </div>
        <ResizableBar type={"width"}/>
        <div className={s.view}>
            <MaterialViewport engine={hook.engine} fileID={registryID}/>
            <ResizableBar type={'height'}/>
            <div className={s.boardAvailable}>
                <Board
                    scale={scale} setScale={setScale}
                    allNodes={allNodes}
                    setAlert={setAlert}
                    hook={hook}
                    selected={hook.selected}
                    setSelected={hook.setSelected}
                />
                <Available allNodes={allNodes} canBeHidden={true}/>
            </div>
        </div>

    </div>)
}

MaterialView.propTypes = {
    submitPackage: PropTypes.func.isRequired,

}