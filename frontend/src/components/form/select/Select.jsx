import { forwardRef } from "react"
import styles from "./Select.module.css"

// options = [
//     {
//         name: "Male",
//         value: "M",
//     },
//     {
//         name: "Female",
//         value: "F",
//     }
// ]

const Select = forwardRef(({ label, className, labelAttributes, containerAttributes, options = [], ...inputAttributes}, ref) => {
    return (
        <div {...containerAttributes} className={`${styles.div} ${className || ""}`}>

            {label && <label {...labelAttributes} className={styles.label}>
                {label}
            </label>}
            
            <select
                {...inputAttributes}
                className={styles.input}
                ref={ref}
            >  
                {options && options.map(option => {
                    return (
                        <option
                            className={styles.option}
                            value={option.value}
                            disabled={option?.disabled ? option?.disabled:  ""}
                        >
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    ) 

})

export default Select;