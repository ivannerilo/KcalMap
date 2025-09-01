import { createContext, useContext, useEffect, useState } from "react";

const InternalContext = createContext();

export default function WindowContext({ children }) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    function setViewSize() {
        const width = window.innerWidth;
        setWindowWidth(width);
        if (width < 768) {
            setIsMobile(true);
            setIsTablet(false);
            setIsDesktop(false);
        } else if (width < 1200 && width > 768) {
            setIsMobile(false);
            setIsTablet(true);
            setIsDesktop(false);
        } else if (width > 1200) {
            setIsMobile(false);
            setIsTablet(false);
            setIsDesktop(true);
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', setViewSize);
        return () => window.removeEventListener('resize', setViewSize);
    })

    useEffect(() => {
        setViewSize()
    },[])

    const value = {
        windowWidth,
        isMobile,
        isDesktop,
        isTablet,
    }

    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useWindow() {
    return useContext(InternalContext);
}