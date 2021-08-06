import { useState, useEffect } from 'react';

const useFetch = (lat, lng) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat && !lng) return;

    const getWikiEntries = async (lat, lng) => {
      setStatus('loading');
      try {
        const res = await fetch(
          `/.netlify/functions/search?lat=${lat}&lng=${lng}`,
        );

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setData({ ...data, zoom: 16 });
        setStatus('success');
      } catch (error) {
        console.error(error);
        setError(error);
        setStatus('error');
      }
    };
    getWikiEntries(lat, lng);
  }, [lat, lng]);

  return { data, status, error };
};

export default useFetch;
