import styles from "./BreakLine.module.css"

export default function BreakLine({...divAttributes}) {
    return <div {...divAttributes} className={styles.break}></div>
}