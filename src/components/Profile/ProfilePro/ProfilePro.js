import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {data} from './Data'
import './ProfilePro.scss'
import {Input} from "antd"
import './ProfilePro.scss'
import Modal from "react-bootstrap/Modal";
import { Select, notification } from 'antd';
import Store from '../../Stores/Store'
import 'antd/dist/antd.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LoadingOutlined,} from '@ant-design/icons';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const { Option } = Select;

const ProfilePro = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userShops, setUserShops] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedType, setSelectedType] = useState("Boulangerie");
    const [resultAdrresses, setResultAddresses] = useState([]);
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [city, setCity] = useState("")

    const [isAddStoreModalShown, setIsAddStoreModalShown] = useState(false);
    const [storeAddress, setStoreAddress] = useState("");
    const [storeName,setStoreName] = useState("");

    const [isModifyStoreModalShown, setIsModifyStoreModalShown] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("Category");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");

    const [globalLoading, setGlobalLoading] = useState(false)

    const [input, setInput] = useState("");
    const [inputIngredient, setInputIngredient] = useState("")
    const [inputLabel, setInputLabel] = useState("")

    useEffect(() => {
        // setUserShops(data)
        console.log(data)
        axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops")
        .then(res => {
            console.log("axios UserShops")
            console.log(res.data)
            setUserShops(res.data)
        })
    }, [])

    const createCategory = (storeId) => {
        setGlobalLoading(true)
        let data = {
            "name": input,
            "img": "image"
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id")  + "/shops/" + selectedStore.ID + "/categories", data)
        .then(res => {
            console.log(res.data)
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const createProduct = (storeId) => {
        console.log("laaa")
        console.log("input", input)
        setGlobalLoading(true)
        let data = {
            "Name": input,
            "Ingredients": [],
            "Price": "2.50",
            "Labels": [],
            "Category": selectedCategory.name
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops/" + selectedStore.ID + "/products", data)
        .then(res => {
            console.log(res.data)
            setInput("")
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const createIngredient = () => {
        setGlobalLoading(true)
        let data = {
            "ingredient": inputIngredient,
        }
        console.log(selectedStore.ID)
        console.log(selectedProduct.ID)
        console.log()
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops/" + selectedStore.ID + "/products/" + selectedProduct.ID + "/ingredients", data)
        .then(res => {
            console.log(res.data)
            setInput("")
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const deleteIngredient = (ingredient) => {
        setGlobalLoading(true)
        axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops/" + selectedStore.ID + "/products/" + selectedProduct.ID + "/ingredients/" + ingredient)
        .then(res => {
            console.log(res.data)
            setInput("")
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const deleteItem = (name) => {
        setGlobalLoading(true)
        axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/"+ localStorage.getItem("user_id")  +"/shops/"+ selectedStore.ID +"/categories/" + name)
        .then (res => {
            console.log(res.data)
            setInput("")
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const deleteProduct = (productId) => {
        setGlobalLoading(true)
        axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/"+ localStorage.getItem("user_id")  +"/shops/"+ selectedStore.ID +"/products/" + productId)
        .then (res => {
            console.log(res.data)
            setInput("")
            setGlobalLoading(false)
            setSelectedStore(res.data)
        })
    }

    const mapProductInfos = () => {
        if (selectedProduct === "") {
            return <div>{LoadingOutlined}</div>
        }
        let product = selectedStore.products.find(x => x.Name === selectedProduct.Name);
        let ingredients = product.Ingredients.map(ingredient => <div className='data'>              <div className='txt'>  {ingredient}</div>
        <div className='logoWrapper'> <DeleteIcon onClick={() => deleteIngredient(ingredient)}/></div></div>)
        let labels = product.Labels.map(label => <div className='data'>              <div className='txt'>  {label}</div>
        <div className='logoWrapper'> <DeleteIcon/></div></div>)
        return (
            <div>
                <div className='inputWrapperBtn'>
                    <div className='inputWrapper'>
                        <input value={inputIngredient} onChange={(e) => setInputIngredient(e.target.value)} placeholder='Ajouter un ingredient' className='input'/>
                    </div>
                    <div className='btnWrapper'>
                        <button className='btn' onClick={() => createIngredient()}><AddCircleIcon/></button>
                    </div>
                </div>
                {ingredients}
                <div className='inputWrapperBtn'>
                    <div className='inputWrapper'>
                        <input value={inputLabel} onChange={(e) => setInputLabel(e.target.value)}   placeholder='Ajouter un label' className='input'/>
                    </div>
                    <div className='btnWrapper'>
                        <button className='btn' ><AddCircleIcon/></button>
                    </div>
                </div>
                {labels}
            </div>
        )

    }


    const mapProducts = () => {
        
        let productsTorender = []
        for (let i = 0; i < selectedStore.products.length; i++) {
            if (selectedStore.products[i].Category === selectedCategory.name) {
                productsTorender.push(selectedStore.products[i])
            }
        }
        let products = productsTorender.map(product => 
            <div className='data' >
                <div className='txt' onClick={() => {setSelectedProduct(product) ;setSelectedMenu("ProductInfos")}}>  {product.Name}</div>
                <div className='logoWrapper' onClick={() => deleteProduct(product.ID)}> <DeleteIcon/></div>
               
            </div> 
        )
        return (
            <div>
                <div className='inputWrapperBtn'>
                    <div className='inputWrapper'>
                        <input onChange={(e) => setInput(e.target.value)} value={input}  placeholder='Créer un produit' className='input'/>
                    </div>
                    <div className='btnWrapper'>
                        <button className='btn' onClick={() => createProduct()}><AddCircleIcon/></button>
                    </div>
                </div>
                {products}
            </div>
        )
    }

    const mapCategories = () => {
        console.log(selectedStore)
        if (selectedStore === "") {
            return <div>{LoadingOutlined}</div>
        }
        let categories = selectedStore.categories.map(category => 
            <div  className='data'>              <div onClick={() => onClickCategory(category)} className='txt'>  {category.name}</div>
            <div className='logoWrapper' onClick={() => deleteItem(category.name)}> <DeleteIcon/></div></div>
        )

        return (
            <div>
                <div className='inputWrapperBtn'>
                    <div className='inputWrapper'>
                        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Créer une catégorie' className='input'/>
                    </div>
                    <div className='btnWrapper'>
                        <button className='btn' onClick={() => createCategory()}><AddCircleIcon/></button>
                    </div>
                </div>
                {categories}
            </div>
        )
    }

    const onClickCategory = (category) => {
        setSelectedMenu("Products")
        setSelectedCategory(category)
    }

    const onClickStore  = (store) => {
        setSelectedStore(store);
        setSelectedMenu("Category")
        setIsModifyStoreModalShown(true);
    }

    const mapUserStores = () => {
        return userShops.map(shop => 
            <div className='storeWrapper' onClick={() => onClickStore(shop)}>
                <div className='name'>
                    {shop.name}
                </div>
                <div className='imgWrapper'>
                    <img className='img' src={shop.img}/>
                </div>
            </div>
        )
    }

    const mapSelect = () => {
        let values = ["Boulangerie", "Boucherie", "Epicerie", "Patisserie", "Rotisserie"]
        return values.map(value => <Option value={value}>{value}</Option>)
    }

    const handleMenus = () => {
        if (globalLoading) {
            return <div className='loadingWrapper'><LoadingOutlined style={{fontSize: "100px", color: "#ff9580"}}/></div> 
        }
        if (selectedMenu === "Category") {
            return mapCategories()
        }
        else if (selectedMenu === "Products") {
            return mapProducts()
        }
        else {
            return mapProductInfos()
        }
    }

    const createNewShop = () => {
        setIsLoading(true)
        let body = {
            "name": storeName,
            "store": selectedType,
            "city": city,
            "address": storeAddress,
            "coordinates": [coordinates[0].toString(), coordinates[1].toString()]
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops", body)
        .then (res => {
            setIsLoading(false);
            setUserShops(res.data)
            console.log(res.data)
        })
    }

    const searchAddressGouv = (value) => {
        setIsAddressSelected(false)
        setStoreAddress(value)
        console.log("sdfsdf", value)
        axios.get("https://api-adresse.data.gouv.fr/search/?q="+ value)
        .then(res => {

            console.log(res.data)
            setResultAddresses(res.data.features)
        })
    }

    const AddressesMap = () => {
        if (isAddressSelected === true || storeAddress === "") {
            return
        }
        let resultAddress =  resultAdrresses.map(address => 
            <div onClick={() => {setStoreAddress(address.properties.label); setIsAddressSelected(true); setCoordinates(address.geometry.coordinates); setCity(address.properties.city)}} >
                {address.properties.label}
            </div>
        )
        return (
            <div className='suggestions'>
                {resultAddress}
            </div>
        )
    }

    const addShopModal = () => {

        return (
            <Modal show={isAddStoreModalShown} onHide={() => setIsAddStoreModalShown(false)} className='addShopModal'>
                <Modal.Header className='modalHeaderCreateShop'>
                    Créer une boutique
                    <button type="button" style={{color: "white"}} class="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsAddStoreModalShown(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <div className='dataWrapperAddShop'>
                    Entrez le nom de votre boutique : 
                    <div className='inputWrapper'>
                        <Input className='inputSearchAddress' value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder={"Ex: Boulangerie Masséna"} />
                    </div>
                </div>
                <div className='dataWrapperAddShop'>
                    Entrez l'adresse de votre boutique : 
                    <div className='inputWrapper'>
                        <Input  className='inputSearchAddress' value={storeAddress} onChange={(e) => searchAddressGouv(e.target.value)} placeholder={"Ex: 208 place sophie lafitte"} />
                    </div>
                    <div >
                    {AddressesMap()}
                    </div>
                 
                </div>
                {/* {mapAddresses()} */}
                <div className='dataWrapperAddShop'>
                    Selectionnez le type de votre boutique:
                <Select onSelect={(e) => setSelectedType(e)} defaultValue="Boulangerie" style={{ width: "100%", marginTop: "10px", }} >
                    {mapSelect()}
                </Select>
                </div>
                <div className='dataWrapperAddShop'>
                <button className='btnCreateStore' onClick={() => createNewShop()} >
                    {isLoading ? <LoadingOutlined style={{fontSize: "22px"}}/> : "Créer la boutique"}
                </button>
                </div>
            </Modal>
        )
    }

    const backBtn = () => {
        if (selectedMenu === "Category") {
            setIsModifyStoreModalShown(false)
        }
        else if (selectedMenu === "Products") {
            setSelectedMenu("Category")
        }
        else  {
            setSelectedMenu("Products")
        }

    }

    const modifyStoreModal = () => {
        return (
            <Modal show={isModifyStoreModalShown} onHide={() => setIsModifyStoreModalShown(false)} className='addShopModal'>
                <Modal.Header className='modalHeaderCreateShop'>
                    <button className='goBackBtnModify' onClick={() => backBtn()}><ArrowCircleLeftIcon style={{marginRight: "20px"}}/> Retour</button>
                    <div className='txt'>                        
                    Modifier une boutique
                    </div>
                </Modal.Header>
               {handleMenus()}
            </Modal>
        )
    }

    return (
        <div className='ProfileProWrapper'>
            {addShopModal()}
            {modifyStoreModal()}
            <div className='ProfileProWrapperButton'>
                <button className='AddStoreBtnProfile' onClick={() => setIsAddStoreModalShown(true)}>
                    Ajouter une boutique&nbsp;&nbsp;<AddCircleIcon/>
                </button>
                <button className='AddStoreBtnProfile' onClick={() => setIsAddStoreModalShown(true)}>
                    Se deconnecter&nbsp;&nbsp;<AddCircleIcon/>
                </button>
            </div>

            <div className='mapStoresWrapper'>
                {mapUserStores()}
            </div>
        </div>
    )
}

export default ProfilePro
