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
            {/* <section className="flex flex-col flex-auto border-l border-gray-800">
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
                <div className="flex flex-row justify-start">
                  <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/women/33.jpg"
                      alt=""
                    />
                  </div>
                  <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                        Hey! How are you?
                      </p>
                    </div>
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                        Shall we go for Hiking this weekend?
                      </p>
                    </div>
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Volutpat lacus laoreet non curabitur gravida.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
                <div className="flex flex-row justify-end">
                  <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                        Hey! How are you?
                      </p>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                        Shall we go for Hiking this weekend?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </main>
        </div>
      </div>
    </>

  )
}
