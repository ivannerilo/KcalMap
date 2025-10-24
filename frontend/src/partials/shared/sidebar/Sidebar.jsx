import styles from "./Sidebar.module.css";
import {CiForkAndKnife} from "react-icons/ci";
import {FiBarChart2, FiUser, FiAlignJustify, FiLogOut} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Button from "components/button/Button";
import {useAuthenticate} from "contexts/AuthenticateContext";


export default function () {
    const navigate = useNavigate();
    const {logout} = useAuthenticate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const timeoutId = useRef(null);
    const OPEN_SIDEBAR_WIDTH = 32;
    const CLOSED_SIDEBAR_WIDTH = 8;

    function handleMouseEnter() {
        console.log("handleMouseOver");
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 300)
    }

    function handleMouseLeave() {
        console.log("handleMouseOut");
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => {
            setIsSidebarOpen(false);
        }, 300)
    }

    return (
        <nav className={`${styles.bar} ${isSidebarOpen ? styles.expanded : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isSidebarOpen && <>
                <header className={styles.titleDiv}>
                    <span className={styles.title}>KcalMap</span>
                </header>
                <section className={styles.optionsDiv}>
                    <div className={styles.option} onClick={() => navigate("/dashboard")}>
                        <FiBarChart2
                            className={styles.icon}
                        />
                        <span className={styles.optionText}>Dashboard</span>
                    </div>
                    <div className={styles.option} onClick={() => navigate("/foods")}>
                        <CiForkAndKnife
                            className={styles.icon2}
                        />
                        <span className={styles.optionText}>Foods</span>
                    </div>
                    <div className={styles.option} onClick={() => navigate("/profile")}>
                        <FiUser
                            className={styles.icon}
                        />
                        <span className={styles.optionText}>Profile</span>
                    </div>
                </section>
                <section className={styles.buttonDiv}>
                    <Button
                        onClick={() => logout()}
                        className={styles.logout}
                    >
                        <FiLogOut

                        />
                        Logout
                    </Button>
                </section>
            </>}

            {!isSidebarOpen &&
                <div className={styles.iconDiv} style={{ justifyContent: "center"}}>
                    <FiAlignJustify
                        className={styles.icon}
                        style={{color: 'var(--accent)'}}
                    />
                </div>
            }

        </nav>
    )
}