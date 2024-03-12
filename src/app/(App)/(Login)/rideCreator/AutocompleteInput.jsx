'use client'
import React, { useEffect } from 'react';

const AutocompleteInput = () => {
  useEffect(() => {
    const initAutocomplete = () => {
      new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: ['geocode'] }
      );
    };

    if (window.google && window.google.maps) {
      initAutocomplete();
    } else {
      window.initAutocomplete = initAutocomplete;
    }
  }, []);

  return <input id="autocomplete" placeholder="Type here.." type="text" />;
};

export default AutocompleteInput;
