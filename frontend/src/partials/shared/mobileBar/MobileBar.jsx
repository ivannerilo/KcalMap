import styles from "partials/shared/mobileBar/MobileBar.module.css"
import { FiUser, FiUsers, FiBarChart2 } from "react-icons/fi";
import { CiForkAndKnife } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function MobileBar() {
    const navigate = useNavigate()

    return (
        <nav className={styles.bar}>
            <div className={styles.iconDiv} style={{ justifyContent: "flex-start"}}>
                <CiForkAndKnife
                    onClick={() => navigate("/foods")}
                    className={styles.icon2} 
                />
            </div>
            <div className={styles.iconDiv} style={{ justifyContent: "center"}}>
                <FiUser
                    onClick={() => navigate("/profile")}
                    className={styles.icon} 
                />
            </div>
            <div className={styles.iconDiv} style={{ justifyContent: "flex-end"}}>
                <FiBarChart2 
                    onClick={() => navigate("/dashboard")}
                    className={styles.icon} 
                />
            </div>
        </nav>
    )
}