import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth,db } from '../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Register (){
    const[data,setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false
    })
    const navigate = useNavigate();

    function handleChange (e){
        const {name,value} = e.target
        setData(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        setData(prevState => ({
            ...prevState, error:null , loading: true
        }))
        if(!name || !email || !password){
            setData(prevState => ({
                ...prevState, error: 'All fields are required'
            }))
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, 'users', result.user.uid),{
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            }) 
            setData({
                name: '',
                email: '',
                password: '',
                error: null,
                loading: false
            });

            navigate('/')
        }

        catch(err){
            setData(prevState => ({
                ...prevState, error: err.message , loading: false
            }))
        }



    }
    
    const {name, email, password, error, loading } = data
    
    return (
        <section>
            <h3>Create an Accaunt</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Name</label>
                    <input type='text' name='name' value={name} onChange={handleChange}/>
                </div>
                <div className='input-container'>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={handleChange}/>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={handleChange}/>
                </div>
                {error ? <p className='error'>{error}</p> :null}
                <div className='button-container'>
                    <button className='btn' disabled={loading}>{loading ? 'Creatting ...' : 'Register'}</button>
                </div>


            </form>
        </section>
    )

}

export default Register