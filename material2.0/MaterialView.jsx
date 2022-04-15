import Board from "../base/components/Board";

import s from './styles/MaterialView.module.css'
import {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../../../components/tabs/components/ControlProvider";
import ResizableBar from "../../../components/resizable/ResizableBar";

import EVENTS from "../../../services/utils/misc/EVENTS";
import Available from "../base/components/Available";
import compiler from "./compiler/compiler";
import NodeEditor from "./components/NodeEditor";
import MaterialViewport from "./components/MaterialViewport";
import {allNodes} from "./AllNodes";
import useMaterialView from "./hooks/useMaterialView";
import Make from "./utils/Make";
import compile from "../material/utils/compile";
import Material from "./nodes/Material";


export default function MaterialView(props) {
    const [scale, setScale] = useState(1)
    const hook = useMaterialView(props.file, props.setAlert)
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n instanceof Material)
    }, [hook.nodes])
    const controlProvider = useContext(ControlProvider)

    useEffect(() => {
        if (hook.impactingChange) {
            hook.setImpactingChange(false)
            compiler(hook.nodes, hook.links)
        }
    }, [hook.impactingChange])
    useEffect(() => {
        controlProvider.setTabAttributes([
                {
                    label: 'Save',
                    disabled: !hook.changed,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
                    onClick: async () => {
                        const response = await Make(hook, compiler(hook.nodes, hook.links))
                        props.submitPackage(
                            response.preview,
                            response.data,
                            false
                        )
                        hook.setChanged(false)
                        hook.setImpactingChange(false)
                    }
                },
                {
                    label: 'Save & close',
                    disabled: !hook.changed,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>,
                    onClick: async () => {
                        const response = await Make(hook, compiler(hook.nodes, hook.links))
                        props.submitPackage(
                            response.preview,
                            response.data,
                            true
                        )
                        hook.setChanged(false)
                        hook.setImpactingChange(false)
                    }
                }],
            props.file.name,
            <span
                style={{fontSize: '1.2rem'}}
                className={`material-icons-round`}>texture</span>,
            (newTab) => {
                if (newTab === props.index)
                    hook.engine.setCanRender(true)
                else
                    hook.engine.setCanRender(false)
            },
            true,
            props.index
        )

    }, [hook.nodes, hook.links, hook.engine.gpu, hook.changed, hook.impactingChange])

    return (
        <div className={s.wrapper} id={props.file.registryID + '-board'}>
            <NodeEditor
                hook={hook}
                engine={hook.engine}
                selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}/>
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