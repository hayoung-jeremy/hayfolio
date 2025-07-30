import { useEffect, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { partsTypes } from "@/types/garage";

const PartsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  return (
    <div className="flex flex-col flex-1 w-full flex-wrap">
      {/* Thumbs */}
      <Swiper
        spaceBetween={0}
        slidesPerView={"auto"}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        className="w-full"
      >
        {partsTypes.map(type => (
          <SwiperSlide
            key={type}
            className="text-center py-2 px-6 whitespace-nowrap inline-flex items-center justify-center !w-fit"
          >
            {type}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Swiper */}
      
    </div>
  );
};

export default PartsCarousel;
