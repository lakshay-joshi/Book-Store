import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from "react-icons/hi2"; // ✅ Menu icon from v2
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi"; // ✅ These from v1
import { IoSearchOutline } from "react-icons/io5";
import avatarImg from '../src/assets/book/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../src/context/AuthContext';
const navigation=[
  {name:'Dashboard',href:'/dashboard'},
  {name:'Orders',href:'/orders'},
  {name:'Cart',href:'/cart'}, 
  {name:'Check-Out',href:'/checkout'},
]



const Navbar = () => {
  const [isDropDownOpen,setIsDropDownOpen]=useState(false); 
  const cartItems= useSelector(state=>state.cart.cartItems);
  const {currentUser,logout}=useAuth();
  const handleLogOut=()=>{
    logout();
  }
  return (  
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>

        {/* Left Section: Logo + Search */}
        <div className='flex items-center md:gap-16 gap-4'>
          <Link to="/" className="text-2xl text-gray-800 hover:text-primary">
            <HiMiniBars3CenterLeft className='size-6' />
          </Link>

          <div className='relative sm:w-72 w-40'>
            <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input
              type='text'
              placeholder='What are you looking for?'
              className="bg-[#EAEAEA] w-full py-1 pl-10 pr-4 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right Section: Nav Icons */}
        <div className='flex items-center gap-6 text-gray-700'>
            <div>
              {
                currentUser?(<><button onClick={()=>setIsDropDownOpen(!isDropDownOpen)}><img src={avatarImg} alt='user' className={`size-7 rounded-full ${currentUser? 'ring-2 ring-blue-500':''}`}></img></button>
                {isDropDownOpen && (<div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'><ul className='py-2'>{navigation.map((item)=>(<li key={item.name} onClick={()=>setIsDropDownOpen(false)}><Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>{item.name}</Link></li>))}<li><button onClick={handleLogOut} className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>Log-out</button></li></ul></div>)}</>):<Link to={"/login"}><HiOutlineUser className='size-6' /></Link>
              }
            </div>
          <button className='hidden sm:block hover:text-blue-600 transition'>
            <HiOutlineHeart className='size-6' />
          </button>
          <Link to="/cart" className='hover:text-white bg-yellow-400 text-white p-1 sm:px-6 py-2 flex items-center gap-2 rounded-sm transition'>
            <HiOutlineShoppingCart className='size-6' />
            {
              cartItems.length>0? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>:<span className='text-sm font-semibold sm:ml-1'>0</span>
            }
           
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
