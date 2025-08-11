import styles from "./Button.module.css"

export default function Button({ children, ...buttonAttributes }) {
    return (
        <button 
            {...buttonAttributes}
            className={`${styles.button} ${buttonAttributes?.className ? buttonAttributes?.className : ""}`}
        >
            {children}
        </button>
    ) 
}