import React from 'react'
import BannerSlider from '../components/BannerSlider'
import CategoryList from '../components/CategoryList'
import FeaturedProducts from '../components/FeaturedProducts'
import SocialConnect from '../components/SocialConnect'

const Home = () => {
    return (
        <>
            <BannerSlider />
            <CategoryList />
            {/* <FeaturedProducts /> */}
            <SocialConnect />
        </>
    )
}

export default Home