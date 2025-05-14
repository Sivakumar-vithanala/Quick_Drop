import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserTie } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUerDetails';

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  })

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      })
      const { data: resData } = res
      if (resData.success) {
        toast.success(resData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-6'>
      {/** profile upload and display image */}

      <div className='w-20 h-20 bg-slate-200 flex items-center justify-center rounded overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img src={user.avatar} alt={user.name}
              className='w-full h-full'
            />
          ) : (
            <FaUserTie size={65} />
          )
        }
      </div>
      <button onClick={() => setOpenProfileAvatarEdit(true)} className='text-sm min-w-20 px-3 py-1 border border-primary hover:border-purple-400 hover:bg-primary rounded-full mt-3'>Edit Profile</button>
      {
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
        )
      }
      {/** name mobile email change password */}

      <form className='my-4 grid gap-6' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder='Enter Your Name' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-light rounded'
            value={userData.name}
            name='name'
            onChange={handleOnchange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder='Enter Your Email' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-light rounded'
            value={userData.email}
            name='email'
            onChange={handleOnchange}
            required
          />
        </div>

        <div className='grid'>
          <label htmlFor="mobile">Mobile</label>
          <input type="text" id="mobile" placeholder='Enter Your Mobile' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-light rounded'
            value={userData.mobile}
            name='mobile'
            onChange={handleOnchange}
            required
          />
        </div>

        <button className='border px-4 py-2 font-semibold hover:bg-primary border-purple-500 text-orange-500 hover:text-neutral-800 rounded-md'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>

      </form>


    </div>
  )
}

export default Profile