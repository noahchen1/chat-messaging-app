import React from 'react';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';

export default function Dashbaord() {

  return (
    <>
      <div className="h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden">
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
