import styles from "./Sidebar.module.css";
import {CiForkAndKnife} from "react-icons/ci";
import {FiBarChart2, FiUser} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


export default function () {
    const navigate = useNavigate();

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