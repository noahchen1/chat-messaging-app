import axios from "axios";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
    const URL = 'http://localhost:1000/auth';
    const usernameRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const { auth, setAuth, rememberUser, setRememberUser } = useAuth();

    const handleSumit = async (e) => {
        e.preventDefault();

        const userToLogin = {
            username: username,
            password: pwd
        }

        axios.post(URL, userToLogin)
            .then(res => {
                const accessToken = res?.data?.accessToken;
                const refreshToken = res?.data.refreshToken;

                setAuth({ username, pwd, accessToken, refreshToken });
                setUsername('');
                setPwd('');
                navigate('/dashboard');
            }).catch(err => {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed')
                }
            })
    };

    const toggleRememberMe = () => {
        setRememberUser(prev => !prev);
    }; 

    return (
        <div>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onSubmit={handleSumit}>
                                {/*Username input */}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="username"
                                        autoComplete="off"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        ref={usernameRef}
                                        required
                                    />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="password"
                                        placeholder="Password"
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="remember-me-check-box"
                                            checked={rememberUser}
                                            onChange={toggleRememberMe}
                                        />
                                        <label
                                            className="form-check-label inline-block text-gray-800"
                                            htmlFor="remember-me-check-box"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-gray-800">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Login
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Don't have an account?
                                        <a
                                            href="/register"
                                            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

