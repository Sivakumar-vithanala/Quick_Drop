import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import DashBoard from "../layouts/DashBoard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Addres from "../pages/Addres";
import CategoryPage from "../pages/CategoryPage";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "verification-otp",
        element: <OtpVerification />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        path: "user",
        element: <UserMenuMobile />
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "myorders",
            element: <MyOrder />
          },
          {
            path: "address",
            element: <Addres />
          },
          {
            path: "category",
            element: <AdminPermision> <CategoryPage /> </AdminPermision>
          },
          {
            path: "subcategory",
            element: <AdminPermision> <SubCategory /> </AdminPermision>
          },
          {
            path: "uploadproduct",
            element: <AdminPermision> <UploadProduct /> </AdminPermision>
          },
          {
            path: "product",
            element: <AdminPermision> <ProductAdmin /> </AdminPermision>
          },

        ]
      }
    ]
  },
]);

export default router