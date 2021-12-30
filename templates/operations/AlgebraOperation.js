import Node from '../Node'
import {linearAlgebraMath} from "pj-math";

export default class AlgebraOperation extends Node {
    type = 'addition'

    constructor(nodeA, nodeB, type = 'addition') {
        super([
            {label: 'Vector', key: 'nodeA'},
            {label: 'Vector 2', key: 'nodeB'}
        ],
            [
                {label: 'Vector 3', key: 'response'}
            ]);
        this.nodeA = nodeA
        this.nodeB = nodeB
        this.type = type

        this.name = 'Vector  ' + type
    }


    process(valueA, valueB) {
        switch (this.type) {
            case'addition': {
                if (Array.isArray(valueA) && Array.isArray(valueB)) {
                    // vector
                    return linearAlgebraMath.add(valueA, valueB)
                } else
                    return valueA + valueB

            }
            case'multiplication': {
                // only numbers
                return valueA * valueB

            }
            case'subtraction': {
                if (Array.isArray(valueA) && Array.isArray(valueB)) {
                    // vector
                    return linearAlgebraMath.add(valueA, valueB)
                } else
                    return valueA - valueB

            }
            case'division': {
                return valueA / valueB
            }
            default:
                return
        }
    }
}