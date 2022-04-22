import React, { useState, useEffect } from 'react'
import Store from "./Store";
import './Stores.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {  changeSelectedStore } from '../Redux/Store';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import 'swiper/swiper-bundle.min.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import 'swiper/swiper.min.css'

const Stores = () => {
    const [inputValue, setInputValue] = useState("");
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showUpModal, setShowUpModal] = useState(false);

    useEffect(() => {
        axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/stores")
        .then( res => {
            console.log(res.data)
            setStores(res.data)
        })
      }, []);

    const handleClose = () => {
        setShow(false);
        dispatch(changeSelectedStore(""))
    }

    const handleCloseUp = () => {
        setShowUpModal(false);
    }

    const searchStores = () => {
       setLoading(true);
       axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/stores/"+inputValue)
           .then(
               res=>{
                   console.log("axio.getStores", res.data)
                   setStores(res.data.stores);
                   setLoading(false);
               }
           )
   }

   const setStoreSelected = (store) => {
        setSelectedCategory(store.categories[0].name)
        dispatch(changeSelectedStore(store))
        setSelectedStore(store);
        setShow(true)
   }
   
   const mapStore = () => {
    return handleSelector().map(store=> 

           <div key={store.ID} onClick={()=>setStoreSelected(store)}>
               <Store data={store}/>
           </div>
        
       )
   }

  
    const handleLoading = () => {
        if (loading){
            return (
                <div>
                    loading
                </div>
            );
        }
        else {
            return (
                <div className='allStores'>{mapStore()} </div>
            )
        }
    }

    const handleSelector = () => {
        let storesToReturn = [];
        for (let i = 0; i < stores.length; i++) {
            if (stores[i]['products'].length > 0) {
                storesToReturn.push(stores[i]);
            }
        }
        
        return storesToReturn;
    }
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const calcMargin = () => {
        let margin = (vw - 40) ;
        return {"width": margin.toString() + "px", "marginLeft": "20px"}
    }

    const contentStyle = {
        height: "150px",
        textAlign: "center",
        justifyContent: "center",
        alignItem: "center",
        width: "80%",
        marginLeft: "10%",
        borderRadius: "10px"
    }


    const mapSubProducts = () => {
        if (selectedStore === "")
            return
        let nbrCategories = (100 / selectedStore.categories.length).toString() + "%";
        return selectedStore.categories.map(categorie => 
        <div onClick={() => setSelectedCategory(categorie.name)} className={categorie.name === selectedCategory ? 'categoriesModalSelected' : 'categoriesModal'} style={{width: nbrCategories}}>
                {categorie.name}
        </div>)
    }

    const selectProduct = (product) => {
        setSelectedProduct(product)
        setShowUpModal(true);
    }

    const mapProducts = () => {
        if (selectedCategory === "")
            return
        
        let products = [];
        for (let i = 0; i < selectedStore.products.length; i++) {
            if (selectedStore.products[i].Category === selectedCategory) {
                products.push(selectedStore.products[i])
            }
        }
        return products.map(product  => 
        <div className='productModalWrapper' onClick={() => selectProduct(product)}>
            <div style={{width: "20%"}}>
                <img alt='img' style={{height: "60px", width: "60px", borderRadius: "60px", marginLeft: "20px" }} src={product.Img}/>
            </div>
            <div style={{fontSize: "16px", width: "50%", textAlign: "center"}}>
            {product.Name}
            </div>
            <div style={{fontSize: "16px",width: "30%", textAlign: "center"}}>
            {product.Price} EUR
            </div>
            </div>
     
        )
    }

    const mapIngredients = (ingredients) => {
        if (selectedProduct === "") {
            return
        }
        return ingredients.map (ingredient => 
            <div className='ingredientAndLabelWrapper'>
                <div className='logo'>
                    <ArrowCircleRightIcon/>
                </div>
                <div className='txt'>
                    {ingredient}
                </div>
            </div>)
    }

    const mapLabels = (labels) => {
        if (selectedProduct === "") {
            return
        }
        return labels.map (label => 
            <div className='ingredientAndLabelWrapper'>
            <div className='logo'>
                <ArrowCircleRightIcon/>
            </div>
            <div className='txt'>
                {label}
            </div>
        </div>)
    }

    const productPage = () => {
        return (
            <Modal show={showUpModal} onHide={handleCloseUp} style={{width: "100%", minHeight: "100vh", zIndex: 9999, }}>
           
                <div>
                    <div className='headerModal'>
                        <div className='BtnCloseWrapper' onClick={() => handleCloseUp()}>
                            <div className='headerModalBtnClose'>
                                <KeyboardArrowUpIcon/>
                            </div>
                        </div>
                        <div className='BtnCloseWrapper'>
                            <div className='headerModalBtnClose'>
                                <FavoriteIcon onClick={() => addToFavorites(selectedStore, "favorite_food")} style={{color: "red", cursor: "pointer"}}/>
                            </div>
                        </div>
                    </div>
                </div>
           
            <img alt='img' src={selectedProduct.Img}/>
            <div className='modalUpperWrapper'>
                <div className='modalUpperWrapperHeader'>
                    <div >
                        {selectedProduct.Name}
                    </div>
                    <div>
                    {selectedProduct.Price} EUR
                        </div>
                </div>
                <div className='ingredientsUpperWrapperHeader'>
                Les ingredients :
                    {mapIngredients(selectedProduct.Ingredients)}
                Les labels :
                    {mapLabels(selectedProduct.Labels)}
                </div>
            </div>
        </Modal>
        )
    }

    const addToFavorites = (data, typeOfFavorite) => {
        if (!localStorage.getItem("email")) {
            console.log("you must be logged")
            return
        }
        if (typeOfFavorite === "favorite_store") {
            axios.patch("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") + "/favorites", {"favorite_store": data.name, "img": data.img})
            .then(res => {
                console.log(res.data)
            })
        }
        else {
            console.log("sdfsdfsfdsf",data.ID, data.img);
            axios.patch("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") + "/favorites", {"favorite_food": selectedProduct.Name, "store_id": data.ID, "img": selectedProduct.Img})
            .then(res => {
                console.log(res.data)
            })
        }
    }

    return (
        <div className='StoreWrappergeneral'>
            <div>
            {productPage()}
            <Modal show={show} onHide={handleClose} style={{width: "100%", minHeight: "100vh"}}>
         
                    <div>
                        <div className='headerModal'>
                            <div className='BtnCloseWrapper' onClick={() => handleClose()}>
                                <div className='headerModalBtnClose'>
                                    <KeyboardArrowUpIcon/>
                                </div>
                            </div>
                            <div  className='title'>
                                {selectedStore.name}
                            </div>
                            <div  className='BtnCloseWrapper'>
                                <div className='headerModalBtnClose'>
                                    <FavoriteIcon style={{color: "red", cursor: "pointer"}} onClick={() => addToFavorites(selectedStore, "favorite_store")}/>
                                </div>
                            </div>
                        </div>
                    </div>
           
             
                <div className='categoriesMenuModal'>
                    {mapSubProducts()}
                </div>
                <div className='productsModalWrapper'>
                {mapProducts()}
                </div>
            </Modal>
            </div>
            <div className='StoreWrapperHeader'>
                <div className='storeSearch'>  
                    <div className='storeInput'>
                        <input className='inputStoreWrapper' placeholder="Rechercher une boutique..." onChange={(e)=>setInputValue(e.target.value)}/>
                    </div>
                    <div className='storeButtonSearch'>
                <button className='storeButtonSearchWrapper' onClick={()=>searchStores()}>
                    <SearchIcon/>
                </button>
                    </div>
                </div>
            </div>
            <div className='StoresWrapper'>{handleLoading()}</div>
        </div>
    )
}

export default Stores