import Node from '../Node'
import {linearAlgebraMath} from "pj-math";

export default class Operation extends Node {
    valueA = 0
    valueB = 0
    response = 0
    type = 'addition'

    constructor(valueA, valueB, type = 'addition') {
        super();
        this.valueA = valueA
        this.valueB = valueB
        this.response()
        this.type = type
    }

    get type() {
        return this.type
    }

    get valueA() {
        return this.valueA
    }

    set valueA(v) {
        this.valueA = v
    }

    get valueB() {
        return this.valueB
    }

    set valueB(v) {
        this.valueB = v
    }

    set response(_) {
        switch (this.type()) {
            case 'addition': {
                if (Array.isArray(this.valueA) && Array.isArray(this.valueB)) {
                    // vector
                    this.response = linearAlgebraMath.add(this.valueA, this.valueB)
                } else
                    this.response = this.valueA + this.valueB
                break
            }
            case 'multiplication': {
                // only numbers
                this.response = this.valueA * this.valueB
                break
            }
            case 'subtraction': {
                if (Array.isArray(this.valueA) && Array.isArray(this.valueB)) {
                    // vector
                    this.response = linearAlgebraMath.add(this.valueA, this.valueB)
                } else
                    this.response = this.valueA - this.valueB
                break
            }
            case 'division': {
                // only numbers
                this.response = this.valueA / this.valueB
                break
            }
            default:
                break
        }

    }

    get response() {
        return this.response
    }
}