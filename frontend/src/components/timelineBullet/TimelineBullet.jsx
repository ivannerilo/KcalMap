import styles from "components/timelineBullet/TimelineBullet.module.css";

export default function TimelineBullet({ className, ...attributes }) {
    return (
        <div className={styles.container}>
            <div className={styles.line}></div>
            <div className={styles.bullet}></div>
        </div>
    )
}