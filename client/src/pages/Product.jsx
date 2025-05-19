import React, { useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const Product = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)


    const fetchProductData = async () => {
        try {
            const res = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                }
            })
            const { data: resData } = res

            if (resData.success) {
                setProductData(resData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div>Product</div>
    )
}

export default Product