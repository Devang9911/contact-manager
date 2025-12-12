import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button"
import Input from "../components/Input"
import { useAuth } from "../hooks/useAuth";
import { usePopup } from "../hooks/usePopup";

function Signup() {
    const navigate = useNavigate()
    const { registerUser } = useAuth()
    const { showPopup } = usePopup()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData)
        setLoading(true)
        try {
            const response = await registerUser(formData)
            if (response.error === "exist") {
                showPopup(
                    "Already Exist",
                    "Account with this email already exist",
                    "warning"
                )
                return
            }
            if (response.error === "server-error") {
                showPopup(
                    "Server Error",
                    "Technical error! Try again later",
                    "error"
                )
                return
            }
            showPopup(
                "Registration Success",
                "Your account has been created",
                "success",
                () => {
                    navigate("/login")
                }
            )
            setFormData({
                username: "",
                email: "",
                password: ""
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="w-full h-screen flex items-center justify-center bg-gray-900 p-1">
            <div className="w-full max-w-md text-white p-5 rounded-2xl mt-25 mb-5">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        onChange={handleChange}
                        autoComplete="username"
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                        autoComplete="password"
                    />

                    <Button value={loading ? "Registering..." : "Register"} disable={loading} />
                </form>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login">
                        <span className="text-blue-400 hover:underline">Login</span>
                    </Link>
                </p>
            </div>

        </section>
    );
}

export default Signup;
