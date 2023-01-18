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
    
    console.log(conversations)
    return (
        <div className="contacts p-2 flex-1 overflow-y-scroll">
            {conversations.map((conversation, idx) => (
                <div key={idx} onClick={e => handleClick(idx)} className="flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative conversations">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/61.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>{conversation?.recipients.join(', ')}</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    Ok, see you at the subway in a bit.
                                </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">Just now</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
