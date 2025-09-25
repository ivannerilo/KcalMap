import { Outlet } from "react-router-dom";
import styles from "./SidebarLayout.module.css";
import { useEffect, useState } from "react";
import MobileBar from "partials/sidebar/mobileBar/MobileBar";
import { useWindow } from "contexts/WindowContext";

export default function SidebarLayout() {
    const {isMobile} = useWindow();

    return (
        <main className={styles.external}>
            <div className={styles.page}>
                <Outlet />
            </div>
            <section className={styles.sidebarContainer}>
                {isMobile && <MobileBar />}
            </section>
        </main>
    )
}