import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect } from 'react'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import Viewimage from '../components/Viewimage'
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditSubCategory from './EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'



const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)


  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: resData } = res

      if (resData.success) {
        setData(resData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex items-center justify-center'>
          <img src={row.original.image} alt={row.original.name} className='w-20 h-20 cursor-pointer' onClick={setImageURL(row.original.image)} />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => (
              <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
            ))}
          </>
        );
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-4'>
            <button onClick={() => { setOpenEdit(true); setEditData(row.original) }} className='p-2 bg-green-100 rounded-full hover:text-green-800'>
              <FaPencilAlt size={20} />
            </button>
            <button onClick={() => { setOpenDeleteConfirmBox(true); setDeleteSubCategory(row.original) }} className='p-2 bg-red-100 rounded-full hover:text-red-800'>
              <MdDeleteForever size={20} />
            </button>
          </div>
        )
      }
    })

  ]

  const handleDeleteSubCategory = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      })
      const { data: resData } = res

      if (resData.success) {
        toast.success(resData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='text-sm border border-one-orginal hover:bg-one-light px-3 py-2 rounded-md'>Add Sub Category</button>
      </div>


      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable data={data} column={column} />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
        )
      }

      {
        imageURL &&
        <Viewimage url={imageURL} close={() => setImageURL("")} />
      }

      {
        openEdit &&
        <EditSubCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchSubCategory} />
      }

      {
        openDeleteConfirmBox && (
          <ConfirmBox cancel={() => setOpenDeleteConfirmBox(false)} close={() => setOpenDeleteConfirmBox(false)} confirm={handleDeleteSubCategory} />
        )
      }

    </section>
  )
}

export default SubCategory