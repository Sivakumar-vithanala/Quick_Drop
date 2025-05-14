import React, { useState } from 'react';
import logo from '../assets/Logo(2).png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import UserMenu from './UserMenu';



const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }
        navigate("/user")
    }

    return (
        <header className="h-22 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center bg-white">
            {
                !(isSearchPage && isMobile) && (
                    <div className="container mx-auto flex items-center justify-between px-2 gap-1">
                        {/* Logo */}
                        <div className="flex items-center h-full">
                            <Link to={"/"} className="flex items-center h-full">
                                <img src={logo} width={120} height={50} alt="logo" className="hidden lg:block" />
                                <img src={logo} width={100} height={40} alt="logo" className="lg:hidden" />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="hidden lg:block">
                            <Search />
                        </div>

                        {/* Cart / Login */}
                        <div className="">
                            {/* user icons display in only mobile vesion */}
                            <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                <FaUser size={26} />
                            </button>

                            {/* Desktop */}
                            <div className='hidden lg:flex items-center gap-10'>
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex items-center select-none gap-2 cursor-pointer'>
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <FaAnglesUp size={26} />
                                                    ) : (
                                                        <FaAnglesDown size={26} />
                                                    )
                                                }
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-16'>
                                                        <div className='bg-orange-500 rounded-md p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className='text-lg px-2'> Login </button>
                                    )
                                }
                                <button className='flex items-center gap-2 bg-green-700 hover:bg-green-500 px-3 py-3 rounded text-white'>
                                    {/* add to cart icons */}
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div className='font-semibold'>
                                        <p>My Cart</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                )
            }

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>
        </header>
    );
};

export default Header;
