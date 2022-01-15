import PBRMaterial from "../templates/PBRMaterial";
import TextureSample from "../templates/TextureSample";
import Rgb from "../templates/Rgb";
import Rgba from "../templates/Rgba";

export const materialAvailable=[
    {
        label: 'Texture sample',
        dataTransfer: 'texture-sample',
        tooltip: 'Texture sample node.',
        getNewInstance: () => new TextureSample()
    },
    {
        label: 'RGB',
        dataTransfer: 'rgb',
        tooltip: 'RGB color node.',
        getNewInstance: () => new Rgb()
    },{
        label: 'RGBA',
        dataTransfer: 'rgba',
        tooltip: 'RGBA color node.',
        getNewInstance: () => new Rgba()
    },{
        label: 'Material',
        dataTransfer: 'material',
        tooltip: 'Material package node.',
        getNewInstance: () => new PBRMaterial()
    }
]