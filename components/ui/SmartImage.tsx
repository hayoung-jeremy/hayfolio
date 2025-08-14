"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type LoaderVariant = "skeleton" | "color";

type SmartImageProps = Omit<ImageProps, "onLoadingComplete"> & {
  loaderVariant?: LoaderVariant;
  wrapperClassName?: string;
  roundedClassName?: string;
};

function hashHue(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export default function SmartImage({
  loaderVariant = "skeleton",
  wrapperClassName,
  roundedClassName = "",
  className,
  src,
  alt,
  fill,
  width,
  height,
  style,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  const pastelBg = useMemo(() => {
    const key = typeof src === "string" ? src : (src as any)?.src ?? "img";
    return `hsl(${hashHue(key)} 60% 18% / 0.28)`;
  }, [src]);

  const inlineSize = !fill && width && height ? { width, height } : undefined;

  return (
    <div className={clsx("relative overflow-hidden", fill && "h-full w-full", wrapperClassName)} style={inlineSize}>
      {!loaded && (
        <div
          className={clsx(
            "absolute inset-0",
            roundedClassName,
            loaderVariant === "skeleton" && "animate-pulse bg-white/5"
          )}
          style={loaderVariant === "color" ? { background: pastelBg } : undefined}
          aria-hidden
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className={clsx(fill && "h-full w-full")}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={clsx("block", className)}
          style={style}
          onLoadingComplete={() => setLoaded(true)}
          {...rest}
        />
      </motion.div>
    </div>
  );
}
