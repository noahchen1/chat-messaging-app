import React from 'react';
import { useConversations } from '../context/ConversationsProvider';

export default function Conversations() {
    const { conversations, setSelectedConversationIdx } = useConversations();
    const handleClick = (idx) => {
        const conversations = document.querySelectorAll('.conversations');

        conversations.forEach((conversation, convoIdx) => {
            if (convoIdx === idx) {
                conversation.classList.add('bg-gray-200');
            } else {
                conversation.classList.remove('bg-gray-200');
            }
        });

        setSelectedConversationIdx(idx);
    };

    return (
        <div className="px-4 flex-1">
            {conversations?.map((conversation, idx) => (
                <div key={idx} onClick={() => handleClick(idx)} className="flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative">
                    <div className=" relative flex flex-shrink-0 px-3 py-1 bg-gray-200 rounded-full text-lg font-semibold ">
                        {conversation.messages[conversation.messages.length - 1].sender.split('')[0].toUpperCase()}
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block ">
                        <p className='font-semibold'>{conversation?.recipients.join(', ')}</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    {conversation.messages.length ? `${conversation.messages[conversation.messages.length - 1].text}` : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
