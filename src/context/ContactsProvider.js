import axios from 'axios';
import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';

const ContactsContext = createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    const CONTACTS_URL = 'http://localhost:1000/contacts';
    const [contacts, setContacts] = useState([]);
    const { auth } = useAuth();
    const refreshToken = { refreshToken: auth.refreshToken};

    // const getContacts = useCallback(() => {
    //     setContacts(prevContacts => {
    //         if (auth.length) {
    //             axios.post(CONTACTS_URL, refreshToken).then(res => {
    //                 return res.data
    //             });
    //         } else {
    //             return prevContacts;
    //         }
    //     });
    // }, [setContacts]);

    useEffect(() => {
        if (auth.refreshToken) {
            axios.post(CONTACTS_URL, refreshToken).then(res => {
                setContacts(res.data)
            });
        }
    }, [auth]);

    return (
        <ContactsContext.Provider value={{ contacts }}>
            {children}
        </ContactsContext.Provider>
    )
}

