import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { partsTypes } from "@/types/garage";
import { partThumbnails } from "@/constants/partsThumbnails";

const PartsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (thumbsSwiper && thumbsSwiper.slideTo) {
      thumbsSwiper.slideTo(activeIndex);
    }
  }, [activeIndex, thumbsSwiper]);

  return (
    <div className="flex flex-col flex-1 w-full select-none">
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
              "text-center text-white opacity-50 py-2 px-6 whitespace-nowrap inline-flex items-center justify-center !w-fit cursor-pointer",
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
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {partsTypes.map(type => (
            <SwiperSlide key={`${type}-main`} className="">
              <div
                onWheel={e => e.stopPropagation()}
                className="max-h-[calc(50dvh-60px)] md:max-h-[calc(100dvh-60px)] overflow-y-auto pb-[env(safe-area-inset-bottom)]"
              >
                {partThumbnails[type]?.map(url => {
                  const name = url.split("/").pop()!;
                  const isBody = type === "Body";

                  const displayName = isBody
                    ? name.replace(".png", "").toUpperCase()
                    : (() => {
                        const parts = name.replace("thumb_", "").replace(".png", "").split("_");
                        const theme = parts[1] ?? "";
                        const variant = /^[A-Z]$/.test(parts[2] ?? "") ? parts[2] : "";
                        return `${theme.charAt(0).toUpperCase() + theme.slice(1)} ${variant}`.trim();
                      })();

                  return (
                    <div
                      key={url}
                      className="relative h-36 flex items-center justify-center my-5 border border-white/10 rounded-2xl mx-5 cursor-pointer hover:border-white/25 transition-all duration-200"
                    >
                      <Image src={url} alt={displayName} width={180} height={80} className="object-contain" />
                      <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-center bg-[#222] px-3 py-1 rounded-full">
                        {displayName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PartsCarousel;
