import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../urls/serverUrl";
import { useConversations } from "../context/ConversationsProvider";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESITER_URL = `${serverUrl}/register`;

export default function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef();

  const { isLoading, setIsLoading } = useConversations();
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    const newUser = {
      username: username,
      password: pwd,
    };

    axios
      .post(RESITER_URL, newUser)
      .then(res => {
        navigate("/login");
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg("No Server Response!");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg("Registration Failed!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);

    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    const match = pwd === matchPwd;
    setValidPwd(result);
    setValidMatch(match);
  }, [pwd, matchPwd]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      {isLoading ? <LoadingScreen /> : null}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          {errMsg ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mb-1 rounded relative"
              role="alert"
            >
              <strong className="font-bold">{errMsg}</strong>
            </div>
          ) : null}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-1"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="off"
            required
            ref={usernameRef}
            onChange={e => {
              setUsername(e.target.value);
              setErrMsg("");
            }}
          />

          {validName ? null : (
            <p
              id="username-note"
              className="text-sm bg-red-300 rounded-md mb-4 p-1"
            >
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          )}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-1 mt-8"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            required
            onChange={e => {
              setPwd(e.target.value);
              setErrMsg("");
            }}
          />

          {validPwd ? null : (
            <p id="pwd-note" className="text-sm bg-red-300 rounded-md mb-4 p-1">
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special cahracters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
          )}
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-1 mt-8"
            name="confirm_password"
            id="confirm-pwd"
            placeholder="Confirm Password"
            autoComplete="off"
            required
            onChange={e => setMatchPwd(e.target.value)}
          />

          {validMatch ? null : (
            <p
              id="confirm-pwd-note"
              className="text-sm bg-red-300 rounded-md mb-4 p-1"
            >
              Must match the first password input field
            </p>
          )}

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-400 text-white focus:outline-none mt-8"
            disabled={!validName || !validPwd || !validMatch ? true : false}
            onMouseOver={e => e.target.classList.add("hover:bg-green-600")}
          >
            Create Account
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue-400"
            href="../login/"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
