import React, { useEffect, useRef, useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import toast from 'react-hot-toast';
import SummaryApi from "../common/SummaryApi";
import Axios from '../utils/Axios';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""])

    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location", location);
    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [])

    const validValue = data.every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })

            if (res.data.error) {
                toast.error(res.data.message)
            }
            if (res.data.success) {
                toast.success(res.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        data: res.data,
                        email: location?.state?.email
                    }
                })
            }

        } catch (error) {
            axiosToastError(error)
        }
    }
    return (
        <section className='w-full container mx-auto px-2'>

            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>

                <p className='font-semibold text-lg mb-5'>Enter OTP</p>

                <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                        <label htmlFor="otp">Enter Your OTP</label>
                        <div className='flex items-center gap-2 justify-between mt-4'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input key={"otp" + index} type="otp" id='otp' value={data[index]} maxLength={1}
                                            ref={(ref) => {
                                                inputRef.current[index] = ref
                                                return ref
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                console.log("value", value);

                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)

                                                if (value && index < 5) {
                                                    inputRef.current[index + 1].focus()
                                                }
                                            }}
                                            className='bg-blue-50 w-full max-w-15 p-2 border rounded
                                        outline-none focus:border-primary text-center font-semibold' />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <button disabled={!validValue} className={`${validValue ? "bg-green-700 hover:bg-green-600" : "bg-gray-500"} text-white py-2 font-semibold my-4 tracking-wide`}>Verify OTP</button>
                </form>
                <p>
                    Already Have Account?<Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section >
    )
}

export default OtpVerification