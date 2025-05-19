import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import ProductCartAdmin from '../components/ProductCartAdmin'
import { IoMdSearch } from "react-icons/io";



const ProductAdmin = () => {

  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      })
      const { data: resData } = res

      if (resData.success) {
        setProductData(resData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
      }
      flag = false
    }, 300)
    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>

      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full min-w-24 w-full max-w-56 bg-blue-50 ml-auto  px-4 flex items-center gap-3 py-2 rounded border focus-within:border-one-orginal '>
          <IoMdSearch size={25} />
          <input type="text" name="" id="" placeholder='Search Product Here...' onChange={handleOnChange} className='h-full w-full outline-none bg-transparent' />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {
              productData.map((p, index) => {
                return (
                  <ProductCartAdmin data={p} />
                )
              })
            }
          </div>
        </div>

        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='border border-two-orginal px-4 py-1 hover:bg-two-dark'>Previous</button>
          <button className='w-full bg-slate-200'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-two-orginal px-4 py-1 hover:bg-two-dark'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default ProductAdmin