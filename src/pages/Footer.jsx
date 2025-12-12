import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-xl font-semibold text-white">Devang Randeria</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Building modern and responsive web applications with React.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <Link to={"/dashboard"}><li>Dashboard</li></Link>
                        <Link to={"/add-contact"}><li>Add-Contact</li></Link>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: devangranderia9@gmail.com</li>
                        <li>Phone: +91 6359257314</li>
                        <li>Location: Surat, Gujarat, India</li>
                    </ul>
                </div>

            </div>

            <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-5">
                © 2025 Devang Randeria. All rights reserved.
            </div>
        </footer>

    )
}

export default Footer