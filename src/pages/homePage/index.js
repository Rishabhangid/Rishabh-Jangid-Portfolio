// import
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// componets
import { HomeSlider } from '../../features/sliders/home-slider';
import { ProductCatagory } from '../../shared';
import { AllProducts, BecomeSeller, NewArrivals, TrendingProducts } from '../../features/home-page';
import { fetchAllBanners } from '../../api/services/homepageService';
import { OfficeLocation } from '../../features/home-page/components/office-store';
import { LoadingPage } from '../loading-page';

// redux
import { enableLoading, disableLoading } from '../../redux/slices/loading/loadingSlice';
// import state from 'sweetalert/typings/modules/state';
// import ScrollVelocity from '../../reactBits/ScrollVelocity';


export const HomePage = () => {

  const isLoading = useSelector((state) => state.loading.isLoading);
  // console.log(isLoading, "---------------isLoading broooooooooo---------------");

  // declaration *************************************************************************
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const isLoadingSet = useRef(false);

  // states *************************************************************************
  const [allBanner, setAllBanner] = useState([]);
  const [mainBanner, setMainBanner] = useState([]);
  const [footerBanner, setFooterBanner] = useState([]);
  const [sectionBanner, setSectionBanner] = useState([]);

  // use-effect *************************************************************************

  // fetching al banners
  useEffect(() => {

    const fetchAllBanner = async () => {
      // const checkkk = useSelector( (state)=> state.isLoading )
      if (!isLoadingSet.current) {
        dispatch(enableLoading());
        isLoadingSet.current = true;
      }

      try {
        const fetch_all_banners = await fetchAllBanners();
        const allBanners = fetch_all_banners?.data || [];
        setAllBanner(allBanners);
        setMainBanner(allBanners.filter((item) => item.banner_type === "Main Banner"));
        setFooterBanner(allBanners.filter((item) => item.banner_type === "Footer Banner"));
        setSectionBanner(allBanners.filter((item) => item.banner_type === "Main Section Banner"));
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        dispatch(disableLoading());
      }
    };

    fetchAllBanner();


    // alert(isLoading)

  }, []);


  return (

    <div className='bg-[#FFFFFF] dark:bg-[#121212]'>

      {/* showing loading page is banners are loading */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <HomeSlider mainbanner={mainBanner} />
          <ProductCatagory />
          <TrendingProducts />
          <NewArrivals sectionbanner={sectionBanner} />
          <AllProducts />
          {footerBanner.length > 0 && <BecomeSeller footerBanners={footerBanner} />}
          <OfficeLocation />
        </>
      )}

    </div>
  );
};
