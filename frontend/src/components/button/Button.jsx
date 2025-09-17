import styles from "components/button/Button.module.css";

export default function Button({ children, className, ...buttonAttributes}) {
    return (
        <div className={`${styles.container} ${className || ""}`}>
            <button {...buttonAttributes} className={styles.button}>
                {children}
            </button>
        </div>
    )
}