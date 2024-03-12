'use client';
import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ lat, lng, zoom, startLocation, endLocation, selectedRouteIndex }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const directionsRenderers = useRef([]);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new window.google.maps.Map(mapRef.current, { center: { lat, lng }, zoom });
    }
    directionsRenderers.current.forEach(renderer => renderer.setMap(null));
    directionsRenderers.current = [];
    if (startMarker.current) {
      startMarker.current.setMap(null);
    }
    if (endMarker.current) {
      endMarker.current.setMap(null);
    }

    if (startLocation) {
      startMarker.current = new window.google.maps.Marker({
        position: startLocation,
        map: map.current,
        label: 'A',
      });
      map.current.panTo(startLocation); 
    }
    if (endLocation) {
      endMarker.current = new window.google.maps.Marker({
        position: endLocation,
        map: map.current,
        label: 'B',
      });
    }

    if (startLocation && endLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      }, (response, status) => {
        if (status === 'OK') {
          response.routes.forEach((route, index) => {
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: map.current,
              directions: response,
              routeIndex: index,
              polylineOptions: {
                strokeColor: index === selectedRouteIndex ? '#0000ff' : '#ff0000',
                strokeOpacity: 0.7,
                strokeWeight: index === selectedRouteIndex ? 6 : 4,
              },
            });

            directionsRenderers.current.push(directionsRenderer);
          });
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [lat, lng, zoom, startLocation, endLocation, selectedRouteIndex]);

  return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />;
};

export default GoogleMap;
