import randomID from "../utils/randomID";

export default class Node{
    constructor(width=100, height=200) {
        this.id = randomID()
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
    }
}