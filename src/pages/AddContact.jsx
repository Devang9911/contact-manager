import React, { use, useEffect, useState } from 'react'
import { useContact } from "../hooks/useContact"
import { usePopup } from "../hooks/usePopup"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
function AddContact() {

    const { addContact } = useContact()
    const { authUser } = useAuth()
    const { showPopup } = usePopup()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const currentUser = sessionStorage.getItem("userId")

    
    const [data, setData] = useState({
        name: "",
        number: "",
        userId: ""
    })

    useEffect(() => {
        setData({
            ...data,
            userId: currentUser
        })
    }, [currentUser])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addContact(data)
            showPopup(
                "Contact Add",
                "Your contact added successfully",
                "success",
                () => navigate("/dashboard")
            )
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="w-full h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-800 via-gray-900 to-black pt-15">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-white tracking-wide">
                Add New <span className="text-blue-500">Contact</span>
            </h2>

            <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300 font-medium">Name</label>
                        <input
                            required
                            name='name'
                            onChange={handleChange}
                            type="text"
                            placeholder="Devang Randeria"
                            className="p-3 rounded-xl bg-gray-800/60 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/40 outline-none transition text-white"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300 font-medium">Phone</label>
                        <input
                            required
                            name='number'
                            onChange={handleChange}
                            type="tel"
                            placeholder="6324567890"
                            className="p-3 rounded-xl bg-gray-800/60 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/40 outline-none transition text-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-500 w-full py-3 rounded-xl 
        font-semibold text-lg text-white shadow-lg shadow-blue-900/40 
        transition-all duration-300"
                    >
                        {loading ? "Adding..." : "Add Contact"}
                    </button>

                </form>
            </div>
        </section>

    )
}

export default AddContact