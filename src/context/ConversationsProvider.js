import axios from 'axios';
import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthProvider';

const ConversationsContext = createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const CONVERSATIONS_URL = 'http://localhost:4000/conversations';
    const UPDATE_URL = 'http://localhost:4000/new-conversation';
    const [conversations, setConversations] = useState([]);
    const { auth } = useAuth();
    const refreshToken = auth.refreshToken;

    const getConversations = useCallback(() => {
        axios.post(CONVERSATIONS_URL, { refreshToken: refreshToken }).then(res => {
            setConversations(res.data);
        });
    }, [setConversations]);

    const createConversation = recipients => {
        const requestBody = {
            refreshToken: refreshToken,
            conversation: JSON.stringify({ recipients: recipients, messages: [] })
        }

        axios.post(UPDATE_URL, requestBody)
            .then(res => setConversations(res.data))
    };

    useEffect(() => {
        getConversations();
    }, [getConversations])

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation }}>
            {children}
        </ConversationsContext.Provider>
    )
}
