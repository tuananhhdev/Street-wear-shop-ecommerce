import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const BannerSlider = () => {
    return (
        <div className="w-full">
            {/* Slider cha, bao phủ, hỗ trợ trượt qua lại*/}
            <Swiper
                // Nút hình tròn, cho phép chuyển động
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full"
            >
                {/* Slider con */}
                <SwiperSlide>
                    <div className="w-full aspect-[12/5] flex justify-center items-center">
                        <img
                            src="/Image/banner1.jpg"
                            alt="Banner 1"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full aspect-[12/5] flex justify-center items-center">
                        <img
                            src="/Image/banner2.jpg"
                            alt="banner 2"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full aspect-[12/5] flex justify-center items-center">
                        <img
                            src="/Image/banner3.jpg"
                            alt="banner 3"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full aspect-[12/5] flex justify-center items-center">
                        <img
                            src="/Image/banner4.jpg"
                            alt="banner 4"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full aspect-[12/5] flex justify-center items-center">
                        <img
                            src="/Image/banner5.jpg"
                            alt="banner 5"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default BannerSlider
