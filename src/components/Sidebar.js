import { useState } from 'react';

export default function Sidebar() {
    const [toggle, setToggle] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    
    const showContacts = () => setToggle(false);
    const showConversations = () => setToggle(true);
    const closeModal = () => setModalOpen(false);

    return (
        <section className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
            <div className="header p-4 flex flex-row justify-between items-center flex-none">
                <p className="text-md font-bold hidden md:block group-hover:block">
                    Messenger
                </p>
                <a
                    href="#"
                    className="block rounded-full hover:bg-gray-200 bg-white w-10 h-10 p-2 hidden md:block group-hover:block"
                >
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                        <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                    </svg>
                </a>
            </div>
            <div className="contacts p-2 flex-1 overflow-y-scroll">
                <div className="flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/61.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Angelina Jolie</p>
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
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/97.jpg"
                            alt=""
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p className="font-bold">Tony Stark</p>
                        <div className="flex items-center text-sm font-bold">
                            <div className="min-w-0">
                                <p className="truncate">Hey, Are you there?</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">10min</p>
                        </div>
                    </div>
                    <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block" />
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Scarlett Johansson</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You sent a photo.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">1h</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/12.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>John Snow</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You missed a call John.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">4h</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-around mb-4'>
                <button type="button" onClick={showContacts} className='border-black border-2 px-4 py-2'>contacts</button>
                <button type="button" onClick={showContacts} className='border-black border-2 px-4 py-2'>conversations</button>
            </div>

        </section>
    )
}
