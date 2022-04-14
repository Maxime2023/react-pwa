import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import './Favorites.scss'
import { Card } from 'react-bootstrap';
import {  changeSelectedMenu } from '../Redux/Store';
import axios from "axios";
const Favorites = () => {
  const dispatch = useDispatch();
  const [favFood, setFavFood] = useState([]);
  const [favStore, setFavStore] = useState([]);

  useEffect(() => {
    axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") + "/favorites")
    .then (res => {
      console.log(res.data)
      setFavFood(res.data.favorite_food);
      setFavStore(res.data.favorite_store);
    })
  }, [])

  const deleteFavStore = (id) => {
    axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") + "/favorites/stores/" + id )
    .then(res => {
      setFavStore(res.data.favorite_store)
    })
  }
  const deleteFavProduct = (id) => {
    axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") + "/favorites/products/" + id )
    .then(res => {
      setFavFood(res.data.favorite_food)
    })
  }

  if (localStorage.getItem("token")) {

    const mapFavoritesProducts = () => {
      if (favFood.length === 0) {
        return
      }
      return favFood.map(y => 
          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={y.img} />
              <Card.Body>
                <Card.Title>{y.product_name}</Card.Title>
                <Card.Text>
                  <button onClick={() => deleteFavProduct(y.id)} className="btnDelete">
                    Supprimer ce produit
                  </button>
                </Card.Text>

              </Card.Body>
            </Card>
          </div>
  
    )
    }

    const mapFavoritesShops = () => {
      if (favStore.length === 0) {
        return
      }
      return favStore.map(y => 
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={y.img} />
            <Card.Body>
              <Card.Title>{y.product_name}</Card.Title>
              <Card.Text>
                <button onClick={() => deleteFavStore(y.id)} className="btnDelete">
                  Supprimer cette boutique
                </button>
              </Card.Text>

            </Card.Body>
          </Card>
        </div>

  )
    }

    return (
      <div className="FavoritesWrapper">
        <div className="FavoritesProducts">
          <div className="title">
            Mes Produits favoris :
          </div>
          {mapFavoritesProducts()}
        </div>
        <div className="FavoritesShops">
        <div className="title">
            Mes boutiques favorites :
          </div>
          {mapFavoritesShops()}
          </div>
      </div>
    );
  }
    return (
      <div className="FavoritesWrapperNotLogged">
        <div className="FavoritesNotLogged">
          <div className="FavoritesNotLoggedT1">
            Il semblerait que vous n'etes pas connecté
          </div>
          <div className="FavoritesNotLoggedT2">
            Connectez vous pour acceder à vos favoris
          </div >
          <button className="connectBtn" onClick={() => dispatch(changeSelectedMenu(2))}>
            Se connecter
            </button>
        </div>
      </div>
    )

}

export default Favorites;
