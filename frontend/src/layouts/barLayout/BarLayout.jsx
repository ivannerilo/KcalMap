import { Outlet } from "react-router-dom";
import styles from "./BarLayout.module.css";
import { useWindow } from "contexts/WindowContext";
import MobileBar from "../../partials/shared/bar/mobileBar/MobileBar";
import Sidebar from "../../partials/shared/bar/sidebar/Sidebar";


export default function BarLayout() {
    const {isMobile} = useWindow();

    return (
        <main
            className={isMobile ? styles.mobileExternal : styles.external}
        >
            <div className={styles.page}>
                <Outlet />
            </div>
            <section
                className={isMobile ? styles.mobileSidebarContainer : styles.sidebarContainer}
            >
                {isMobile && <MobileBar />}
                {!isMobile && <Sidebar />}
            </section>
        </main>
    )
}