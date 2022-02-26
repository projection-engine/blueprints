import TextureSample from "../workflows/material/TextureSample";
import Color from "../workflows/material/Color";
import ColorToTexture from "../workflows/material/ColorToTexture";
import SpecularToMetallic from "../workflows/material/SpecularToMetallic";
import ParallaxOcclusionMapping from "../workflows/material/ParallaxOcclusionMapping";

export const materialAvailable=[
    {
        label: 'Texture sample',
        dataTransfer: 'texture-sample',
        tooltip: 'Texture sample node.',
        getNewInstance: () => new TextureSample()
    },

    {
        label: 'Color to texture',
        dataTransfer: 'color-to-texture',
        tooltip: 'Converts RGB color to texture sample.',
        getNewInstance: () => new ColorToTexture()
    },
    {
        label: 'Parallax occlusion mapping',
        dataTransfer: 'pom',
        tooltip: 'POM node.',
        getNewInstance: () => new ParallaxOcclusionMapping()
    },
    {
        label: 'Specular to metallic',
        dataTransfer: 's-t-m',
        tooltip: 'Specular workflow to metallic workflow.',
        getNewInstance: () => new SpecularToMetallic()
    }    ,
    {
        label: 'RGB',
        dataTransfer: 'rgb',
        tooltip: 'RGB color node.',
        getNewInstance: () => new Color()
    }
]