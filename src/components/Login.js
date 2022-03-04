import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
        loading: false
    })
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setData(prevState => ({
            ...prevState, error: null, loading: true
        }))
        if (!email || !password) {
            setData(prevState => ({
                ...prevState, error: 'All fields are required'
            }))
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true
            })
            setData({
                email: '',
                password: '',
                error: null,
                loading: false
            });

            navigate('/')
        }

        catch (err) {
            setData(prevState => ({
                ...prevState, error: err.message, loading: false
            }))
        }



    }

    const { email, password, error, loading } = data

    return (
        <section>
            <h3>Login to your Accaunt</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={handleChange} />
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={handleChange} />
                </div>
                {error ? <p className='error'>{error}</p> : null}
                <div className='button-container'>
                    <button className='btn' disabled={loading}>{loading ? 'Logging in ...' : 'Login'}</button>
                </div>


            </form>
        </section>
    )

}

export default Login