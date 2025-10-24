import styles from "components/basicContainer/Container.module.css";
import {forwardRef} from "react";

const Container = forwardRef(({ children, className, ...containerAttributes}, ref = null) => {
    return (
        <main
            {...containerAttributes}
            className={`${styles.container} ${className || ""}`}
            ref={ref}
        >
            {children}
        </main>
    )
});

export default Container;