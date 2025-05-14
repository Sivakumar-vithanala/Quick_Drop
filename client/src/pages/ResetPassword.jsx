import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { IoIosEyeOff } from "react-icons/io";
import toast from 'react-hot-toast'
import { IoIosEye } from "react-icons/io";
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validValue = Object.values(data).every(el => el);

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        //optional
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New Password And ConfirmPassword Must Be Same.")
            return
        }

        try {
            const res = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })
            if (res.data.error) {
                toast.error(res.data.message)
            }
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='w-full container mx-auto px-2'>

            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>

                <p className='font-semibold text-lg mb-5'>Enter Your Password</p>


                <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                        <label htmlFor="newpassword">New Password</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
                            <input type={showPassword ? "text" : "password"} id='password' name='newPassword' placeholder='Enter Your New Password' value={data.newPassword} onChange={handleChange}
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
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
                            <input type={showConfirmPassword ? "text" : "password"} id='password' name='confirmPassword' placeholder='Enter Your ConfirmPassword' value={data.confirmPassword} onChange={handleChange}
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

                    <button disabled={!validValue} className={`${validValue ? "bg-green-700 hover:bg-green-600" : "bg-gray-500"} text-white py-2 font-semibold my-4 tracking-wide`}>Change Password</button>
                </form>
                <p>
                    Already Have Account?<Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section >
    )
}

export default ResetPassword