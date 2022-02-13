import styles from "../../styles/Node.module.css";
import PropTypes from "prop-types";
import {TYPES} from "../../templates/TYPES";
import {ToolTip} from "@f-ui/core";
import {useContext} from "react";
import OnDragProvider from "../../hooks/OnDragProvider";

export default function NodeIO(props) {
    const asInput = (e) => {
        e.preventDefault()
        const data = JSON.parse(e.dataTransfer.getData('text'))
        e.currentTarget.style.background = 'var(--background-1)'

        if (data.type === 'output' && props.data.accept.includes(data.attribute.type))
            props.handleLink(data, {
                attribute: props.data,
                id: props.nodeID
            })
        else if (data.type !== 'output')
            props.setAlert({
                type: 'error',
                message: 'Can\'t link input with input.'
            })
        else
            props.setAlert({
                type: 'error',
                message: 'Invalid type'
            })
    }
    const getType = (a) => {
        switch (a) {
            case TYPES.VEC:
                return 'Vector'
            case TYPES.NUMBER:
                return 'Number'
            case TYPES.STRING:
                return 'String'
            case TYPES.COLOR:
                return 'RGB'
            case TYPES.TEXTURE:
                return 'Texture sample'
        }
    }
    const onDragContext = useContext(OnDragProvider)

    return (
        <div className={styles.attribute}>
            {props.type === 'input' && onDragContext.dragType !== undefined?
                <ToolTip >
                  <div style={{textAlign: 'left', display: 'grid', gap: '8px'}}>
                      Accepts:
                      {props.data.accept?.map((a, i) => (
                          <div className={styles.ioKey} key={i + '-key-' + a}>
                              <div className={styles.iconWrapper} data-valid={`${onDragContext.dragType === a}`}>
                                <span style={{fontSize: '1rem'}}
                                      className={'material-icons-round'}>{onDragContext.dragType === a ? 'check' : 'close'}</span>
                              </div>
                              {getType(a)}
                          </div>
                      ))}
                  </div>
                </ToolTip>
                :
                null}
            {props.type === 'output' ? (
                <div className={styles.overflow} style={{fontWeight: 'normal'}}>
                    {props.data.label}
                </div>
            ) : null}
            <div
                id={props.nodeID + props.data.key}
                className={styles.connection}
                draggable={true}
                onDragOver={e => {
                    e.preventDefault()
                    onDragContext.setDragType(undefined)
                    if (!props.links.includes(props.data.key))
                        e.currentTarget.style.background = 'var(--fabric-accent-color)'
                }}
                style={{background: props.links.includes(props.data.key) ? 'var(--fabric-accent-color' : undefined}}
                onDrop={e => {
                    onDragContext.setDragType(undefined)
                    if (props.type === 'input')
                        asInput(e)
                    else
                        props.setAlert({
                            type: 'error',
                            message: 'Can\'t link with output.'
                        })

                }}
                onDragEnd={props.onDragEnd}
                onDragLeave={e => {
                    e.preventDefault()
                    if (!props.links.includes(props.data.key))
                        e.currentTarget.style.background = 'var(--background-1)'
                }}
                onDrag={props.handleLinkDrag}
                onDragStart={e => {
                    e.dataTransfer
                        .setData(
                            'text',
                            JSON.stringify({
                                id: props.nodeID,
                                type: props.type,
                                attribute: props.data
                            })
                        )

                    if (props.type === 'output')
                        onDragContext.setDragType(props.data.type)
                }}/>
            {props.type === 'input' ? (
                <div className={styles.overflow} style={{fontWeight: 'normal'}}>
                    {props.data.label}
                </div>
            ) : null}
        </div>
    )
}


NodeIO.propTypes = {
    handleLink: PropTypes.func,
    nodeID: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['input', 'output']),
    setAlert: PropTypes.func.isRequired,
    handleLinkDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    data: PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf([TYPES.COLOR, TYPES.NUMBER, TYPES.STRING, TYPES.TEXTURE, TYPES.VEC]),
        accept: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    links: PropTypes.arrayOf(PropTypes.string).isRequired
}