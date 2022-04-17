import {IDS} from "../../../../pages/project/utils/hooks/useMinimalEngine";
import {useRef, useState} from "react";
import styles from "../styles/MaterialViewport.module.css";
import {Button, ToolTip} from "@f-ui/core";
import {ENTITY_ACTIONS} from "../../../../engine/utils/entityReducer";
import MeshComponent from "../../../../engine/shared/ecs/components/MeshComponent";
import PropTypes from "prop-types";
import Viewport from "../../../../components/viewport/Viewport";

export default function MaterialViewport(props) {
    const viewportRef = useRef()
    const [currentMesh, setCurrentMesh] = useState(IDS.SPHERE)
    return (

        <div ref={viewportRef}
             className={styles.wrapper}>
            <Viewport allowDrop={false} engine={props.engine} id={props.engine.id}/>
            <Button
                className={[styles.floating, styles.button].join(' ')}
                styles={{top: '4px', left: '4px'}}
                onClick={() => {
                    viewportRef.current.requestFullscreen()
                }}
            >
                <ToolTip content={'Fullscreen'}/>
                <span
                    className={'material-icons-round'}
                    style={{fontSize: '1.1rem'}}
                >fullscreen</span>
            </Button>
            <div className={[styles.buttonGroup, styles.floating].join(' ')}
                 style={{bottom: '4px', padding: '0 4px'}}>
                <Button
                    className={styles.button}
                    variant={currentMesh === IDS.SPHERE ? 'filled' : undefined}

                    onClick={() => {
                        if(currentMesh !== IDS.SPHERE) {
                            setCurrentMesh(IDS.SPHERE)
                            props.engine.dispatchEntities({
                                type: ENTITY_ACTIONS.UPDATE_COMPONENT,
                                payload: {
                                    entityID: IDS.SPHERE,
                                    key: 'MeshComponent',
                                    data: new MeshComponent(undefined, IDS.SPHERE)
                                }
                            })
                        }
                    }}
                >
                    Sphere
                </Button>
                <Button
                    className={styles.button}
                    variant={currentMesh === IDS.CUBE ? 'filled' : undefined}

                    onClick={() => {
                        if(currentMesh !== IDS.CUBE) {
                            setCurrentMesh(IDS.CUBE)
                            props.engine.dispatchEntities({
                                type: ENTITY_ACTIONS.UPDATE_COMPONENT,
                                payload: {
                                    entityID: IDS.SPHERE,
                                    key: 'MeshComponent',
                                    data: new MeshComponent(undefined, IDS.CUBE)
                                }
                            })
                        }
                    }}
                >
                    Cube
                </Button>
            </div>

        </div>

    )
}
MaterialViewport.propTypes = {
    engine: PropTypes.object.isRequired

}