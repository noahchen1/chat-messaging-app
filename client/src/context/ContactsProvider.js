import axios from "axios";
import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { serverUrl } from "../urls/serverUrl";
import { useAuth } from "./AuthProvider";

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const CONTACTS_URL = `${serverUrl}/contacts`;
  const [contacts, setContacts] = useState([]);
  const { auth } = useAuth();
  const refreshToken = { refreshToken: auth.refreshToken };

  useEffect(() => {
    if (auth.refreshToken) {
      axios.post(CONTACTS_URL, refreshToken).then(res => {
        setContacts(res.data);
      });
    }
  }, [auth]);

  return (
    <ContactsContext.Provider value={{ contacts }}>
      {children}
    </ContactsContext.Provider>
  );
}


