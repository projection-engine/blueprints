import TextureSample from "../workflows/material/TextureSample";
import Color from "../workflows/material/Color";
import ParallaxOcclusionMapping from "../workflows/material/ParallaxOcclusionMapping";
import styles from '../styles/Context.module.css'
import Mask from "../workflows/basic/Mask";
import Lerp from "../workflows/basic/Lerp";
import Atlas from "../workflows/material/Atlas";
import OneMinus from "../workflows/material/OneMinus";
import HeightLerp from "../workflows/material/HeightLerp";

export const materialAvailable = [
    {
        label: <label className={styles.label}>Texture sample</label>,
        dataTransfer: 'texture-sample',
        icon: <span className={'material-icons-round'}>texture</span>,
        tooltip: 'Texture sample node.',
        getNewInstance: () => new TextureSample()
    },

    {
        label: <label className={styles.label}>Parallax occlusion mapping</label>,
        dataTransfer: 'pom',
        icon: <span className={'material-icons-round'}>line_weight</span>,
        tooltip: 'POM node.',
        getNewInstance: () => new ParallaxOcclusionMapping()
    },
    {
        label: <label className={styles.label}>RGB</label>,
        dataTransfer: 'rgb',
        icon: <span className={'material-icons-round'}>palette</span>,
        tooltip: 'RGB color node.',
        getNewInstance: () => new Color()
    },
    {
        label: <label className={styles.label}>Mask</label>,
        dataTransfer: 'mask',
        icon: <span className={'material-icons-round'}>colorize</span>,
        tooltip: 'Extracts color channel from texture.',
        getNewInstance: () => new Mask()
    },
    {
        label: <label className={styles.label}>Lerp</label>,
        dataTransfer: 'lerp',
        icon: <span className={'material-icons-round'}>blur_linear</span>,
        tooltip: 'Linear interpolates two textures.',
        getNewInstance: () => new Lerp()
    },
    {
        label: <label className={styles.label}>Height Lerp</label>,
        dataTransfer: 'h-lerp',
        icon: <span className={'material-icons-round'}>blur_linear</span>,
        tooltip: 'Height based linear interpolation.',
        getNewInstance: () => new HeightLerp()
    },
    {
        label: <label className={styles.label}>Atlas layer blend</label>,
        dataTransfer: 'atlas',
        icon: <span className={'material-icons-round'}>window</span>,
        tooltip: 'Layered terrain atlas node.',
        getNewInstance: () => new Atlas()
    },
    {
        label: <label className={styles.label}>1-X</label>,
        dataTransfer: 'one-',
        icon: <span className={'material-icons-round'}>invert_colors</span>,
        tooltip: 'Layered terrain atlas node.',
        getNewInstance: () => new OneMinus()
    }
]