import React, { useState } from 'react'
import './login.css'
import { auth } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    // const state = { email: '', password: '', error: null }

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home')
        } catch (err) {
            console.error(err);
            setError(err);
        }

    }

    return (
        <>
            <section id="login-section">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card login">
                            <div className="card-header">
                                <h3>Sign In</h3>
                            </div>
                            <div className="card-body">
                                {error && <p className='text-danger'>Invalid username or password</p>}
                                <form id="login-form" >
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        </div>
                                        <input type="text" className="form-control" name="email" id="email" placeholder="email" onChange={(event) => { setEmail(event.target.value) }} required />

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" onChange={(event) => { setPassword(event.target.value) }} required />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn float-right login_btn" onClick={handleLogin}>Login</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ >
    )
}
