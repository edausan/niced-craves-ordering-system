import { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA_WernJAY77ljqnb5RRKhy49P6_5T4skw',
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

export default GoogleMaps;
