import { createContext, useState, useEffect } from "react";
import { contactsUrl } from "../api/api.js";
import axios from "axios";

export const ContactContext = createContext()

export const ContactProvider = ({ children }) => {

    const [contacts, setContacts] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const currentUserId = sessionStorage.getItem("userId")

    useEffect(() => {
        if(!currentUserId) return;

        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${contactsUrl}?userId=${currentUserId}`)
                if (response.data) {
                    setContacts(response.data)
                }
            } catch (error) {
                setContacts([])
            }
        }
        fetchContacts()
    }, [refresh])


    const addContact = async (data) => {
        const response = await axios.post(contactsUrl, data)
        setRefresh(prev => !prev)
        return { contact: response.data }
    }

    const deleteContact = async (id) => {
        await axios.delete(`${contactsUrl}/${id}`)
        setRefresh(prev => !prev)
    }

    


    return (
        <ContactContext.Provider value={{ addContact, contacts, deleteContact, currentUserId }}>
            {children}
        </ContactContext.Provider>
    )
}