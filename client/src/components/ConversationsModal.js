import React, { useState } from "react";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";
import { useAuth } from "../context/AuthProvider";

export default function ConversationsModal({ closeModal }) {
  const { contacts } = useContacts();
  const { auth } = useAuth();
  const { conversations, setSelectedConversationIdx, createConversation } = useConversations();
  const [selectedContacts, setSelectedContacts] = useState([auth.username]);
  const filteredContacts = contacts.filter(
    contact => contact !== auth.username
  );

  const handleSelectedContact = (e, contact) => {
    const btn = e.target;

    setSelectedContacts(prevSelectedContacts => {
      if (prevSelectedContacts.includes(contact)) {
        btn.classList.remove("bg-green-700");
        btn.classList.add("bg-blue-700");
        return prevSelectedContacts.filter(
          prevContact => prevContact !== contact
        );
      } else {
        btn.classList.remove("bg-blue-700");
        btn.classList.add("bg-green-700");

        return [...prevSelectedContacts, contact];
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!conversations.length) {
      createConversation(selectedContacts);
      closeModal();
      return;
    }

    for (let i = 0; i < conversations.length; i++) {
      if (arrayEquality(conversations[i].recipients, selectedContacts)) {
        setSelectedConversationIdx(i);
        closeModal();
        return;
      }
    }

    createConversation(selectedContacts);
    closeModal();
  };

  function arrayEquality(a, b) {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
      return element === b[index];
    });
  }

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative w-full h-full max-w-md h-auto mx-2">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={closeModal}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 pt-6 pb-14 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              New Conversation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Users
                </label>
                {filteredContacts.map(contact => (
                  <button
                    type="button"
                    key={contact}
                    onClick={e => handleSelectedContact(e, contact)}
                    className="bg-blue-700 text-white font-medium text-center p-1 rounded-md mr-2 mt-1 cursor-pointer"
                  >
                    +{contact}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}