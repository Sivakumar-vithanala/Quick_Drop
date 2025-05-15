import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t-2'>
      <div className='container mx-auto pt-6 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
        <p>© All Rights Reserved 2025</p>

        <div className='flex items-center justify-center gap-4 text-3xl'>
          <a href="" className='hover:text-one-orginal'><FaFacebook /></a>
          <a href="" className='hover:text-one-orginal'><FaInstagram /></a>
          <a href="" className='hover:text-one-orginal'><FaWhatsapp /></a>
          <a href="" className='hover:text-one-orginal'><FaLinkedin /></a>
          <a href="" className='hover:text-one-orginal'><FaTwitter /></a>
        </div>

      </div>
    </footer>
  )
}

export default Footer