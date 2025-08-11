import styles from "./Input.module.css"
import React from "react";

const Input = React.forwardRef(({label, containerAttributes, labelAttributes, ...inputAttributes}, ref) => {
    return (
        <div
            {...containerAttributes}
            className={`${styles.container} ${containerAttributes?.className ? containerAttributes?.className : ""}`}
        >
            {label && 
                <label
                    {...labelAttributes} 
                    className={`${styles.label} ${labelAttributes?.className ? labelAttributes?.className : ""}`}
                >
                    {label}
                </label>
            }
            <input 
                {...inputAttributes}
                ref={ref ? ref : null}
                className={`${styles.input} ${inputAttributes?.className ? inputAttributes?.className : ""}`}
            />
        </div>
    )
})

export default Input;