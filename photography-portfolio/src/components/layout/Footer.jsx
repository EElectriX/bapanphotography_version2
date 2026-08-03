import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaPhone, 
  FaEnvelope,
  FaMapMarkerAlt 
} from "react-icons/fa";

import { FaLinkedin } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";


const siteName = import.meta.env.VITE_SITE_NAME || 'Bapan Mondal Photography Academy'
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'mondalbapan055@gmail.com'


export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-medium text-parchment">
            {siteName}
          </p>
          
           <div className="flex items-center space-x-2 mt-2">
              <p className="text-gray-400">Made by Saptarshi</p>
              <a
                href="https://www.linkedin.com/in/saptorshi-mondol-9a474a1a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
        </div>

        <div>
          <p className="field-label mb-4">Navigate</p>
          <ul className="space-y-2 text-sm text-parchment-dim">
            <li><Link to="/gallery" className="hover:text-parchment">Gallery</Link></li>
            <li><Link to="/courses" className="hover:text-parchment">Courses</Link></li>
            <li><Link to="/blog" className="hover:text-parchment">Journal</Link></li>
            <li><Link to="/booking" className="hover:text-parchment">Book a Seat</Link></li>
             <li><Link to="/contact" className="hover:text-parchment">Contact</Link></li>
          </ul>
        </div>

         <div className="flex flex-col items-start md:items-end space-y-3">
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <FaFacebookF className="cursor-pointer hover:text-gray-400"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/bapan.mondal.7792052",
                    "_blank"
                  )
                }
              />
             
              <FaYoutube className="cursor-pointer hover:text-gray-400" />
              <FaInstagram className="cursor-pointer hover:text-gray-400"
              onClick={() =>
                  window.open(
                    "https://www.instagram.com/bapanphotography/?hl=en",
                    "_blank"
                  )
                } />
              <FaMapMarkerAlt className="cursor-pointer hover:text-gray-400"
            onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/r9VhmsQuGPNhQFZi9",
                  "_blank"
                )
              } />
            </div>
            <div className="flex space-x-1">
              
              <FaPhone className="cursor-pointer hover:text-gray-400" />
              <p className="text-sm text-parchment-dim">+91 8777027077</p>
             
            </div>
            <div className="flex space-x-1">
               <FaEnvelope  className="cursor-pointer hover:text-gray-400" />
               <p className="text-sm text-parchment-dim">mondalbapan055@gmail.com</p>
            </div>
            <div className="flex items-start space-x-1 text-right md:text-right">
               <p className="text-sm text-parchment-dim">
                 Thakurpukur Metro Station, Abhay Pada School, Kolkata 700063
               </p>
            </div>

            {/* Language Selector
            <select className="bg-gray-800 text-white px-3 py-1 border border-gray-600 rounded-md">
              <option>EN</option>
              <option>FR</option>
              <option>DE</option>
            </select> */}
          </div>

        
      </div>

      <div className="border-t border-ink-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim/70 sm:flex-row">
          <span>© {new Date().getFullYear()} {siteName}</span>
          <span>Shot on film. Built with light.</span>
        </div>
      </div>
    </footer>
  )
}