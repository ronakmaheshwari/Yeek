import { useState, useEffect } from 'react';

function useGeolocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const watcher = navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        setError(err.message);
      }
    );


    return () => {
    };
  }, []);

  return { latitude, longitude, error };
}

export default useGeolocation;