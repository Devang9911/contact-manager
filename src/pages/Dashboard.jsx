import React, { useEffect, useState } from 'react'
import { useContact } from '../hooks/useContact'
import { usePopup } from '../hooks/usePopup'

function Dashboard() {

    const { contacts, deleteContact, handleUpdate } = useContact()
    const { showPopup } = usePopup()
    const [userConacts, setUserContacts] = useState([])

    

    useEffect(() => {
        if (contacts) {
            setUserContacts(contacts)
        }
    }, [contacts])

    const handleDelete = async (id) => {
        await deleteContact(id)
        showPopup(
            "Deleted",
            "Contact has been deleted successfully.",
            "success"
        )
    }

    



    return (
        <section className="w-full min-h-screen bg-linear-to-br from-gray-800 via-gray-900 to-black p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 h-full mt-20">

                {/* LEFT CARD */}
                <div className="p-6 rounded-3xl bg-gray-800 shadow-xl w-full md:w-1/3 h-full flex flex-col justify-between">
                    <h1 className="text-3xl font-bold text-white">Total Contacts</h1>
                    <p className="text-gray-300 text-5xl mt-6 font-semibold">{userConacts.length}</p>
                </div>

                {/* RIGHT CONTACT LIST */}
                <div className="p-6 rounded-3xl bg-gray-800 shadow-xl w-full md:w-2/3 h-full flex flex-col">
                    <h1 className="text-3xl font-bold text-white mb-5">Contact List</h1>

                    {/* Scrollable List */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
                        {/* map from here */}
                        {/* CONTACT CARD */}
                        {userConacts.length === 0 ? (
                            <p className="text-gray-400">No contacts found.</p>
                        ) : (
                            userConacts.map((contact) => (
                                <div key={contact.id} className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-gray-700/70 rounded-xl gap-4 transition hover:shadow-xl">

                                    {/* Left side: name + phone */}
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-xl text-white">{contact.name}</p>
                                        <p className="text-gray-300">{contact.number}</p>
                                    </div>

                                    {/* Right side: update & delete buttons */}
                                    <div className="flex gap-3 md:gap-4 mt-3 md:mt-0">
                                        <button
                                            
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}




                        {/* Add more contact cards here */}
                    </div>
                </div>


            </div>
        </section>



    )
}

export default Dashboard