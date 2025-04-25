import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Signup = () => {

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [instagramId, setInstagramId] = useState('')
    const [email, setEmail] = useState('')  

   
    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            alert("Passwords do not match")
            return
        }

        else 
        {
            fetch(`${import.meta.env.VITE_BASEURL_BACKEND}/auth/user/signup`, {
                method: 'POST',
                body: JSON.stringify({"username":username, "password": password, "instagramId": instagramId, "email": email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                res.json().then((data)=>{
                    console.log(data.success)
                    if(data.success){
                        window.location.href = '/login'
                    }
                    else{
                        alert('username already exists or make sure you have 8 character password and username')
                    }
                })
            }).catch((err)=>{
                // console.log(err)
            })
        }
    }

    
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow">
            <h1 className='text-3xl font-bold text-center text-white uppercase my-10'>signup</h1>

            <div  className='w-[99%] md:w-1/2 mx-1 md:mx-auto bg-slate-800 p-5 md:p-10 rounded-lg mb-20' >
                <form onSubmit={handleSubmit}>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="name">Username</label>
                        <input onChange={(e)=>setName((e.target.value).toLowerCase())} minLength={8} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="text" id="name" name="name" placeholder='must have 8 character'/>
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="password">Password</label>
                        <input onChange={(e)=>setPassword((e.target.value).toLowerCase())} minLength={8} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="password" id="password1" name="password" placeholder='must have 8 character'/>
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="password">Confirm Password</label>
                        <input onChange={(e)=>setPassword2((e.target.value).toLowerCase())} minLength={8} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="password" id="password2" name="password" placeholder='must have 8 character'/>
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="instagramId">Instagram Id</label>
                        <input onChange={(e)=>setInstagramId((e.target.value).toLowerCase())} className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="text" id="instagramId" name="instagramId" placeholder='eg., alice'/>
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="email">Email</label>
                        <input onChange={(e)=>setEmail((e.target.value).toLowerCase())} className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="email" id="email" name="email" placeholder='eg., alice@gmail.com'/>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-5 mt-10'>
                    <button className='h-[6vh] p-3 bg-indigo-600 hover:bg-indigo-700  rounded-lg text-slate-100 font-semibold' type="submit">Signup</button>
    
                    <Link to="/login" className='h-[6vh] p-3 rounded-lg text-slate-200 font-semibold' type="button">already having a account, <span className='bg-gradient-to-r from-indigo-400 to-indigo-500 text-transparent bg-clip-text border-b text-xl font-bold'>LOGIN</span></Link>
                    </div>
                    
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Signup