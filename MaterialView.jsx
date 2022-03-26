import Board from "../../components/flow/components/Board";
import useMaterialView from "./hooks/useMaterialView";
import NodeEditor from "./components/NodeEditor";
import Available from "./components/Available";
import styles from '../../components/flow/styles/Board.module.css'

import {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";


import ControlProvider from "../../components/tabs/components/ControlProvider";
import ResizableBar from "../../components/resizable/ResizableBar";
import MaterialClass from './nodes/Material'
import EVENTS from "../../services/utils/misc/EVENTS";
import compile from "./utils/compile";
import applyViewport from "./utils/applyViewport";
import useHotKeys, {KEYS} from "../../services/hooks/useHotKeys";
import cloneClass from "../../services/utils/misc/cloneClass";
import randomID from "../../services/utils/misc/randomID";
import deleteNode from "../../components/flow/utils/deleteNode";
import {allNodes} from "./templates/AllNodes";


export default function MaterialView(props) {
    const hook = useMaterialView(props.file)
    const ref = useRef()
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n.constructor.name === MaterialClass.constructor.name)
    }, [hook.nodes])

    const controlProvider = useContext(ControlProvider)

    const mapNodes = (res) => {
        const engine = hook.engine.renderer
        const canvas = engine.canvas
        engine.camera.yaw = .5
        engine.camera.pitch = .5
        engine.camera.radius = 2
        engine.camera.updateViewMatrix()

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


        return {
            preview: canvas.toDataURL(),
            data: JSON.stringify({
                    nodes: parsedNodes,
                    links: hook.links,
                    response: res,
                    type: res.variant

            })
        }
    }

    useEffect(() => {
        controlProvider.setTabAttributes(
            [
                {
                    label: 'Save',
                    disabled: hook.disabled,
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
                    onClick: () => {
                        compile(hook.load, hook.nodes, hook.links, hook.quickAccess.fileSystem, true)
                            .then(res => {

                                applyViewport(res, hook.engine, hook.load)
                                const response = mapNodes(res)
                                props.submitPackage(
                                    response.preview,
                                    response.data,
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
                        compile(hook.load, hook.nodes, hook.links, hook.quickAccess.fileSystem, true)
                            .then(res => {
                                applyViewport(res, hook.engine, hook.load)

                                const response = mapNodes(res)
                                props.submitPackage(
                                    response.preview,
                                    response.data,
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
    const [toCopy, setToCopy] = useState([])
    useHotKeys({
        focusTarget: props.file.fileID + '-board',
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
                    setToCopy(hook.selected)
                    if (hook.selected.length > 0)
                        props.setAlert({
                            type: 'success',
                            message: 'Entities copied.'
                        })
                }
            },
            {
                require: [KEYS.ControlLeft, KEYS.ShiftLeft, KEYS.KeyF],
                callback: () => {
                    const el = document.getElementById(hook.engine.id + '-canvas')
                    if (el) {
                        const target = el.parentNode.parentNode
                        if (target) {
                            if (!document.fullscreenElement)
                                target.requestFullscreen()
                            else
                                document.exitFullscreen()
                        }
                    }

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
                    toCopy.forEach(toC => {
                        const toCopyNode = hook.nodes.find(n => n.id === toC)
                        if (toCopyNode && !(toCopyNode instanceof MaterialClass)) {
                            const nodeEl = document.getElementById(toC)

                            const clone = cloneClass(toCopyNode)
                            clone.id = randomID()
                            clone.x = nodeEl.getBoundingClientRect().x + 5
                            clone.y = nodeEl.getBoundingClientRect().y + 5

                            hook.setNodes(prev => {
                                return [...prev, clone]
                            })
                        }
                    })
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
            <div className={styles.prototypeWrapperBoard} id={props.file.fileID + '-board'}>
                <Board
                    allNodes={allNodes}
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