import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'

import { Link } from 'react-router-dom'


const Explore = () => {

  const [countries, updateCountries] = useState([])
  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw', 
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551
  })
  
  useEffect(() => {
    axios.get('/api/countries')
      .then(resp => {
        updateCountries(resp.data)
      })
  }, [])

  return <div>

    <MapGL
      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      { ...viewPort }
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >
      {countries.map((country, index) => {
        return <Marker key={index}
          latitude={country.lat}
          longitude={country.long}
        >
          <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
        </Marker>
      })}
      
    </MapGL>
  </div >

}

export default Explore