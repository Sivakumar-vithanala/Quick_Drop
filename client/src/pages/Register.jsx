import React, { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import toast from 'react-hot-toast';
import SummaryApi from "../common/SummaryApi";
import Axios from '../utils/Axios';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
// console.log(data);

  const validValue = Object.values(data).every(el => el);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be the same")
      return
    }

    try {
      const res = await Axios({
        ...SummaryApi.register,
        data : data
      })

      if (res.data.error) {
        toast.error(res.data.message)
      }

      if (res.data.success) {
        toast.success(res.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }

    } catch (error) {
      axiosToastError(error)

    }
  }
  return (
    <section className='w-full container mx-auto px-2'>

      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>

        <p>Welcome To QuickDrop</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="name">Name :</label>
            <input type="text" id='name' autoFocus name='name' placeholder='Enter Your Name' value={data.name} onChange={handleChange}
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary' />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="email">Email :</label>
            <input type="email" id='email' name='email' placeholder='Enter Your Email' value={data.email} onChange={handleChange}
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary' />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="password">Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
              <input type={showPassword ? "text" : "password"} id='password' name='password' placeholder='Enter Your Password' value={data.password} onChange={handleChange}
                className='w-full outline-none' />
              <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <IoIosEye size={20} />
                  ) : (
                    <IoIosEyeOff size={20} />
                  )
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
              <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword' name='confirmPassword' placeholder='Enter Your Password' value={data.confirmPassword} onChange={handleChange}
                className='w-full outline-none' />
              <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showConfirmPassword ? (
                    <IoIosEye size={20} />
                  ) : (
                    <IoIosEyeOff size={20} />
                  )
                }
              </div>
            </div>
          </div>

          <button disabled={!validValue} className={`${validValue ? "bg-green-700 hover:bg-green-600" : "bg-gray-500"} text-white py-2 font-semibold my-4 tracking-wide`}>Register</button>
        </form>
        <p>
          Already have account ? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section >
  )
}

export default Register