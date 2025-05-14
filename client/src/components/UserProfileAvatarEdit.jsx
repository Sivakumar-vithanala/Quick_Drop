import React, { useState } from 'react'
import { FaUserTie } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { MdOutlineClose } from "react-icons/md";


const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar', file)

        setLoading(true)
        try {
            const res = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: resData } = res
            dispatch(updatedAvatar(resData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                <MdOutlineClose size={24}/>
                </button>
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadprofile">
                        <div className='border border-primary hover:bg-purple-600 px-4 py-1 rounded text-sm my-5 cursor-pointer'>
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                    </label>
                    <input onChange={handleUploadAvatarImage} type="file" id="uploadprofile" className='hidden' />
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit