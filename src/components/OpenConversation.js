import React, { useState, useCallback } from 'react';
import { useConversations } from '../context/ConversationsProvider';
import { useAuth } from '../context/AuthProvider';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversationIdx, conversations } = useConversations();
    const { auth } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();

        sendMessage(
            conversations[selectedConversationIdx].recipients,
            text
        );
    }

    return (
        <section className="flex flex-col flex-auto border-l border-gray-800">
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <div className="flex">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">Scarlett Johansson</p>
                        <p>Active 1h ago</p>
                    </div>
                </div>
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {conversations[selectedConversationIdx]?.messages.map((message, idx) => (
                    message.sender === auth.username ?
                        <div key={idx} className="flex flex-row justify-end">
                            <div>{message.text}</div>
                        </div>
                        : <div key={idx} className="flex flex-row justify-start">
                            <div className='w-8 h-8 relative flex flex-shrink-0 mr-4'>
                                {message.sender}
                            </div>
                            <div>
                                {message.text}
                            </div>
                        </div>
                ))}
            </div>


            <form onSubmit={handleSubmit}>
                <textarea
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ height: '75px', resize: 'none' }}
                    className='border-2'
                />
                <button type="submit">Send</button>
            </form>
        </section>
    )
}
