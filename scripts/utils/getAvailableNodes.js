import {allNodes} from "../templates/AllNodes";
import styles from "../../components/styles/Board.module.css";
import Getter from "../nodes/utils/Getter";
import Setter from "../nodes/utils/Setter";
import React from "react";

import {v4 as uuidv4} from 'uuid';

export default function getAvailableNodes(hook){
    return [...allNodes, ...hook.variables.map(v => {
        return [
            {
                label: <label className={styles.label}>Getter - {v.name}</label>,
                dataTransfer: JSON.stringify({
                    key: v.id,
                    type: 'getter'
                }),
                getNewInstance: () => new Getter(v.id + '/getter/' + uuidv4(), v.name, v.type)
            },
            {
                label: <label className={styles.label}>Setter - {v.name}</label>,
                dataTransfer: JSON.stringify({
                    key: v.id,
                    type: 'setter'
                }),
                getNewInstance: () => new Setter(v.id + '/setter/' + uuidv4(), v.name, v.type)
            },
        ]
    }).flat()]
}