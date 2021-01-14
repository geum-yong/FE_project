import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const { kakao } = window;

const MapContainer = () => {
  const address = useSelector(state => state.jobFormData.jobData.address1);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5662583, 126.9906889),
      draggable: false,
      level: 3,
    };
    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    if (address === '') return;

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // eslint-disable-next-line no-unused-vars
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        map.setCenter(coords);
      }
    });
  }, [address]);

  return <div id='map' style={{ width: '100%', height: 400 }}></div>;
};

export default MapContainer;
