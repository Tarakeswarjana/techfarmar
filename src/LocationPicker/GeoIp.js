import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoIP = () => {
  const [country, setCountry] = useState(null);
  const [ip, setIp] = useState(null);

  const fetchGeoData = async () => {
    try {

      const ipResponse = await axios.get('https://api64.ipify.org?format=json');
      console.log(ipResponse,"ttyy")
      const userIp = ipResponse.data.ip;
      setIp(userIp);

  
      const geoResponse = await axios.get(`https://ipapi.co/${userIp}/json/`);
      console.log(geoResponse,"tyuyu")
      const countryName = geoResponse.data.country_name;
      setCountry(countryName);
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // setPosition({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        console.log({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },"oopp99")
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  
  useEffect(() => {
    fetchGeoData();
  }, []);

  return (
    <div>
      <h1>Geolocation Data</h1>
      {ip && <p>Your IP address: {ip}</p>}
      {country ? <p>Your country: {country}</p> : <p>Loading...</p>}
    </div>
  );
};

export default GeoIP;