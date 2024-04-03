'use client';

import React from 'react';
import Image from 'next/image'
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
import { useState } from 'react';

interface Props {
  images:  string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
   <div className={ className }>
    <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
      } 
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination ]}
        className="mySwiper2"
      >
        
        {
          images.map( image => (
          <SwiperSlide key={ image }>
            <Image  
                width={1024}
                height={800} 
                src={`/products/${ image }`} 
                alt={ title }              
                className='rounded-lg object-fill'
                priority
            />
          </SwiperSlide>

          ))
        }
     </Swiper>

{/* 2a parte del slide show */}
<Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
           {
          images.map( image => (
          <SwiperSlide key={ image }>
            <Image  
                width={300}
                height={300} 
                src={`/products/${ image }`} 
                alt={ title }              
                className='rounded-lg object-fill'
                priority
            />
          </SwiperSlide>

          ))
        }
      </Swiper>

   </div> 
  );
};