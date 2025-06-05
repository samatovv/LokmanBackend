'use client';

import { Container } from "@/shared/helpers/Container";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBannerStore } from "./model/store";
import { Skeleton } from "@mui/material";
import { baseURL } from "@/api";

export default function BannerSlider() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const { fetchBanners, banners } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners, index]);

  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      const nextIndex = (prevIndex + newDirection + banners.length) % banners.length;
      return [nextIndex, newDirection];
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (!banners.length) {
    return (
      <div className="mt-5 md:mt-12">
        <Container>
          <div className="relative h-[380px] rounded-xl overflow-hidden">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              sx={{ borderRadius: '12px' }}
            />
  
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
  
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 z-20">
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={30}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', mt: 1 }}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }  
  

  return (
    <div className="mt-5 md:mt-12">
      <Container>
        <div className="relative h-[380px] rounded-xl overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={banners[index]?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full px-4 md:px-30 py-4 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                backgroundImage: `url(${baseURL}/uploads/${banners[index]?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-0" />

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="relative z-10 flex flex-col items-center md:items-start gap-4 text-center md:text-left bg-[#0f2a47] p-4 rounded-xl"
              >
                <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold md:font-bold text-white">
                  {banners[index]?.title}
                </h3>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 z-10 w-10 h-10 bg-white rounded-full shadow hover:bg-[#0f2a47] transition duration-300 hover:scale-110 hover:text-white"
          >
            ‹
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 z-10 w-10 h-10 bg-white rounded-full shadow hover:bg-[#0f2a47] transition duration-300 hover:scale-110 hover:text-white"
          >
            ›
          </button>
        </div>
      </Container>
    </div>
  );
}
