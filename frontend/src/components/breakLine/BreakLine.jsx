import styles from "components/breakLine/BreakLine.module.css";

export default function BreakLine({ className ,...attributes }) {
    return <div className={`${styles.line} ${className || ""}`} {...attributes}></div>
}