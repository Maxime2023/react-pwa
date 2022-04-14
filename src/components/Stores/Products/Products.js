import React from 'react'
import './Products.css';
import { useSelector } from 'react-redux';
import { storeSelectedCategory, storeSelectedStore } from '../../Redux/Store';
const Products = () => {
    const selectedCategory = useSelector(storeSelectedCategory);
    const selectedStore = useSelector(storeSelectedStore)


    const mapAllProducts = () => {
        const {products} = selectedStore ;
        console.log(products)
        let productsToReturn = [];
        if (selectedCategory === "") {
            productsToReturn = products;
        }
        for(let i = 0; i < products.length; i++) {
            if (products[i].Category === selectedCategory) {
                productsToReturn.push(products[i])
            }
        }
        return productsToReturn.map(product => 
            <div>
                <div>
                    {product.Name}
                </div>
            </div>
        )
    }
    return(
        <div className='ProductsWrapper'>
           {mapAllProducts()}
           {/* {selectedStore.products[0].Name} */}
        </div>
    );
}

export default Products