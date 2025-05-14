import React, { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';


const UploadCategoryModel = ({ close }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadCategoryImage = async(e) => {
        const file = e.target.files[0];

        if (!file) {
            return
        }
        const res = await uploadImage(file)
        const {data: Imageres} = res

        setData((preve)=>{
            return{
                ...preve,
                image:Imageres.data.url
            }
        })
        

    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-2 bg-neutral-800 bg-opacity-70 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Category</h1>
                    <button onClick={close} className='w-fit block ml-auto'> <IoCloseCircleOutline size={25} /></button>
                </div>

                <form className='my-5 grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label id='categoryName' htmlFor="categoryName">Name:</label>
                        <input type="text" name="name" id="categoryName" placeholder='Enter Category Name' value={data.name} onChange={handleOnChange}
                            className='bg-one-light p-2 border-one-dark focus-within:border-two-dark outline-none rounded-lg' />
                    </div>

                    <div className='grid gap-2'>
                        <p>image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-one-light h-48 w-full lg:w-48 mt-2 flex items-center justify-center'>
                               {
                                data.image ? (
                                    <img src={data.image} alt="category" className='w-full h-full object-scale-down'/>
                                ):(
                                   <p className=''> No Image</p> 
                                )
                               }
                                
                            </div>
                            <label htmlFor='uploadCategoryImage'>
                                <button className={`
                                    ${!data.name ? "bg-gray-400" : "border-two-light hover:bg-one-light"} 
                                    px-4 py-2 rounded-md cursor-pointer border font-medium
                                    `}>Upload Image</button>

                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type="file" id="uploadCategoryImage" className='hidden' accept="image/*"/>
                            </label>
                        </div>
                    </div>  
                    <button className={`
                        ${data.name && data.image ? "bg-two-dark" : "hover:bg-two-light"}
                        py-2 font-semibold 
                        `}>Add Category</button>
                </form>
            </div>
        </section>
    )
}

export default UploadCategoryModel