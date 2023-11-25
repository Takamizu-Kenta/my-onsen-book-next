// // pages/onsens/index.tsx
// import React, { useState, useEffect } from 'react';
// import { useAxios } from '../src/App';
// import { Onsen } from '../src/types/onsen';

// const OnsensPage = () => {
//   const [onsens, setOnsens] = useState<Onsen[]>([]);
//   const axios = useAxios();

//   useEffect(() => {
//     axios.get('/api/v1/onsens')
//       .then(response => {
//         setOnsens(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching data: ", error);
//       });
//   }, [axios]);

//   return (
//     <div>
//       <h1>温泉一覧ですぞよ</h1>
//       <ul>
//         {onsens.map(onsen => (
//           <li key={onsen.id}>{onsen.name}<br></br>{onsen.description}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OnsensPage;
