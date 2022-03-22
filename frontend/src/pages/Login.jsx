import { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector} from "react-redux"
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, isLoading, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  },[isError, message, isSuccess, user, dispatch, navigate])


  const onChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id] : e.target.value
    }))
    
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
      const userData = {
        email,
        password
      }

      dispatch(login(userData))
  } 
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
          <p>Please log in to get support</p>
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input  type="email" 
                    className="form-control" 
                    id='email' value={email} 
                    placeholder='Enter your email'
                    onChange={onChange}
                    required/>
          </div>
          <div className="form-group">
            <input  type="password" 
                    className="form-control" 
                    id='password' value={password} 
                    placeholder='Enter password'
                    onChange={onChange}
                    required/>
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login