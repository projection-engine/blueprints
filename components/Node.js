import {v4 as uuidv4} from 'uuid';

export default class Node{
    canBeDeleted = true
    dynamicInputs = false
    size = 0
    constructor(inputs, output=[], dynamicInputs) {
        this.x = 10
        this.y = 10
        this.id = uuidv4()
        this.output = output
        this.inputs = inputs ? inputs : []

        this.dynamicInputs = dynamicInputs
    }

    expandInput(){}
    compile(){}
}