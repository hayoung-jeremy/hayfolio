import { useEffect, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const PartsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  return (
    <div className="flex flex-col flex-1">
      <Swiper
        spaceBetween={12}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        className="w-full px-4 mb-2"
      >
        <SwiperSlide key="cat1" className="text-center py-2 px-2">
          Category 1
        </SwiperSlide>
        <SwiperSlide key="cat2" className="text-center py-2 px-2">
          Category 2
        </SwiperSlide>
        <SwiperSlide key="cat3" className="text-center py-2 px-2">
          Category 3
        </SwiperSlide>
        <SwiperSlide key="cat4" className="text-center py-2 px-2">
          Category 4
        </SwiperSlide>
        <SwiperSlide key="cat5" className="text-center py-2 px-2">
          Category 5
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PartsCarousel;
