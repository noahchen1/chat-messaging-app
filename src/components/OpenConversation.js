import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversations } from '../context/ConversationsProvider';
import { useAuth } from '../context/AuthProvider';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversationIdx, conversations } = useConversations();
    const { auth } = useAuth();

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, []);


    const handleSubmit = e => {
        e.preventDefault();

        sendMessage(
            conversations[selectedConversationIdx].recipients,
            text
        );

        setText('');
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
                {conversations[selectedConversationIdx]?.messages.map((message, idx) => {
                    const lastMessage = conversations[selectedConversationIdx]?.messages.length - 1 === idx;

                    return (
                        // start
                        message.sender === auth.username && message.sender !== conversations[selectedConversationIdx]?.messages[idx - 1]?.sender ?
                            <div key={idx} className="flex flex-row justify-end">
                                <p className="pl-10 pr-3 py-3 max-w-xs lg:max-w-md rounded-t-full rounded-l-full bg-blue-500 text-gray-200 mb-1 break-words">
                                    {message.text}
                                </p>
                            </div>
                            // end
                            : message.sender === auth.username && message.sender !== conversations[selectedConversationIdx]?.messages[idx + 1]?.sender ?
                                <div
                                    ref={lastMessage ? setRef : null}
                                    key={idx}
                                    className="flex flex-row justify-end mb-1"
                                >
                                    <p className="pl-10 pr-3 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs text-gray-200 lg:max-w-md break-words">
                                        {message.text}
                                    </p>
                                </div>
                                // middle
                                : message.sender === auth.username ?
                                    <div key={idx} className="flex flex-row justify-end">
                                        <p className="pl-10 pr-3 py-3  max-w-xs lg:max-w-md rounded-l-full bg-blue-500 text-gray-200 mb-1 break-words">
                                            {message.text}
                                        </p>
                                    </div>
                                    // reciver start
                                    : message.sender !== conversations[selectedConversationIdx]?.messages[idx - 1]?.sender ?
                                        <div key={idx} className="flex flex-row justify-start">
                                            <p key={idx} className="bg-gray-800 text-gray-200 px-8 py-3 max-w-xs lg:max-w-md rounded-t-full rounded-r-full w-auto lg:ml-14 mb-1 break-words">
                                                {message.text}
                                            </p>
                                        </div>

                                        // reciever middle
                                        : message.sender === conversations[selectedConversationIdx]?.messages[idx + 1]?.sender ?
                                            <div key={idx} className="flex flex-row justify-start">
                                                <p key={idx} className="px-8 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200 mb-1 lg:ml-14 break-words">
                                                    {message.text}
                                                </p>
                                            </div>

                                            // reciever end
                                            : <div
                                                ref={lastMessage ? setRef : null}
                                                key={idx}
                                                className="flex flex-row justify-start items-center mb-1"
                                            >
                                                <div className='lg:block hidden border px-3 py-1 bg-gray-200 rounded-full text-lg font-semibold'>
                                                    {message.sender.split('')[0].toUpperCase()}
                                                </div>
                                                <p className='px-8 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200 lg:ml-5 break-words'>
                                                    {message.text}
                                                </p>
                                            </div>
                    )
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row my-5 mx-5'>
                    <input
                        className="mx-5 rounded-full focus:rounded-lg py-2 pl-3 pr-10 w-full border border-gray-400 focus:border-gray-600 bg-white focus:outline-none text-gray-500 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        placeholder='Aa'
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className='lg:block hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Send
                    </button>

                </div>

                {/* <textarea
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ height: '75px', resize: 'none' }}
                    className='border-2'
                /> */}
            </form>
        </section>
    )
}
