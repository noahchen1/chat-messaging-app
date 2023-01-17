import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthProvider';

const SockeContext = createContext();

export function useSocket() {
    return useContext(SockeContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const { auth } = useAuth();
    const id = auth.username;

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query: { id } }
        );

        setSocket(newSocket);
        return () => newSocket.close();

    }, [id])

    console.log(socket)
    return (
        <SockeContext.Provider value={socket}>
            {children}
        </SockeContext.Provider>
    )
}
