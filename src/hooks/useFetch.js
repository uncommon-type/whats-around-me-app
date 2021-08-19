import { useState, useEffect, useRef } from 'react';

const useFetch = ({ lat, lng, panning }, timeDelay) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const lastExecuted = useRef(0);

  useEffect(() => {
    if (!lat && !lng) return;

    const getWikiData = async (lat, lng) => {
      setStatus('loading');
      try {
        const res = await fetch(
          `/.netlify/functions/search?lat=${lat}&lng=${lng}`,
        );

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setData({
          ...data,
          zoom: 16,
        });
        setStatus('success');
      } catch (error) {
        console.error(error);
        setError(error);
        setStatus('error');
      }
    };

    if (panning) {
      getWikiData(lat, lng);
      console.log('triggering 1');
      return;
    }
    const now = Date.now();
    if (now >= lastExecuted.current + timeDelay) {
      lastExecuted.current = now;
      getWikiData(lat, lng);
      console.log('triggering 2');
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = now;
        getWikiData(lat, lng);
        console.log('triggering 3');
      }, timeDelay - (now - lastExecuted.current));

      return () => clearTimeout(timerId);
    }
  }, [lat, lng, timeDelay, panning]);

  return { data, status, error };
};

export default useFetch;
