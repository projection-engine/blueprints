import randomID from "../utils/randomID";

export default class Node{
    constructor(inputs, outputs) {
        this.x = 10
        this.y = 10
        this.id = randomID()
        this.outputs = outputs ? outputs : []
        this.inputs = inputs ? inputs : []
    }
}