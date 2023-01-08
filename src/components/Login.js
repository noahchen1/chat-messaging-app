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
                    onChange={e => setUsername(e.target.value)}
                    ref={usernameRef}
                    id="username"
                    required
                />

                <label htmlFor='password'>Password:</label>
                <input 
                    type="password"
                    autoComplete='off'
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    id="password"
                    required
                />

                <button>Sign in</button>
            </form>
        </div>
    )
}
