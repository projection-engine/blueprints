import Node from '../basic/Node'
import {RgbaColorPicker} from "react-colorful";
import {TextField} from "@f-ui/core";

export default class Rgba extends Node {
    r = 0
    g = 0
    b = 0
    a = 1
    rgba = {r: 0, g: 0, b: 0, a: 1}

    constructor() {
        super(undefined,
            [{label: 'rgba', type: 'object', key: 'rgba'}]);
        this.name = 'RGBA'


        this.showcase = (
            <div style={{
                border: 'var(--fabric-border-primary) 2px solid',
                backgroundColor: `rgba(${this.r},${this.g},${this.b},${this.a})`,
                height: '47.5px',
                width: '47.5px',
                borderRadius: '5px'
            }}/>
        )

    }
    updateShowcase (r = this.r, g = this.g, b = this.b, a = this.a){
        this.showcase = (
            <div style={{
                border: 'var(--fabric-border-primary) 2px solid',
                backgroundColor: `rgba(${r},${g},${b},${a})`,
                height: '47.5px',
                width: '47.5px',
                borderRadius: '5px'
            }}/>
        )
    }

    form(handleChange) {

        return (
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px'}}>
                <RgbaColorPicker

                    color={this.rgba}
                    onChange={newColor => {
                        handleChange({key: 'r', value: newColor.r})
                        handleChange({key: 'g', value: newColor.g})
                        handleChange({key: 'b', value: newColor.b})
                        handleChange({key: 'a', value: newColor.a})
                        handleChange({key: 'rgba', value: {r: newColor.r, g: newColor.g, b: newColor.b,a: newColor.a}})
                        this.updateShowcase(newColor.r, newColor.g, newColor.b, newColor.a)
                    }}/>

                <div style={{width: '50%'}}>
                    <TextField
                        handleChange={e => {
                            this.updateShowcase(parseInt(e.target.value))
                            handleChange({key: 'r', value: parseInt(e.target.value)})
                            handleChange({key: 'rgba', value: {r: parseInt(e.target.value), g: this.g, b: this.b, a: this.a}})

                        }}
                        size={'small'}
                        maskStart={'R'}
                        value={this.r}
                        type={'number'}
                    />

                    <TextField
                        handleChange={e => {
                            this.updateShowcase(undefined, parseInt(e.target.value))
                            handleChange({key: 'g', value: parseInt(e.target.value)})
                            handleChange({key: 'rgba', value: {r: this.r, g: parseInt(e.target.value), b: this.b, a: this.a}})

                        }}
                        size={'small'}
                        maskStart={'G'}
                        value={this.g}
                        type={'number'}
                    />

                    <TextField
                        handleChange={e => {
                            this.updateShowcase(undefined, undefined, parseInt(e.target.value))
                            handleChange({key: 'b', value: parseInt(e.target.value)})
                            handleChange({key: 'rgba', value: {r: this.r, g: this.g, b: parseInt(e.target.value), a: this.a}})

                        }}
                        size={'small'}
                        maskStart={'B'}
                        value={this.b}
                        type={'number'}
                    />
                    <TextField
                        handleChange={e => {
                            this.updateShowcase(undefined, undefined, undefined, parseFloat(e.target.value))
                            handleChange({key: 'a', value: parseFloat(e.target.value)})
                            handleChange({
                                key: 'rgba',
                                value: {r: this.r, g: this.g, b: this.b, a: parseFloat(e.target.value)}
                            })

                        }}
                        size={'small'}
                        maskStart={'A'}
                        value={this.a}
                        type={'number'}
                    />
                </div>
            </div>
        )
    }
}