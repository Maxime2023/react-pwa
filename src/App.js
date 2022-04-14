import { useEffect } from "react";
import './App.css';
import firebase from "./services/firbaseService";
import Stores from "./components/Stores/Stores";
import LoginAndregisterWrapper from "./components/LoginAndRegister/LoginAndRegisterWrapper";
import { useSelector } from 'react-redux';
import MapComponent from './components/Map/MapComponent'
import TabBar from "./components/TabBar/TabBar";
import Favorites from './components/Favorites/Favorites'
import { storeSelectedMenu, storeSelectedStore } from './components/Redux/Store';

const App = () => {
  const selectedMenuRedux = useSelector(storeSelectedMenu);
  const selectedStore = useSelector(storeSelectedStore)
  useEffect(() => {
    const message = firebase.messaging();
    message.requestPermission().then(() => {
      return message.getToken()
    }).then((data) => {
      console.warn("TOKEN:", data)
    })
   
  }, [selectedMenuRedux]);
  const handlePages = () => {

  if (selectedMenuRedux === 0) {
    return (
      <div className="App">
        <Stores/>
        </div>
    )
  }
  if (selectedMenuRedux === 1) {
    return (
    
      <MapComponent/>
  
    )
  }

  if (selectedMenuRedux === 2) {
    return (
  
        <LoginAndregisterWrapper/>
    
    )
  }

  if (selectedMenuRedux === 3) {
    return (
        <Favorites/>
    
    )
    
  }
  // if (selectedMenuRedux === 4) {
  //   return (
  //       <Map/>
  //   )
  // }
}


  return (
    <div>
      {handlePages()}
    {
      selectedStore === "" && (  <TabBar/>)
    }
  
        {/* <div className="mainPageWrapperApp">
          <div className='MainPageWrapper' style={{backgroundImage: `url(${backMainPage})`}}>
              <div className='btnDiscoverStoresWrapper'>
                  Vous allez adorer nos produits
                  <p style={{fontSize: "10px", color: "darkgrey"}}>Il y en a pour tous les gouts !</p>
                  <div className='btnDiscoverStores' onClick={() => slider.current.goTo(1)}>
                      Découvrir les boutiques
                  </div>
              </div>
          </div>
        </div> */}
      
    </div>
  );
}

export default App;