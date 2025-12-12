import React, { useState } from "react";
import Button from "../components/Button"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePopup } from "../hooks/usePopup";

function Login() {
    const navigate = useNavigate()
    const {loginUser} = useAuth()
    const {showPopup} = usePopup()
    const [loading, setLoading] = useState(false)
    

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await loginUser(formData)
            if(response.error === "not-found"){
                showPopup(
                    "User Not Found",
                    "Account with this email does not exist",
                    "warning"
                )
                return
            }
            if(response.error === "invalid-credentials"){
                showPopup(
                    "Invalid Credentials",
                    "Password is incorrect",
                    "error"
                )
                return
            }
            if(response.error === "server-error"){
                showPopup(
                    "Server Error",
                    "Technical error! Try again later",
                    "error"
                )
                return
            }
            showPopup(
                "Login Success",
                `Thank you for logging in ${response.user.username}`,
                "success",
                () => {
                    navigate("/")
                }
            )
            setFormData({
                    email: "",
                    password: ""
                })
        }
        finally{
            setLoading(false)
        }
    }

    

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gray-900 p-1">
            <div className="w-full max-w-md text-white p-5 rounded-2xl mt-25 mb-5">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                    <Button value={loading ? "Login..." : "Login"} disable={loading} />
                </form>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/signup">
                        <span className="text-blue-400 hover:underline">Register</span>
                    </Link>
                </p>
            </div>
            
        </section>
    );
}

export default Login;
