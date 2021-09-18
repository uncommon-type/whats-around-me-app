import { useEffect, useState } from 'react';

const useLocalStorage = (key, value) => {
  const [val, setVal] = useState(
    JSON.parse(localStorage.getItem(key)) || value,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val, key]);

  return [val, setVal];
};

export default useLocalStorage;
