import axios from 'axios';
import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
    const CONVERSATIONS_URL = 'http://localhost:1000/conversations';
    const UPDATE_URL = 'http://localhost:1000/new-conversation';
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIdx, setSelectedConversationIdx] = useState(0);
    const { auth } = useAuth();
    const socket = useSocket();
    const refreshToken = auth.refreshToken;

    const getConversations = useCallback(() => {
        setConversations(prevConversations => {
            if (auth.length) {
                axios.post(CONVERSATIONS_URL, { refreshToken: refreshToken }).then(res => {
                    return res.data;
                });
            } else {
                return prevConversations;
            }
        })

        // axios.post(CONVERSATIONS_URL, { refreshToken: refreshToken }).then(res => {
        //     setConversations(res.data);
        // });
    }, [setConversations]);

    const createConversation = recipients => {
        const requestBody = {
            refreshToken: refreshToken,
            conversation: { recipients: recipients, messages: [] }
        }

        axios.post(UPDATE_URL, requestBody)
            .then(res => {
                socket.emit('create-conversation')
                setConversations(res.data);
            });
    };

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            // let madeChange = false;
            const newMessage = { sender, text }
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    // madeChange = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation;
            });

            return newConversations;

            // if (madeChange) {
            //     return newConversations;
            // } else {
            //     return [
            //         ...prevConversations,
            //         { recipients, messages: [newMessage] }
            //     ]
            // }
        });
    }, [setConversations]);

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text });

        addMessageToConversation({ recipients, text, sender: auth.username });
    };

    // useEffect(() => {
    //     getConversations();
    // }, [getConversations]);

    useEffect(() => {
        if (auth.refreshToken) {
            axios.post(CONVERSATIONS_URL, { refreshToken: refreshToken }).then(res => {
                setConversations(res.data);
            })
        }
    }, [auth]);

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessageToConversation);

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation]);

    useEffect(() => {
        if (socket == null) return

        socket.on('recieve-new-conversation', () => {
            console.log('someone else opened a new conversation!')
            axios.post(CONVERSATIONS_URL, { refreshToken: refreshToken }).then(res => {
                setConversations(res.data);
            });
        });

        return () => socket.off('recieve-new-conversation');
    }, [socket, createConversation])

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation, selectedConversationIdx, setSelectedConversationIdx, sendMessage }}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}

