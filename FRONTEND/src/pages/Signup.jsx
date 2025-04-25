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
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow">
            <h1 className='text-3xl font-bold text-center text-white uppercase my-10'>signup</h1>

            <div  className='w-[99%] md:w-1/2 mx-1 md:mx-auto bg-slate-800 p-5 md:p-10 rounded-lg mb-20' >
                <form onSubmit={handleSubmit}>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="name">Username</label>
                        <input onChange={(e)=>setName(e.target.value)} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="text" id="name" name="name" />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="password">Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="password" id="password1" name="password" />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="password">Confirm Password</label>
                        <input onChange={(e)=>setPassword2(e.target.value)} required className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="password" id="password2" name="password" />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="instagramId">Instagram Id</label>
                        <input onChange={(e)=>setInstagramId(e.target.value)} className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="text" id="instagramId" name="instagramId" />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-between flex-wrap'>
                        <label className='text-xl text-slate-300 font-semibold' htmlFor="email">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} className='w-full h-[7vh] p-3 bg-slate-700 rounded-lg text-slate-200' type="email" id="email" name="email" />
                    </div>
                    <div className='flex justify-center gap-5 mt-10'>
                    <button className='h-[7vh] p-3 bg-slate-400  rounded-lg text-slate-800 font-semibold' type="submit">Signup</button>
                    <Link to="/login" className='h-[7vh] p-3 ring ring-slate-500 rounded-lg text-slate-200 font-semibold' type="button">login</Link>
                    </div>
                    
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Signup