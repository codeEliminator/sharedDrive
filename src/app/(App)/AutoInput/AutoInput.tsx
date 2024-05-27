import React, { useEffect, useRef } from 'react';

interface AutocompleteInputProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkIfScriptLoaded = () => {
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
          types: ['(cities)'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            onPlaceSelected(place);
            inputRef.current!.value = place.name || ''; 
          }
        });
      } else {
        setTimeout(checkIfScriptLoaded, 1000);
      }
    };

    checkIfScriptLoaded();
  }, [onPlaceSelected]);

  return <input className='p-2 rounded-md' ref={inputRef} type="text" placeholder="Enter a city" />;
};

export default AutocompleteInput;
