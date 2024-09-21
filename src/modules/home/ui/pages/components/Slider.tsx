import React, { useState, useEffect } from 'react'

import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from 'react-icons/hi2'


interface SliderProps {
  images: string[];
  interval?: number;
}

const Slider: React.FC<SliderProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      nextSlide()
    }, interval)


    return () => clearInterval(sliderInterval)
  }, [currentIndex, interval])

  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-800">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 object-contain rounded-lg shadow-lg"
      />
      <button
        onClick={prevSlide}
        className="absolute left-7 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <HiOutlineArrowSmallLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-7 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <HiOutlineArrowSmallRight />
      </button>
    </div>
  )
}

export { Slider }