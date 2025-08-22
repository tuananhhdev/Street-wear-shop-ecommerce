import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok, FaPhoneAlt } from 'react-icons/fa'
import axios from 'axios'

const SocialConnect = () => {
    return (
        <div className="py-10 px-4 bg-gray-100 text-center">
            <h2 className="text-2xl font-bold mb-4">Kết nối với chúng tôi</h2>
            <div className="flex justify-center gap-6 text-3xl">
                <a href="https://facebook.com" target="_blank" className="hover:text-blue-600"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" className="hover:text-blue-600"><FaInstagram /></a>
                <a href="https://tiktok.com" target="_blank" className="hover:text-blue-600"><FaTiktok /></a>
                <a href="https://zalo.me" target="_blank" className="hover:text-blue-600"><FaPhoneAlt /></a>
            </div>
        </div>
    )
}

export default SocialConnect
