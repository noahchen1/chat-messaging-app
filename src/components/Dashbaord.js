import React from 'react'

export default function Dashbaord() {

  return (
<>
  <div className="h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden">
    <div className="flex-1 flex flex-col">
      <main className="flex-grow flex flex-row min-h-0">
        <section className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
          <div className="header p-4 flex flex-row justify-between items-center flex-none">
            <p className="text-md font-bold hidden md:block group-hover:block">
              Messenger
            </p>
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
        </section>
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
        </section>
      </main>
    </div>
  </div>
</>

  )
}
