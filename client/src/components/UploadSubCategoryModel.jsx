import React, { useState } from 'react'
import { CgCloseR } from "react-icons/cg";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({ close,fetchData }) => {

    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })

    const allCategory = useSelector(state => state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return
        }

        const res = await uploadImage(file)
        const { data: Imageres } = res

        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: Imageres.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index, 1)
        setSubCategoryData((preve) => {
            return {
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault()
        
        try {
            const res = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategoryData
            })

            const { data: resData } = res

            console.log("responseData",responseData)

            if (resData.success) {
                toast.success(resData.message)
                if (close) {
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded-md'>
                <div className='flex items-center justify-between gap-4'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button onClick={close}>
                        <CgCloseR size={25} />
                    </button>
                </div>

                <form className='my-4 grid gap-4' onSubmit={handleSubmitSubCategory}>

                    <div className='grid gap-2'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' name='name' value={subCategoryData.name} onChange={handleChange} className='p-3 bg-blue-50 border outline-none focus-within:border-two-light rounded' />
                    </div>

                    <div className='grid gap-2'>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400'>No Image</p>
                                    ) : (
                                        <img
                                            alt='subCategory'
                                            src={subCategoryData.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    )
                                }
                            </div>
                            <label htmlFor="uploadsubcategoryimage">
                                <div className='px-4 py-1 border border-two-dark rounded hover:bg-two-orginal cursor-pointer'>
                                    Upload Image
                                </div>
                                <input type="file" id='uploadsubcategoryimage' className='hidden' onChange={handleUploadSubCategoryImage} />
                            </label>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <label> Select Category</label>
                        <div className='border focus-within:border-one-orginal rounded'>
                            
                            {/*** Display Value */}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategoryData.category.map((cat, index) => {
                                        return (
                                            <p key={cat._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-4'>
                                                {cat.name}
                                                <div className='cursor-pointer hover:text-one-orginal' onClick={() => handleRemoveCategorySelected(cat._id)}>
                                                    <IoIosCloseCircleOutline size={23} />
                                                </div>
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            {/*** Seclect Category */}
                            <select className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)

                                    setSubCategoryData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryDetails]
                                        }
                                    })
                                }}>
                                <option value={""}>Seclect Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option value={category?._id} key={category._id + "subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button className={`px-4 py-2 border ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-two-orginal hover:bg-two-dark" : " bg-gray-200"}`}>
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel