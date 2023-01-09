import { useRef, useState, useEffect } from "react";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESITER_URL = 'http://localhost:4000/register';

export default function Register() {
    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const newUser = {
            username: username,
            password: pwd
        };

        axios.post(RESITER_URL, newUser)
            .then(res => {
                setSuccess(true);
            }).catch(err => {
                if (!err?.response) {
                    setErrMsg('No Server Response!');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken')
                } else {
                    setErrMsg('Registration Failed!');
                }
                
                // errRef.current.focus();
            });
    };

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);

        setValidName(result)
    }, [username]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        const match = pwd === matchPwd;
        setValidPwd(result);
        setValidMatch(match);
    }, [pwd, matchPwd]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-1"
                        name="username"
                        id="username"
                        placeholder="Username"
                        autoComplete="off"
                        required
                        ref={usernameRef}
                        onChange={e => setUsername(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />

                    {validName
                        ? null
                        : <p id="username-note" className="text-sm bg-red-300 rounded-md mb-4 p-1">
                            4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    }

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-1 mt-8"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="off"
                        required
                        onChange={e => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />

                    {validPwd
                        ? null
                        : <p id="pwd-note" className="text-sm bg-red-300 rounded-md mb-4 p-1">
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special character. <br />
                            Allowed special cahracters:
                            <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>
                    }
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-1 mt-8"
                        name="confirm_password"
                        id="confirm-pwd"
                        placeholder="Confirm Password"
                        autoComplete="off"
                        required
                        onChange={e => setMatchPwd(e.target.value)}
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                    />

                    {validMatch
                        ? null
                        : <p id="confirm-pwd-note" className="text-sm bg-red-300 rounded-md mb-4 p-1">
                            Must match the first password input field
                        </p>
                    }

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-400 text-white focus:outline-none mt-8"
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                        onMouseOver={e => e.target.classList.add('hover:bg-green-600')}
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
