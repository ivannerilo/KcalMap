import styles from "./Input.module.css"
import React from "react";

const Input = React.forwardRef(({label, className, containerAttributes, ...inputProps}, ref) => {
    return (
        <div {...containerAttributes ? {...containerAttributes} : {}} className={styles.container}>
            {label && 
                <label className={styles.label}>
                    {label}
                </label>
            }
            <input 
                {...inputProps}
                ref={ref ? ref : null}
                className={`${styles.input} ${className ? className : ""}`}
            />
        </div>
    )
})

export default Input;