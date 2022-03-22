import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { useDispatch, useSelector} from "react-redux"
import { register,reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    password2:''
  })

  const { name, email, password, password2 } = formData

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

    if(password !== password2)
    {
      toast.error('Password and confirm password do not match')
    }else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  } 

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
          <p>Please create an account</p>
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input  type="text" 
                    className="form-control" 
                    id='name' value={name} 
                    placeholder='Enter your name'
                    onChange={onChange}
                    required
                    />
          </div>
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
            <input  type="password" 
                    className="form-control" 
                    id='password2' value={password2} 
                    placeholder='Confirm password'
                    onChange={onChange}
                    required/>
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register