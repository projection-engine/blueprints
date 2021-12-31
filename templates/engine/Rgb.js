import Node from '../basic/Node'
import {TextField} from "@f-ui/core";
import {RgbColorPicker} from "react-colorful";

export default class Rgb extends Node {

    constructor() {
        super([], [{label: 'rgb', type: 'object', key: 'rgb'}]);
        this.r = 0
        this.g = 0
        this.b = 0
        this.rgb = {r: this.r, g: this.g, b: this.b}
        this.name = 'RGB'

        this.showcase = (
            <div style={{
                border: 'var(--fabric-border-primary) 2px solid',
                backgroundColor: `rgb(${this.r},${this.g},${this.b})`,
                height: '47.5px',
                width: '47.5px',
                borderRadius: '5px'
            }}/>
        )

    }

    form(handleChange) {
        const updateShowcase = (r = this.r, g = this.g, b = this.b) => {
            this.showcase = (
                <div style={{
                    border: 'var(--fabric-border-primary) 2px solid',
                    backgroundColor: `rgb(${r},${g},${b})`,
                    height: '47.5px',
                    width: '47.5px',
                    borderRadius: '5px'
                }}/>
            )
        }
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px'}}>
                <RgbColorPicker

                    color={this.rgb}
                    onChange={newColor => {
                        handleChange({key: 'r', value: newColor.r})
                        handleChange({key: 'g', value: newColor.g})
                        handleChange({key: 'b', value: newColor.b})
                        handleChange({key: 'rgb', value: {r: newColor.r, g: newColor.g, b: newColor.b}})
                        updateShowcase(newColor.r, newColor.g, newColor.b)
                    }}/>

                <div style={{width: '50%'}}>
                    <TextField
                        handleChange={e => {
                            updateShowcase(parseInt(e.target.value))
                            handleChange({key: 'r', value: parseInt(e.target.value)})
                            handleChange({key: 'rgb', value: {r: parseInt(e.target.value), g: this.g, b: this.b}})

                        }}
                        size={'small'}
                        maskStart={'R'}
                        value={this.r}
                        type={'number'}
                    />

                    <TextField
                        handleChange={e => {
                            updateShowcase(undefined, parseInt(e.target.value))
                            handleChange({key: 'g', value: parseInt(e.target.value)})
                            handleChange({key: 'rgb', value: {r: this.r, g: parseInt(e.target.value), b: this.b}})

                        }}
                        size={'small'}
                        maskStart={'G'}
                        value={this.g}
                        type={'number'}
                    />

                    <TextField
                        handleChange={e => {
                            updateShowcase(undefined, undefined, parseInt(e.target.value))
                            handleChange({key: 'b', value: parseInt(e.target.value)})
                            handleChange({key: 'rgb', value: {r: this.r, g: this.g, b: parseInt(e.target.value)}})

                        }}
                        size={'small'}
                        maskStart={'B'}
                        value={this.b}
                        type={'number'}
                    />
                </div>
            </div>
        )
    }

}