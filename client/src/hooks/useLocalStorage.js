import { useEffect, useState } from "react"

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const valueInStorage = localStorage.getItem(key);

        if (valueInStorage !== null) return JSON.parse(valueInStorage);
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
