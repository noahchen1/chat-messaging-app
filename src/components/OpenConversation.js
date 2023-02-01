import React, { useState, useEffect } from 'react';
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
                    // start
                    message.sender === auth.username && message.sender !== conversations[selectedConversationIdx]?.messages[idx - 1]?.sender ?
                        <div key={idx} className="flex flex-row justify-end">
                            <p className="px-8 py-3 max-w-xs lg:max-w-md rounded-t-full rounded-l-full bg-blue-500 text-gray-200 mb-1 break-words">
                                {message.text}
                            </p>
                        </div>
                        // end
                        : message.sender === auth.username && message.sender !== conversations[selectedConversationIdx]?.messages[idx + 1]?.sender ?
                            <div key={idx} className="flex flex-row justify-end">
                                <p className="px-8 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs text-gray-200 lg:max-w-md break-words">
                                    {message.text}
                                </p>
                            </div>
                            // middle
                            : message.sender === auth.username ?
                                <div key={idx} className="flex flex-row justify-end">
                                    <p className="px-8 py-3  max-w-xs lg:max-w-md rounded-l-full bg-blue-500 text-gray-200 mb-1 break-words">
                                        {message.text}
                                    </p>
                                </div>
                                // reciver start
                                : message.sender !== conversations[selectedConversationIdx]?.messages[idx - 1]?.sender ?
                                    <div key={idx} className="flex flex-row justify-start">
                                        <p key={idx} className="bg-gray-800 text-gray-200 px-8 py-3 max-w-xs lg:max-w-md rounded-t-full rounded-r-full w-auto lg:ml-10 mb-1 break-words">
                                            {message.text}
                                        </p>
                                    </div>

                                    // reciever middle
                                    : message.sender === conversations[selectedConversationIdx]?.messages[idx + 1]?.sender ?
                                        <div key={idx} className="flex flex-row justify-start">
                                            <p key={idx} className="px-8 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200 mb-1 lg:ml-10 break-words">
                                                {message.text}
                                            </p>
                                        </div>

                                        // reciever end
                                        : <div key={idx} className="flex flex-row justify-start">
                                            <div className='lg:block hidden'>
                                                {message.sender.split('')[0]}
                                            </div>
                                            <p className='px-8 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200 lg:ml-9 break-words'>
                                                {message.text}
                                            </p>
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
