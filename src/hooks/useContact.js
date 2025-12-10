import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

export const useContact = ()=>{
    return useContext(ContactContext)
}