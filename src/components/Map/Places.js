import { Card, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Autocomplete } from '@mui/material';

const Places = ({ setLocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  console.log({ status, data });

  const handleSelect = async (event, newValue) => {
    console.log({ newValue });
    setValue(newValue, false);
    clearSuggestions();

    const results = await getGeocode({ address: newValue?.description });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({ lat, lng });
    setLocation({ lat, lng });
  };

  //   useEffect(() => {
  //     if (status === '') {
  //       setLocation({ lat: null, lng: null });
  //     }
  //   }, [status]);

  return (
    <Autocomplete
      disablePortal
      options={data}
      getOptionLabel={(option) => option.description}
      onChange={handleSelect}
      className='search-bar'
      renderInput={(params) => (
        // <Card
        //   elevation={5}
        //   sx={{ boxShadow: '0 5px 8px -1px rgba(0,0,0,.1)', border: 'none' }}
        // >
        <TextField
          fullWidth
          {...params}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Search Location'
          //   label='Search Location'
        />
        // </Card>
      )}
    />
  );
};

export default Places;
