import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <main className="w-full h-screen bg-linear-to-br from-gray-800 via-gray-900 to-black flex justify-center items-center">
            <section className="w-full max-w-4xl flex flex-col justify-center items-center text-center px-6 mt-20 py-10">
        
                <h1 className="text-white font-extrabold text-4xl md:text-6xl mb-6 leading-tight">
                    Welcome to <span className="text-blue-400 drop-shadow-md">Contact Manager</span>
                </h1>

                <p className="text-gray-300 text-base md:text-md max-w-2xl mb-3">
                    A simple, powerful dashboard to store, update, and manage every connection with ease.
                </p>

                <p className="text-gray-400 text-sm md:text-base italic mb-8">
                    “Stay organised, stay connected.”
                </p>

                
            </section>
        </main>

    )
}

export default Home