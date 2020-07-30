import React, { useState, useEffect, useRef } from 'react';
//Use this component like this <SearchLocationInput onChange={() => null} />

export default function SearchLocationInput(props) {
  let autoComplete;
  let address;
  const loadScript = (url, callback) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    //if (window.scriptLoaded) return;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //window.scriptLoaded = true;
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current);
    autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery));
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    const placeId = addressObject.place_id;
    updateQuery(query);
    address = query;
    props.updateAddress(address, placeId);
  }

  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`, () =>
      handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className='search-location-input'>
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder='Enter your address'
        value={query}
        className='form-control'
      />
    </div>
  );
}
