import {  useEffect, useState } from "react";
import './Map.scss'
import ReactMapGL, {  Popup } from "react-map-gl";
import axios from 'axios'
const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude:    43.615512,
    longitude:    7.054762 ,
    width: "100",
    height: "100vh",
    zoom: 11
  });
  const [data, setData] =useState([])
  useEffect(() => {
    axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/stores/coordinates")
    .then(res => {
      console.log(res.data)
      setData(res.data)}
      )
  }, [])
  const mapStores = () => {
    console.log("sfsfsdfdsf", parseFloat(data[0].coordinates[0]))
  
    return data.map(x => 
    <div><Popup longitude={parseFloat(x.coordinates[0])} latitude={parseFloat(x.coordinates[1])} anchor="bottom">
        {x.name}
      </Popup></div>
        )
  }
  if (data.length === 0) {
    return <div>Loading</div>
  }
    return (
        <div className='mapWrapper'>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken='pk.eyJ1IjoibXJvZ2FhciIsImEiOiJjazIxbWI1NTIwM2NhM2NxbzhnbDUzYnJ5In0.Moh2N8AIuaTbuMwJ5-pVxA'
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={viewport => {
                setViewport(viewport);
              }}
            >
               
              {mapStores()}
            </ReactMapGL>
        </div>
    )
}
export default MapComponent