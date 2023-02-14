import React from 'react';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../context/ConversationsProvider';
import LoadingScreen from './LoadingScreen';

export default function Dashbaord() {
  const { isLoading } = useConversations();

  return (
    <>
      <div className="h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden relative">
        {isLoading ? <LoadingScreen /> : null}
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <Sidebar />
            <OpenConversation />
          </main>
        </div>
      </div>
    </>

  )
}
