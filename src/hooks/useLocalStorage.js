import { useEffect, useState } from "react"

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const valueInStorage = localStorage.getItem(key);

        if (valueInStorage !== null) return JSON.parse(valueInStorage)
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
