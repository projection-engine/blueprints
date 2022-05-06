import styles from '../styles/Available.module.css'

import Search from "../../../../../components/search/Search";
import {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "@f-ui/core";

export default function Available(props) {
    const [searchString, setSearchString] = useState('')
    const nodes = useMemo(() => {
        return props.allNodes.filter(i => {
            if (typeof i.label === "object")
                return i.label.props.children.includes(searchString)
            else
                return i.label.includes(searchString)
        })
    }, [searchString])
    const [hidden, setHidden] = useState(false)

    return (
        <div className={styles.wrapper} style={{width: hidden ? '35px' : undefined, minWidth: hidden ? undefined : '250px'}}>
            <div className={styles.header} style={{justifyItems: hidden ? 'center' : 'flex-start'}}>
                {props.canBeHidden ? (
                        <div style={{display: 'flex', flexDirection: hidden ? 'column' : undefined, alignItems: 'center'}}>
                            <Button onClick={() => setHidden(!hidden)} className={styles.hideButton}>
                                <div
                                    className={'material-icons-round'}
                                    style={{fontSize: '1rem'}}>{!hidden ? 'menu_open' : 'menu'}</div>
                            </Button>
                            <label className={hidden ? styles.vertLabel : undefined}>
                                Available nodes
                            </label>
                        </div>
                    )
                    :
                    'Available nodes'
                }
                {hidden ? null : <Search width={'100%'} noPadding={true} height={'20px'} searchString={searchString}
                                         setSearchString={setSearchString}/>}

            </div>

            <div className={styles.content} style={{display: hidden ? 'none' : undefined}}>
                {nodes.map((d, i) => (
                    <div
                        className={styles.option}
                        draggable={true}
                        title={d.tooltip}
                        style={{background: i % 2 === 0 ? 'var(--fabric-background-secondary)' : undefined}}
                        onDragStart={e => e.dataTransfer.setData('text', d.dataTransfer)}
                        key={d.dataTransfer + '-' + i}
                    >
                        <div className={styles.icon}>
                            {d.icon}
                        </div>
                        {d.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

Available.propTypes = {
    canBeHidden: PropTypes.bool,
    allNodes: PropTypes.array
}