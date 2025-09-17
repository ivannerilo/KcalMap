import { useEffect, useState, useRef } from "react"

export function useDebounce(value, delay = 300) {
    const [debounceSearch, setDebounceSearch] = useState(value);
    const timeoutId = useRef(null);
    
    useEffect(() => {
        timeoutId.current = setTimeout(() => setDebounceSearch(value), delay);
        return () => clearTimeout(timeoutId.current);
    }, [value, delay])

    return debounceSearch
}