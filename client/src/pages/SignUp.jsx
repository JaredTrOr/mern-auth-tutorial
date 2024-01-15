import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

//What is a proxy ?
//Headers and cors

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(false)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log(data)

      setLoading(false)

      if (!data.success) {
        setError(true)
        return
      }

      navigate('/sign-in')

    } catch(err) {
      setLoading(false)
      setError(true)
      console.error(err)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" 
        id="username" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}/>

        <input type="email" placeholder="Email" 
        id="email" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}/>

        <input type="password" placeholder="Password" 
        id="password" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}/>

        <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg 
        uppercase hover:opacity-95 cursor-pointer">{loading ? 'Loading...' : 'Sign up'}</button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in"><span className="text-blue-500">Sign in</span></Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  )
}
