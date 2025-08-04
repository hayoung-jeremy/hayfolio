import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { partsTypes } from "@/types/garage";
import { partThumbnails } from "@/constants/partsThumbnails";
import { useGarageStore } from "@/store/useGarageStore";

const PartsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const { selectBody, selectPart, selectedBody, selectedParts, activePartTabIndex, setActivePartTabIndex } =
    useGarageStore();

  useEffect(() => {
    if (thumbsSwiper && thumbsSwiper.slideTo) {
      thumbsSwiper.slideTo(activePartTabIndex);
    }
    if (mainSwiper && mainSwiper.slideTo) {
      mainSwiper.slideTo(activePartTabIndex, 0);
    }
  }, [activePartTabIndex, thumbsSwiper, mainSwiper]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
      className="flex flex-col flex-1 w-full select-none"
    >
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
              "text-center text-white opacity-50 py-2 px-6 md:py-4 md:text-[18px] whitespace-nowrap inline-flex items-center justify-center !w-fit cursor-pointer",
              {
                "opacity-100": index === activePartTabIndex,
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
          onSlideChange={swiper => setActivePartTabIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {partsTypes.map(type => (
            <SwiperSlide key={`${type}-main`} className="">
              <div
                onWheel={e => e.stopPropagation()}
                className="garage-scrollable max-h-[34.7dvh] md:max-h-[calc(40dvh)] xl:max-h-[calc(100dvh-60px)] overflow-y-auto pb-[env(safe-area-inset-bottom)]"
              >
                {partThumbnails[type]?.map(url => {
                  const name = url.split("/").pop()!;
                  const isBody = type === "Body";

                  let theme = "";
                  let variant = "";
                  const displayName = isBody
                    ? name.replace(".png", "").toUpperCase()
                    : (() => {
                        const parts = name.replace("thumb_", "").replace(".png", "").split("_");
                        theme = parts[1] ?? "";
                        variant = /^[A-Z]$/.test(parts[2] ?? "") ? parts[2] : "";
                        return `${theme.charAt(0).toUpperCase() + theme.slice(1)} ${variant}`.trim();
                      })();

                  const isSelected = isBody
                    ? selectedBody === name.replace(".png", "").toUpperCase()
                    : selectedParts[type]?.imageUrl === url;

                  return (
                    <div
                      key={url}
                      onClick={() => {
                        if (isBody) {
                          selectBody(name.replace(".png", "").toUpperCase() as "XM3" | "SM6" | "QM6");
                        } else {
                          selectPart(type, { imageUrl: url, theme, variant });
                        }
                      }}
                      className={clsx(
                        "relative h-36 flex items-center justify-center mx-5 my-5 cursor-pointer",
                        "border border-white/15 rounded-2xl",
                        "transition-all duration-200",
                        { "border-white/60": isSelected, "hover:border-white/30": !isSelected }
                      )}
                    >
                      <Image
                        src={url}
                        alt={displayName}
                        width={180}
                        height={80}
                        className={clsx("object-contain transition-all duration-200", {
                          "opacity-100": isSelected,
                          "opacity-30": !isSelected,
                        })}
                      />
                      <p
                        className={clsx(
                          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm text-center bg-[#1d1d1d] px-3 py-1 rounded-full border border-transparent trasaltion-all duration-200 text-white/50",
                          { "border-white/50 px-4 text-white/100": isSelected }
                        )}
                      >
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
    </motion.div>
  );
};

export default PartsCarousel;
