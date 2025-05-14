import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const CategoryPage = () => {

  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory,setDeleteCategory] = useState({
    _id:""
  })

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: resData } = res

      if (resData.success) {
        setCategoryData(resData.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory =async() => {
    try {
      const res = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const {data : resData} = res
      if(resData.success){
        toast.success(resData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-one-orginal hover:bg-one-light px-3 py-2 rounded-md'>Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }

      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2'>
        {
          categoryData.map((category, index) => {
            return (
              <div className='w-32 h-56 rounded shadow-lg' key={category._id}>
                <img src={category.image} alt={category.name} className='w-full object-scale-down' />

                <div className='items-center h-9 flex gap-2'>
                  <button onClick={() => { setOpenEdit(true); setEditData(category) }} className='flex-1 bg-two-light hover:bg-two-dark rounded-lg font-normal py-1'>Edit</button>
                  <button onClick={()=>{setOpenConfirmBoxDelete(true);setDeleteCategory(category)}} className='flex-1 bg-one-light hover:bg-one-dark rounded-lg font-normal py-1'>Delete</button>
                </div>

              </div>
            )
          })
        }
      </div>

      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
        )
      }

      {
        openEdit && (
          <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
        )
      }

      {
        openConfirmBoxDelete && (
          <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
        )
      }
    </section>
  )
}

export default CategoryPage