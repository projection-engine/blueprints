import Board from "./components/Board";
import usePrototype from "./hooks/usePrototype";
import NodeEditor from "./components/NodeEditor";
import Available from "./components/Available";
import styles from './styles/Board.module.css'

import {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";


import ControlProvider from "../../components/tabs/components/ControlProvider";
import ResizableBar from "../../components/resizable/ResizableBar";
import MaterialClass from './workflows/material/Material'
import EVENTS from "../../pages/project/utils/misc/EVENTS";
import compile from "./utils/compile";
import ImageProcessor from "../../services/workers/ImageProcessor";
import applyViewport from "./utils/applyViewport";
import useHotKeys, {KEYS} from "../../services/hooks/useHotKeys";
import {ENTITY_ACTIONS} from "../../services/engine/ecs/utils/entityReducer";
import cloneClass from "../../pages/project/utils/misc/cloneClass";
import randomID from "../../pages/project/utils/misc/randomID";
import deleteNode from "./utils/deleteNode";


export default function MaterialView(props) {
    const hook = usePrototype(props.file)
    const ref = useRef()
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n.constructor.name === MaterialClass.constructor.name)
    }, [hook.nodes])

    const controlProvider = useContext(ControlProvider)

    const mapNodes = (res) => {
        const parsedNodes = hook.nodes.map(n => {
            const docNode = document.getElementById(n.id).parentNode
            const transformation = docNode
                .getAttribute('transform')
                .replace('translate(', '')
                .replace(')', '')
                .split(' ')

            return {
                ...n,
                x: parseFloat(transformation[0]),
                y: parseFloat(transformation[1]),
                instance: n.constructor.name,
                sample: n.sample && typeof n.sample === 'object' ? {registryID: n.sample.registryID} : undefined
            }
        })

        return JSON.stringify({
            nodes: parsedNodes,
            links: hook.links,
            response: res
        })
    }
    useEffect(() => {
        controlProvider.setTabAttributes(
            [
                {
                    label: 'Save',
                    disabled: hook.disabled,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
                    onClick: () => {
                        hook.load.pushEvent(EVENTS.LOADING_MATERIAL)
                        compile(hook.load, hook.nodes, hook.links, hook.quickAccess.fileSystem)
                            .then(res => {
                                applyViewport(res, hook.engine, hook.load)
                                props.submitPackage(
                                    res.albedo ? res.albedo : ImageProcessor.colorToImage('rgb(128, 128, 128)'),
                                    mapNodes(res),
                                    false
                                )
                            })
                    }
                },
                {
                    label: 'Save & close',
                    disabled: hook.disabled,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>,
                    onClick: () => {
                        hook.load.pushEvent(EVENTS.LOADING_MATERIAL)
                        compile(hook.load, hook.nodes, hook.links, hook.quickAccess.fileSystem)
                            .then(res => {
                                props.submitPackage(
                                    res.albedo ? res.albedo : ImageProcessor.colorToImage('rgb(128, 128, 128)'),
                                    mapNodes(res),
                                    true
                                )
                            })
                    }
                },
                {
                    label: 'Apply',
                    group: 'b',
                    disabled: hook.disabled,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>check</span>,
                    onClick: () => {
                        hook.load.pushEvent(EVENTS.LOADING_MATERIAL)
                        compile(hook.load, hook.nodes, hook.links, hook.quickAccess.fileSystem)
                            .then(res => {
                                applyViewport(res, hook.engine, hook.load)
                            })

                    }
                }
            ],
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

    }, [hook.nodes, hook.links, hook.engine.gpu, hook.engine.gpu])
    const [toCopy, setToCopy] = useState()
    useHotKeys({
        disabled: controlProvider.tab !== props.index,
        actions: [
            {
                require: [KEYS.ControlLeft, KEYS.KeyS],
                callback: () => {
                    props.serializer.save()
                }
            },
            {
                require: [KEYS.ControlLeft, KEYS.KeyC],
                callback: () => {
                    setToCopy(props.engine.selectedElement)
                    if (props.engine.selectedElement)
                        props.setAlert({
                            type: 'info',
                            message: 'Entity copied.'
                        })
                }
            },
            {
                require: [KEYS.ControlLeft, KEYS.ShiftLeft, KEYS.KeyF],
                callback: () => {
                    // TODO
                }
            },
            {
                require: [KEYS.Delete],
                callback: () => {

                    hook.selected.forEach(n => {
                        if (!(hook.nodes.find(nod => nod.id === n) instanceof MaterialClass))
                            deleteNode(n, hook)
                    })
                }
            },
            {
                require: [KEYS.ControlLeft, KEYS.KeyV],
                callback: () => {
                    // TODO
                }
            }
        ]
    })

    return (
        <div className={styles.prototypeWrapper} ref={ref}>
            <NodeEditor hook={hook}
                        engine={hook.engine}
                        selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}/>
            <ResizableBar type={"width"}/>
            <div className={styles.prototypeWrapperBoard}>
                <Board
                    setAlert={props.setAlert}
                    parentRef={ref}
                    hook={hook}
                    selected={hook.selected}
                    setSelected={hook.setSelected}
                />
            </div>
            <Available/>
        </div>
    )
}

MaterialView.propTypes = {
    index: PropTypes.number.isRequired,
    setAlert: PropTypes.func.isRequired,
    file: PropTypes.shape({
        fileID: PropTypes.string,
        name: PropTypes.string,
        blob: PropTypes.any,
        type: PropTypes.string,
    }),
    submitPackage: PropTypes.func.isRequired,

}