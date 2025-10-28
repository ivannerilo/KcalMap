import {createContext, useContext, useRef, useState} from "react";

const InternalContext = createContext();

export function PopupContext({ children }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState("");
    const [popUpText, setPopUpText] = useState("");
    const timeoutRef = useRef(null);

    function openPopup(text, type = "success") {
        console.log("openPopup")
        setIsPopupOpen(true);
        setPopupType(type);
        setPopUpText(text);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsPopupOpen(false);
        }, 3000);
    }

    const values = {
        isPopupOpen,
        popupType,
        popUpText,
        openPopup
    }

    return (
        <InternalContext.Provider value={values}>
            {children}
        </InternalContext.Provider>
    )
}

export function usePopup() {
    return useContext(InternalContext);
}

