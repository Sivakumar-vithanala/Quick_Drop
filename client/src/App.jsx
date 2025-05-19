import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUerDetails.js';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice.js';




function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const res = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: resData } = res

      if (resData.success) {
        dispatch(setAllCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }

    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

   const fetchSubCategory = async () => {
    try {
      // dispatch(setLoadingCategory(true))
      const res = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: resData } = res

      if (resData.success) {
        dispatch(setAllSubCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }

    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  }


  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])

  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
