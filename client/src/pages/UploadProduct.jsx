import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { VscClose } from "react-icons/vsc";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError'
import successAlert from '../utils/SuccessAleart';
import { Await } from 'react-router-dom';



const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const res = await uploadImage(file)
    const { data: Imageres } = res
    const imageUrl = Imageres.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })

      const { data: resData } = res
      if (resData.success) {
        successAlert(resData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>

      <div className='grid p-4'>
        <form className='grid gap-5' onSubmit={handleSubmit}>

          <div className='grid gap-2'>
            <label htmlFor="name">Name</label>
            <input id='name' type="text" placeholder='Enter Product Name' name='name' value={data.name} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="description">Description</label>
            <textarea id='description' type="text" placeholder='Enter Product Description' name='description' value={data.description} onChange={handleChange} required rows={3} className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded resize-none' />
          </div>

          <div>
            <p>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-30 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input type="file" name="" id="productImage" className='hidden' onChange={handleUploadImage} accept='image/*' />
              </label>
              {/**Display Upload image */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img src={img} alt={img} className='w-full h-full object-scale-down cursor-pointer' onClick={() => setViewImageUrl(img)} />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-700 rounded text-white hidden group-hover:block cursor-pointer'>
                          <RiDeleteBin2Line size={25} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="">Category</label>
            <div>
              <select name="" id="" className='bg-blue-50 w-full p-2 rounded' value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find(el => el._id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    }
                  })
                  setSelectCategory("")
                }}>
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "ProductSection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-one-dark cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <VscClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-2'>
            <label>Sub Category</label>
            <div>
              <select className='bg-blue-50 w-full p-2 rounded' value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}>
                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "SubCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-one-dark cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                          <VscClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="unit">Unit</label>
            <input id='unit' type="text" placeholder='Enter Product Unit' name='unit' value={data.unit} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="stock">Number Of Stock</label>
            <input id='stock' type="number" placeholder='Enter Product Stock' name='stock' value={data.stock} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="price">Price</label>
            <input id='price' type="number" placeholder='Enter Product Price' name='price' value={data.price} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="discount">Discount</label>
            <input id='discount' type="number" placeholder='Enter Product Discount' name='discount' value={data.discount} onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          {/** add more fields */}


          {
            Object?.keys(data?.more_details).map((k, index) => {
              return (
                <div className='grid gap-2'>
                  <label htmlFor={k}>{k}</label>
                  <input id={k} type="text" value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value
                      setData((preve) => {
                        return {
                          ...preve,
                          more_details: {
                            ...preve.more_details,
                            [k]: value
                          }
                        }
                      })
                    }}
                    required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
                </div>
              )
            })
          }


          <div onClick={() => setOpenAddField(true)} className='hover:bg-one-orginal bg-white py-1 px-3 w-32 text-center font-semibold border border-two-dark hover:text-neutral-900 cursor-pointer rounded'>
            Add Fields
          </div>
          <button className='bg-one-orginal hover:bg-one-dark py-2 rounded font-semibold'>
            Submit
          </button>
        </form>
      </div>

      {
        ViewImageUrl && (
          <viewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
        )
      }

      {
        openAddField && (
          <AddFieldComponent value={fieldName} onChange={(e) => setFieldName(e.target.value)} submit={handleAddField} close={() => setOpenAddField(false)} />
        )
      }
    </section>
  )
}

export default UploadProduct