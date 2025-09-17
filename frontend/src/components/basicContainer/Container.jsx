import styles from "components/basicContainer/Container.module.css";

export default function Container({ children, className, ...containerAttributes}) {
    return (
        <main
            {...containerAttributes}
            className={`${styles.container} ${className || ""}`}
        >
            {children}
        </main>
    )
}