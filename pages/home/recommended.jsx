import React, { useEffect, useState } from 'react'
import BookCard from '../books/bookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const Recommended = () => {
  
  const {data: books=[]}=useFetchAllBooksQuery();
  return (
    <div className='py-12'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended For You</h2>
      <Swiper
        slidesPerView={1}
        navigation={true}
        spaceBetween={30}
        
         breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 50,
          }
          }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
         {
        books.length>0 && books.slice(8,18).map((book,index)=>(
          <SwiperSlide key={index}><BookCard book={book}></BookCard></SwiperSlide>
          
        ))
      }
        
        </Swiper>
    </div>
    
  )
}

export default Recommended
