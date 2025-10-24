import { forwardRef } from "react"
import styles from "components/input/Input.module.css"

const Input = forwardRef(({label, className, labelAttributes, containerAttributes, ...inputAttributes}, ref) => {
    return (
        <div {...containerAttributes} className={`${styles.div} ${className || ""}`}>

            {label && <label {...labelAttributes} className={styles.label}>
                {label}
            </label>}
            
            <input
                {...inputAttributes}
                className={styles.input}
                ref={ref}
            />   
        </div>
    ) 

})

export default Input;