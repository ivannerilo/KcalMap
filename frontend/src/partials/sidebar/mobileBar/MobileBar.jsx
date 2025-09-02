import styles from "./MobileBar.module.css"
import { FiUser, FiUsers, FiBarChart2 } from "react-icons/fi";
import { CiForkAndKnife } from "react-icons/ci";

export default function MobileBar() {
    return (
        <nav className={styles.bar}>
            <div className={styles.iconDiv} style={{ justifyContent: "flex-start"}}>
                <FiUser
                    className={styles.icon} 
                />
            </div>
            <div className={styles.iconDiv} style={{ justifyContent: "center"}}>
                <CiForkAndKnife className={styles.icon2}/>
            </div>
            <div className={styles.iconDiv} style={{ justifyContent: "center"}}>
                <FiBarChart2 className={styles.icon} />
            </div>
            <div className={styles.iconDiv} style={{ justifyContent: "flex-end"}}>
                <FiUsers className={styles.icon}  />
            </div>
        </nav>
    )
}