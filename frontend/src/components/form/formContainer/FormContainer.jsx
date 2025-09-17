import styles from "components/form/formContainer/FormContainer.module.css"

export default function FormContainer({ children, className, ...containerAttributes }){
    return (
        <div className={styles.container + " " + className || "" } {...containerAttributes}>
            {children}
        </div>
    )
}