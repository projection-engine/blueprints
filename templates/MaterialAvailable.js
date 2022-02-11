import TextureSample from "../workflows/material/TextureSample";
import Color from "../workflows/material/Color";
import ColorToTexture from "../workflows/material/ColorToTexture";

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
        label: 'RGB',
        dataTransfer: 'rgb',
        tooltip: 'RGB color node.',
        getNewInstance: () => new Color()
    }
]