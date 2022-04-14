import React from "react";
import { useDispatch } from 'react-redux';
import './Favorites.scss'

import {  changeSelectedMenu } from '../Redux/Store';
const Favorites = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    return (
      <div className="FavoritesWrapper">
          Favorites
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
