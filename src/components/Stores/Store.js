import React from 'react'
import './Store.scss';

const Store = (props) => {
    const {data} = props;
    console.log(data)
 
    return(
        <div className='storeWrapper'>
            <div className='imgWrapper'><img src={data.img}/></div>
             {/* <div className='header'>{data.name}</div>
            <div><img alt="Icon" style={{height:"50px"}}src={data.img} /></div> */}
        </div>
        
    );
}

export default Store