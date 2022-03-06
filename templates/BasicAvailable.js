import Numeric from "../workflows/basic/Numeric";
import Add from "../workflows/basic/Add";
import Multiply from "../workflows/basic/Multiply";
import Vector from "../workflows/basic/Vector";
import styles from "../styles/Context.module.css";
import Power from "../workflows/basic/Power";


export const basicAvailable = [
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
    }
]