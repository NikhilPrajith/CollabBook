'use client'
import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { BookCardV4 } from "./BookCard"


export default function CreationList({ creationList }) {
  return (
      <div className="flex flex-col m-2">
        {creationList.slice(0, 5).map((item: { image: string; title: string; description: string, category: string }, index: number) => (
          <div key={index} className=" p-2 flex items-start border-b">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-md object-cover mr-4"
            />
            <div>

            <div className="text-gray-400 text-xs">{item.category || 'Popular'}</div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
