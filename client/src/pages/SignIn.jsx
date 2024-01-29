import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import { useDispatch, useSelector } from 'react-redux' 

export default function SignIn() {

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart())

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      dispatch(signInSuccess(data))

      if (!data.success) {
        dispatch(signInFailure(data))
        return
      }

      navigate('/')

    } catch(err) {
      dispatch(signInFailure(err))
      console.error(err)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" 
        id="email" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}/>

        <input type="password" placeholder="Password" 
        id="password" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}/>

        <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg 
        uppercase hover:opacity-95 cursor-pointer">{loading ? 'Loading...' : 'Sign in'}</button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an account ?</p>
        <Link to="/sign-up"><span className="text-blue-500">Sign up</span></Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || 'Something went wrong' : ''}
      </p>
    </div>
  )
}
