// pages/onsens/index.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Onsen } from '../../app/src/types/onsen';

const OnsensPage = () => {
  const [onsens, setOnsens] = useState<Onsen[]>([]); // Onsen型を使用

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/onsens')
      .then(response => {
        setOnsens(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>温泉一覧</h1>
      <ul>
        {onsens.map(onsen => (
          <li key={onsen.id}>{onsen.name}<br></br>{onsen.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default OnsensPage;
