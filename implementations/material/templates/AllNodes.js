import Numeric from "../nodes/Numeric";
import Add from "../nodes/Add";
import Multiply from "../nodes/Multiply";
import Vector from "../nodes/Vector";
import styles from "../styles/Available.module.css";
import Power from "../nodes/Power";
import TextureSample from "../nodes/TextureSample";
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import Color from "../nodes/Color";
import Mask from "../nodes/Mask";
import Lerp from "../nodes/Lerp";
import HeightLerp from "../nodes/HeightLerp";
import Atlas from "../nodes/Atlas";
import OneMinus from "../nodes/OneMinus";


export const allNodes = [
    {
        label: <label className={styles.label}>Number</label>,
        dataTransfer: 'number',
        tooltip: 'Node for a numeric constant.',
        icon: <span className={'material-icons-round'}>123</span>,
        getNewInstance: () => new Numeric()
    },

    {
        label: <label className={styles.label}>Addition</label>,
        dataTransfer: 'add',
        tooltip: 'Node for the numeric Addition.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Add()
    },
    {
        label: <label className={styles.label}>Multiplication</label>,
        dataTransfer: 'mul',
        tooltip: 'Node for the numeric multiplication.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Multiply()
    }, {
        label: <label className={styles.label}>Power</label>,
        dataTransfer: 'pow',
        tooltip: 'Node for the numeric function power.',
        icon: <span className={'material-icons-round'}>calculate</span>,
        getNewInstance: () => new Power()
    }, {
        label: <label className={styles.label}>Vector</label>,
        dataTransfer: 'vec',
        tooltip: '3D vector node.',
        icon: <span className={'material-icons-round'}>data_array</span>,
        getNewInstance: () => new Vector()
    },
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