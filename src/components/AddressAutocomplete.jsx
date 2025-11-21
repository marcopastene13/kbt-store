import React, { useState, useRef, useEffect } from 'react';
import '../styles/addressAutocomplete.css';

const AddressAutocomplete = ({ value, onChange, onAddressSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    if (window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.google && !autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        geocoder.current = new window.google.maps.Geocoder();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setSelectedAddress(null);
    setValidationMessage('');

    if (inputValue.length > 2 && autocompleteService.current) {
      const request = {
        input: inputValue,
        componentRestrictions: { country: 'cl' },
        types: ['address'],
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectAddress = (prediction) => {
    onChange(prediction.description);
    setSelectedAddress(prediction.description);
    setSuggestions([]);
    setShowSuggestions(false);

    if (geocoder.current) {
      geocoder.current.geocode({ address: prediction.description }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
          const coordinates = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            formattedAddress: results[0].formatted_address,
          };
          onAddressSelect(coordinates);
          setValidationMessage(`Direccion validada: ${results[0].formatted_address}`);
        } else {
          setValidationMessage('No se pudo validar la direccion');
        }
      });
    }
  };

  return (
    <div className="address-autocomplete-container">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => value && suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="form-control"
        placeholder="Ingresa tu direccion"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="autocomplete-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSelectAddress(suggestion)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
      {validationMessage && (
        <div className={`validation-message ${selectedAddress ? 'success' : 'warning'}`}>
          {validationMessage}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;