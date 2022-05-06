import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";
import KEYS from "../../../../../engine/templates/KEYS";


export default class KeyPress extends Node {

    constructor() {
        super(
            [
                {
                    label: 'Key',
                    key: 'key',
                    type: DATA_TYPES.OPTIONS,
                    bundled: true,
                    options: Object.keys(KEYS).map(k => {
                        return {
                            value: k,
                            label: KEYS[k],
                        }
                    })
                },
            ],
            [
                {label: 'Holding', key: 'holding', type: DATA_TYPES.EXECUTION, showTitle: true},
                {label: 'Pressed', key: 'pressed', type: DATA_TYPES.EXECUTION, showTitle: true},
                {label: 'Released', key: 'released', type: DATA_TYPES.EXECUTION, showTitle: true}
            ]);
        this.size = 1
        this.name = 'KeyPress'
    }

    get type() {
        return NODE_TYPES.START_POINT
    }

    getFunctionCall() {
        return `
           if(params.pressedKeys['${this.key}'] && !this.state['${this.key}Pressed']){
           
                this.state['${this.key}Pressed'] = true
                if( this.${this.onKeyDown})
                this.${this.onKeyDown}(params)
           }
          else if(params.pressedKeys['${this.key}'] && this.state['${this.key}Pressed']){
                if( this.${this.onHold})
                    this.${this.onHold}(params)
                }
          else if(!params.pressedKeys['${this.key}'] && this.state['${this.key}Pressed'])    {
                this.state['${this.key}Pressed'] = false
                  if( this.${this.onRelease})
                    this.${this.onRelease}(params)
           } 
        `
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionInstance(content = '', index, entryPoint) {
        this.onKeyDown = `onKeyDown${index}`
        this.onHold = `onHold${index}`
        this.onRelease = `onRelease${index}`
        switch (entryPoint.key) {
            case 'holding':
                return `
            ${this.onHold}(params){
                ${content}
            }`
            case 'pressed':
                return `
            ${this.onKeyDown}(params){
                ${content}
            }`
            case 'released':
                return `
            ${this.onRelease}(params){
                ${content}
            }`
            default:
                return ''
        }

    }

}