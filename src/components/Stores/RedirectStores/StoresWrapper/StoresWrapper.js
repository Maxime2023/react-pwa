import React, {useRef, useEffect} from 'react'
import './StoresWrapper.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Stores from '../../Stores';
import { useSelector } from 'react-redux';
import { storeSelectedStore } from '../../../Redux/Store';
const StoreWrapper = (props) => {
    const selectedStore = useSelector(storeSelectedStore);
    const swiperRef = useRef(null);

    useEffect(() => {
        console.log("laaa")
        if (selectedStore === "") {
            swiperRef.current?.swiper.slideTo(0);
        }
        else {
            swiperRef.current?.swiper.slideTo(1);
        }
       
      }, [selectedStore]);


          return (
              <div className='storeWrapperComponent'>
            <Stores/>
              </div>
          )
    //   }
    //   return (
    //       <div className='storeWrapperComponent'>
    //         <StoreResult/>
    //       </div>
    //   )

}

export default StoreWrapper