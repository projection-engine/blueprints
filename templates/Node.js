import randomID from "../../../components/shared/utils/randomID";


export default class Node{
    constructor(inputs, output=[]) {
        this.x = 10
        this.y = 10
        this.id = randomID()
        this.output = output
        this.inputs = inputs ? inputs : []
    }
}