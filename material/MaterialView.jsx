import Board from "../components/components/Board";
import s from './styles/MaterialView.module.css'
import {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../../../../components/tabs/components/ControlProvider";
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
import {v4} from "uuid";

const id = v4().toString()
export default function MaterialView(props) {
    const [scale, setScale] = useState(1)
    const [status, setStatus] = useState({})
    const hook = useMaterialView(props.file, props.setAlert)
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n instanceof Material)
    }, [hook.nodes])
    const controlProvider = useContext(ControlProvider)
    const [init, setInit] = useState(false)

    useEffect(() => {
        if ((!init && hook.links.length > 0 || hook.impactingChange && hook.realTime) && hook.engine.renderer) {
            setInit(true)
            compileShaders(props.setAlert, hook, setStatus).catch()
        }
    }, [hook.impactingChange, hook.engine.renderer, hook.realTime, hook.links, init])
    useEffect(() => {
        controlProvider.setTabAttributes(
            options(() => compileShaders(props.setAlert, hook, setStatus).catch(),
                hook, props.submitPackage),
            props.file.name,
            <span
                style={{fontSize: '1.2rem'}}
                className={`material-icons-round`}>texture</span>,
            (newTab) => {
                if (props.index === newTab)
                    hook.engine.setFocused(true)
                else
                    hook.engine.setFocused(false)
            },
            true,
            props.index
        )

    }, [hook.nodes, hook.links, hook.engine.gpu, hook.changed, hook.impactingChange, hook.realTime])

    return (
        <div className={s.wrapper} id={props.file.registryID + '-board'}>
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
                <MaterialViewport engine={hook.engine} fileID={props.file.registryID}/>
                <ResizableBar type={'height'}/>
                <div className={s.boardAvailable}>
                    <Board
                        scale={scale} setScale={setScale}
                        allNodes={allNodes}
                        setAlert={props.setAlert}
                        hook={hook}
                        selected={hook.selected}
                        setSelected={hook.setSelected}
                    />
                    <Available allNodes={allNodes} canBeHidden={true}/>
                </div>
            </div>

        </div>
    )
}

MaterialView.propTypes = {
    index: PropTypes.number.isRequired,
    setAlert: PropTypes.func.isRequired,
    file: PropTypes.shape({
        registryID: PropTypes.string,
        name: PropTypes.string,
    }),
    submitPackage: PropTypes.func.isRequired,

}