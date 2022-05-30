import Board from "../components/components/Board";
import s from './styles/MaterialView.module.css'
import {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import ResizableBar from "../../../../components/resizable/ResizableBar";
import Available from "../components/components/Available";
import NodeEditor from "./components/NodeEditor";
import {allNodes} from "./utils/AllNodes";
import useMaterialView from "./utils/useMaterialView";
import CompilationStatus from "./components/CompilationStatus";
import options from './utils/options'
import compileShaders from "./utils/compileShaders";
import {AlertProvider} from "@f-ui/core";
import FileOptions from "../../../../components/file-options/FileOptions";
import useHotKeys from "../../../utils/hooks/useHotKeys";
import getHotKeys from "../scripts/utils/getHotKeys";

export default function MaterialView(props) {
    const {engine, submitPackage} = props
    const alert = useContext(AlertProvider)
    const setAlert = ({message, type}) => alert.pushAlert(message, type)
    const {registryID, name} = props
    const [scale, setScale] = useState(1)
    const [status, setStatus] = useState({})
    const hook = useMaterialView({registryID, name}, setAlert)
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof MaterialView), [hook.nodes])
    const [init, setInit] = useState(false)

    useEffect(() => {
        if ((!init && hook.links.length > 0 || hook.impactingChange && hook.realTime) && engine.renderer) {
            setInit(true)
            compileShaders(setAlert, hook, setStatus).catch()
        }
    }, [hook.impactingChange, engine.renderer, hook.realTime, hook.links, init])
    const optionsData = useMemo(() => {
        return options(() => compileShaders(setAlert, hook, setStatus).catch(), hook, submitPackage)
    }, [hook.nodes, hook.links, engine.gpu, hook.changed, hook.impactingChange, hook.realTime])
    const [toCopy, setToCopy] = useState([])
    useHotKeys({
        focusTarget: registryID + '-board',
        actions: getHotKeys(hook, setAlert, toCopy, setToCopy, () => optionsData[1].onClick())
    })
    return (<div style={{display: 'flex', overflow: 'hidden', height: '100%'}}>
        <FileOptions options={optionsData}/>
        <div className={s.wrapper} id={registryID + '-board'}>
            <Available
                allNodes={allNodes}
                styles={{
                    borderRadius: '0px',
                    borderBottomRightRadius: '5px',
                    borderTopRightRadius: '5px',
                    width: '250px'
                }}
            />
            <ResizableBar type={"width"}/>
            <div className={s.view}>
                <div className={s.boardAvailable}>
                    <Board
                        scale={scale} setScale={setScale}
                        allNodes={allNodes}
                        setAlert={setAlert}
                        hook={hook}
                        selected={hook.selected}
                        setSelected={hook.setSelected}
                    />
                    <ResizableBar type={"width"}/>
                    <div className={s.content}>
                        <NodeEditor
                            hook={hook}
                            engine={engine}
                            selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}/>
                        <ResizableBar type={'height'} color={'var(--fabric-border-primary)'}/>
                        <CompilationStatus status={status}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

MaterialView.propTypes = {
    submitPackage: PropTypes.func.isRequired,
    registryID: PropTypes.string,
    name: PropTypes.string,
    engine: PropTypes.object
}