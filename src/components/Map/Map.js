import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api';
import Places from './Places';

const icon =
  'https://firebasestorage.googleapis.com/v0/b/niced-craves-ordering-system.appspot.com/o/nc_marker.png?alt=media&token=0a8545ec-9b0c-4a02-a6e4-2ebf7884f93b';

const Map = () => {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 14.3429, lng: 120.8503 }), []);
  const niced_craves = useMemo(
    () => ({ lat: 14.3353091, lng: 120.8523251 }),
    []
  );
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  const [location, setLocation] = useState();
  const [directions, setDirections] = useState();

  console.log({ location });

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchDirection = (niced_craves) => {
    if (!niced_craves) return;

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: niced_craves,
        destination: location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  };

  useEffect(() => {
    fetchDirection(niced_craves);
  }, [location]);

  return (
    <div className='container'>
      <Places
        setLocation={(position) => {
          setLocation(position);
          mapRef.current?.panTo(position);
        }}
      />
      <GoogleMap
        zoom={20}
        center={center}
        mapContainerClassName='map-container'
        onLoad={onLoad}
        options={options}
        onClick={(e) => {
          setLocation(e.latLng);
          console.log(e.latLng);
        }}
      >
        <Marker position={niced_craves} icon={icon} />
        {directions && <DirectionsRenderer directions={directions} />}
        {location && (
          <Marker
            position={location}
            onClick={() => {
              fetchDirection(niced_craves);
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
