import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePopup } from '../hooks/usePopup';

function Header() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { logoutUser } = useAuth()
    const { showPopup } = usePopup()
    const menuRef = useRef();
    const currentUserId = sessionStorage.getItem("userId")

    useEffect(() => {
        const handler = (e) => {
            if (open && menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    const handleLogout = () => {
        setLoading(true)
        try {
            logoutUser()
            setOpen(false)
            showPopup(
                "Logged Out",
                "You have been logged out successfully",
                "success",
                () => navigate("/login")

            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className='w-full flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10 py-6 px-6 fixed z-100'>
            <Link to={'/'}>
                <h1 className="text-white font-semibold text-2xl">
                    Contact{" "}
                    <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Manager
                    </span>
                </h1>
            </Link>

            {/* hamburger button */}
            <button
                className="md:hidden"
                onClick={() => setOpen(!open)}>
                <div className='space-y-1'>
                    <span className='block w-6 h-1 bg-white'></span>
                    <span className='block w-6 h-1 bg-white'></span>
                    <span className='block w-6 h-1 bg-white'></span>
                </div>
            </button>

            {/* mobile menu */}
            {open && (
                <>
                    <div className="fixed inset-0 md:hidden ">
                        <ul
                            ref={menuRef}
                            className="absolute top-20 left-0 w-full flex flex-col items-center gap-6 py-6 text-white text-lg font-medium bg-gray-900/99 backdrop-blur-md"
                        >
                            <Link to={'/'}>
                                <li
                                    className="cursor-pointer hover:text-blue-400 border-b border-blue-700/99"
                                    onClick={() => setOpen(false)}
                                >
                                    Home
                                </li>
                            </Link>
                            <Link to={'/dashboard'}>
                                <li
                                    className="cursor-pointer hover:text-blue-400 border-b border-blue-700/99"
                                    onClick={() => setOpen(false)}
                                >
                                    Dashboard
                                </li>
                            </Link>
                            <Link to={'/addcontact'}>
                                <li
                                    className="cursor-pointer hover:text-blue-400 border-b border-blue-700/99"
                                    onClick={() => setOpen(false)}
                                >
                                    Add Contact
                                </li>
                            </Link>
                            {currentUserId ? (
                                <li
                                    className="cursor-pointer hover:text-blue-400 border-b border-blue-700/99 "
                                    onClick={handleLogout}
                                >
                                    {loading ? "Logout..." : "Logout"}
                                </li>
                            ) : (
                                <Link to={'/signup'}>
                                    <li
                                        className="cursor-pointer hover:text-blue-400 border-b border-blue-700/99"
                                        onClick={() => setOpen(false)}
                                    >
                                        Signup
                                    </li>
                                </Link>
                            )
                            }
                        </ul>
                    </div>

                </>
            )}

            {/* desktop menu */}
            <ul className="hidden md:flex gap-10">
                <Link to={'/'}>
                    <li className="group relative text-lg font-medium text-gray-200 cursor-pointer">
                        Home
                        <span className="absolute left-0 -bottom-1 border-b-2 border-blue-500 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </li>
                </Link>
                <Link to={'/dashboard'}>
                    <li className="group relative text-lg font-medium text-gray-200 cursor-pointer">
                        Dashboard
                        <span className="absolute left-0 -bottom-1 border-b-2 border-blue-500 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </li>
                </Link>
                <Link to={'/addcontact'}>
                    <li className="group relative text-lg font-medium text-gray-200 cursor-pointer">
                        Add Contact
                        <span className="absolute left-0 -bottom-1 border-b-2 border-blue-500 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </li>
                </Link>
                {currentUserId ? (
                    <li className="group relative text-lg font-medium text-gray-200 cursor-pointer px-3"
                    onClick={handleLogout}>
                        {loading ? "Logout..." : "Logout"}
                        <span className="absolute left-0 -bottom-1 border-b-2 border-blue-500 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </li>
                ) : (
                    <Link to={'/signup'}>
                        <li className="group relative text-lg font-medium text-gray-200 cursor-pointer px-3">
                            Signup
                            <span className="absolute left-0 -bottom-1 border-b-2 border-blue-500 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>)
                }
            </ul>



        </nav>
    )
}

export default Header