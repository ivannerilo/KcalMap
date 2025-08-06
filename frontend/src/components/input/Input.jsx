import styles from "./Input.module.css"

export default function Input({label, className, containerAttributes, ...inputProps}) {
    return (
        <div {...containerAttributes ? {...containerAttributes} : {}} className={styles.container}>
            {label && 
                <label className={styles.label}>
                    {label}
                </label>
            }
            <input 
                {...inputProps}
                className={`${styles.input} ${className ? className : ""}`}
            />
        </div>
    )
}