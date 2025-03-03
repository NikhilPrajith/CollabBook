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
import { Book } from "@/app/page"

const trending = [
  {
    image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
    title: "Iron Flame",
    description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  },
  {
    image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
    title: "One Piece",
    description: "Join Luffy on his quest to become the Pirate King.",
  },
  {
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
    title: "Jujutsu Kaisen",
    description: "Dive into the world of cursed energy and fierce battles.",
  },

  {
    image: "https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg",
    title: "Iron Flame",
    description: "A thrilling fantasy adventure featuring dragons and epic battles.",
  },
  {
    image: "https://images-platform.99static.com/WWeTfsyhi69xuCvwOh7Y_RBGZ_k=/2x418:971x1387/500x500/top/smart/99designs-contests-attachments/120/120397/attachment_120397084",
    title: "One Piece",
    description: "Join Luffy on his quest to become the Pirate King.",
  },
  {
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740819/jujutsu-kaisen-the-official-anime-guide-season-1-9781974740819_hr.jpg",
    title: "Jujutsu Kaisen",
    description: "Dive into the world of cursed energy and fierce battles.",
  }
];

export default function TrendingCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2.1}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
        }}
      >
        {trending.map((item, index) => (
          <SwiperSlide key={index} className="cursor-pointer" >
            <div className="relative rounded-lg overflow-hidden group w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute flex justify-end flex-col bottom-0 left-0 right-0 top-0 mt-auto bg-black bg-opacity-70 p-4 transition-all">
                <div><Badge className="mb-2">Trending</Badge></div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-3 w-1/2">
                  <Button variant="outline" className="w-full">Read Now</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export function TrendingCarouselV2({ trendingCreations }: { trendingCreations: { image: string; title: string; description: string }[] }) {
  return (
    <div className="w-full m-5">
      <Swiper

        effect={'cards'}
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={4.5}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
        }}
      >
        {trendingCreations.map((item, index) => (
          <SwiperSlide key={index} className="cursor-pointer" >
            <div className="relative rounded-lg overflow-hidden group w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute flex justify-end flex-col bottom-0 left-0 right-0 top-0 mt-auto bg-black bg-opacity-70 p-4 transition-all">
                <div><Badge className="mb-2">Trending</Badge></div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-3 w-1/2">
                  <Button variant="outline" className="w-full">Read Now</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
