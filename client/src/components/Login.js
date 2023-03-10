import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useConversations } from "../context/ConversationsProvider";
import { serverUrl } from "../urls/serverUrl";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

export default function Login() {
  const URL = `${serverUrl}/auth`;
  const usernameRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth, rememberUser, setRememberUser } = useAuth();
  const { isLoading, setIsLoading } = useConversations();

  const handleSumit = async e => {
    e.preventDefault();

    const userToLogin = {
      username: username,
      password: pwd,
    };
    setIsLoading(true);

    axios
      .post(URL, userToLogin)
      .then(res => {
        const accessToken = res?.data?.accessToken;
        const refreshToken = res?.data.refreshToken;

        setAuth({ username, pwd, accessToken, refreshToken });
        setUsername("");
        setPwd("");
        navigate("/");
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("User does not exist");
        } else if (err.response?.status === 401) {
          setErrMsg("Your password may be incorrect");
        } else {
          setErrMsg("Login Failed");
        }
      }).finally(() => setIsLoading(false))
      ;
  };

  const toggleRememberMe = () => {
    setRememberUser(prev => !prev);
  };

  return (
    <div className="relative">
      {isLoading ? <LoadingScreen /> : null}
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 lg:mb-12">
              <img
                src={require("../images/image.png")}
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 lg:mb-12 mb-32 md:mb-0">
              <form onSubmit={handleSumit}>
                {/*Username input */}
                {errMsg ? (
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mb-1 rounded relative"
                    role="alert"
                  >
                    <strong class="font-bold">{errMsg}</strong>
                  </div>
                ) : null}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="username"
                    autoComplete="off"
                    placeholder="username"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                      setErrMsg("");
                    }}
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
                    onChange={e => {
                      setPwd(e.target.value);
                      setErrMsg("");
                    }}
                    autoComplete="off"
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
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-1"
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

