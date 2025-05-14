import React, { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import toast from 'react-hot-toast';
import SummaryApi from "../common/SummaryApi";
import Axios from '../utils/Axios';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  })

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
  const validValue = Object.values(data).every(el => el);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await Axios({
        ...SummaryApi.forgot_password,
        data : data
      })

      if (res.data.error) {
        toast.error(res.data.message)
      }

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/verification-otp",{
            state: data
        })
        setData({
          email: "",
        })
      
      }

    } catch (error) {
      axiosToastError(error)
    }
  }
  return (
    <section className='w-full container mx-auto px-2'>

      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>

        <p className='font-semibold text-lg mb-5'>Forgot Password</p>


        <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="email">Email :</label>
            <input type="email" id='email' name='email' placeholder='Enter Your Email' value={data.email} onChange={handleChange}
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary' />
          </div>

          <button disabled={!validValue} className={`${validValue ? "bg-green-700 hover:bg-green-600" : "bg-gray-500"} text-white py-2 font-semibold my-4 tracking-wide`}>Send OTP</button>
        </form>
        <p>
          Already Have Account?<Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section >
  )
}

export default ForgotPassword