import {createPortal} from "react-dom";
import styles from "components/popup/Popup.module.css";
import {usePopup} from "contexts/PopupContext";
import {useEffect, useState} from "react";

export function Popup() {
    const {isPopupOpen, popupType, popUpText,} = usePopup();
    const [isExiting, setIsExiting] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (isPopupOpen) {
            setIsPopupVisible(true);
        } else {
            setIsExiting(true);
            setTimeout(() => {
                setIsPopupVisible(false);
                setIsExiting(false);
            }, 500);
        }
    }, [isPopupOpen]);

    return createPortal((
        isPopupVisible ? (
            <div className={styles.popup}>
                <span className={`${styles.popup} ${styles[popupType]} ${isExiting ? styles.popupLeaving : ""}`}>
                    {popUpText}
                </span>
            </div>
        ) : <></>
    ), document.body)
}