import { useEffect, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { partsTypes } from "@/types/garage";

const PartsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (thumbsSwiper && thumbsSwiper.slideTo) {
      thumbsSwiper.slideTo(activeIndex);
    }
  }, [activeIndex, thumbsSwiper]);

  return (
    <div className="flex flex-col flex-1 w-full">
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
        {partsTypes.map((type, index) => (
          <SwiperSlide
            key={type}
            className={clsx(
              "text-center text-white opacity-50 py-2 px-6 whitespace-nowrap inline-flex items-center justify-center !w-fit",
              {
                "opacity-100": index === activeIndex,
              }
            )}
          >
            {type}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Swiper */}
      <div className="flex-1 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          mousewheel={false}
          onSwiper={setMainSwiper}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {partsTypes.map((type, idx) => (
            <SwiperSlide key={`${type}-main`} className="p-5 text-white text-sm">
              <div
                onWheel={e => {
                  e.stopPropagation();
                }}
                className="max-h-[calc(50dvh-60px)] md:max-h-[calc(100dvh-60px)] overflow-y-auto pb-[env(safe-area-inset-bottom)]"
              >
                {/* 👇 더미 스크롤 컨텐츠 */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="shrink-0 bg-white/10 p-2 rounded h-40">
                    {type} Content {i + 1}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PartsCarousel;
