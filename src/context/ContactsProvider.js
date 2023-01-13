import axios from 'axios';
import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';

const ContactsContext = createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    const CONTACTS_URL = 'http://localhost:4000/contacts';
    const [contacts, setContacts] = useState([]);
    const { auth } = useAuth();
    const refreshToken = { refreshToken: auth.refreshToken};

    const getContacts = useCallback(() => {
        axios.post(CONTACTS_URL, refreshToken).then(res => {
            setContacts(res.data)
        })
    }, [setContacts]);

    useEffect(() => {
        getContacts()
    }, [getContacts]);

    return (
        <ContactsContext.Provider value={{ children, contacts }}>
            {children}
        </ContactsContext.Provider>
    )
}

