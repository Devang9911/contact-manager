import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { userUrl } from "../api/api.js";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [users, setUsers] = useState(null)
    const [authUser , setAuthUser] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(userUrl)
            setUsers(response.data)
            // console.log(response.data)
        }
        fetchUsers()
    }, [refresh])

    // useEffect(()=>{
    //     const userId = sessionStorage.getItem("userId")
    //     if(userId){
    //         const user =users?.find(e => e.id === userId)
    //         if(user) setAuthUser(user)
    //     }
    // },[users])

    const registerUser = async (userData) => {
        const exist = users?.filter(e => e.email === userData.email) || []
        try {
            if (exist.length > 0) {
                return { error: "exist" }
            }
            const response = await axios.post(userUrl, userData)
            setRefresh(prev => !prev)
            return { user: response.data }
        } catch (error) {
            return { error: "server-error" }
        }
    }

    const loginUser = async (userData) =>{
        try{
            const user = users.find(e => e.email === userData.email)
            if(!user){
                return {error: "not-found"}
            }
            if(user.password !== userData.password){
                return {error: "invalid-credentials"}
            }
            setAuthUser(user)
            sessionStorage.setItem("userId", user.id)   
            return {user}
        }catch(error){
            return {error: "server-error"}
        }
    }

    const logoutUser = () =>{
        setAuthUser(null)
        sessionStorage.removeItem("userId")
    }

    return (
        <AuthContext.Provider value={{ registerUser , loginUser , authUser , logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}