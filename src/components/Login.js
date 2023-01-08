import React from 'react';
import { useRef, useState } from 'react';

export default function Login() {
    const usernameRef = useRef();
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <div>
            <h1>Sign in</h1>

            <form>
                <label htmlFor='username'>Username:</label>
                <input
                    type="text"
                    autoComplete='off'
                    value={username}
                    ref={usernameRef}
                    id="username"
                    required
                />

                <label htmlFor='password'>Password:</label>
                <input 
                    type="password"
                    value={pwd}
                    id="password"
                    required
                />

                <button>Sign in</button>
            </form>
        </div>
    )
}
