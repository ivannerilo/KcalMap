import { forwardRef } from "react"
import styles from "components/select/Select.module.css"

// options = [
//     {
//         children: "Male",
//         value: "M",
//     },
//     {
//         children: "Female",
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
                            {...option}
                        >
                            {option.children}
                        </option>
                    )
                })}
            </select>
        </div>
    ) 

})

export default Select;