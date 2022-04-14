import React from 'react'
import { useEffect } from "react";
import './StoreResult.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeStatusPage, storeSelectedMenu, storeSelectedStore, changeSelectedMenu, changeSelectedCategory } from '../Redux/Store';
const StoreResult = (props) => {
    const dispatch = useDispatch();
    const selectedStore = useSelector(storeSelectedStore);
    const selectedMenuRedux = useSelector(storeSelectedMenu);

    useEffect(() => {
        // slider.current.goTo(selectedMenuRedux);
        console.log("sqtoores")
      },[selectedMenuRedux]);

    const handleBackBtn = () => {
        dispatch(changeSelectedCategory(""))
        dispatch(changeSelectedMenu(0))
        dispatch(changeStatusPage("Home"))
    }
    return (
        <div className='storeResultWrapper'>
            <div className='storeResultWrapperHeader'>
            <div className='backBtn' onClick={() => handleBackBtn()}>
            &#8592;
            </div>
                <div className='storeName'>
                    {selectedStore.name}
                </div>
            </div>
        </div>
    );
}

export default StoreResult