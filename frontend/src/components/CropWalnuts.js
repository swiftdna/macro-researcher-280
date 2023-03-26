import React from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import './MarkerAnimation.css';

const containerStyle = {
  width: '30vw',
  height: '50vh'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const locations = [
  { name: "Argentina", lat: -34.603722, lng: -58.381592 },
  { name: "Australia", lat: -35.308236, lng: 149.124392 },
  { name: "Austria", lat: 48.208353, lng: 16.372504 },
  { name: "Belgium", lat: 50.846557, lng: 4.351697 },
  { name: "Brazil", lat: -15.826691, lng: -47.921822 },
  { name: "Canada", lat: 45.421530, lng: -75.697193 },
  { name: "China", lat: 39.904200, lng: 116.407396 },
  { name: "Czech Republic", lat: 50.087811, lng: 14.420460 },
  { name: "Denmark", lat: 55.676098, lng: 12.568337 },
  { name: "Egypt", lat: 30.044420, lng: 31.235712 },
  { name: "Finland", lat: 60.169857, lng: 24.938379 },
  { name: "France", lat: 48.856614, lng: 2.352222 },
  { name: "Germany", lat: 52.520007, lng: 13.404954 },
  { name: "Greece", lat: 37.983810, lng: 23.727539 },
  { name: "Hungary", lat: 47.497912, lng: 19.040235 },
  { name: "Iceland", lat: 64.126521, lng: -21.817439 },
  { name: "India", lat: 28.613939, lng: 77.209021 },
  { name: "Indonesia", lat: -6.208763, lng: 106.845599 },
  { name: "Ireland", lat: 53.349805, lng: -6.260310 },
  { name: "Israel", lat: 31.046051, lng: 34.851612 },
 
];

function App() {
  const renderMarkers = (clusterer) => {
    return locations.map((location, index) => (
      <Marker
        key={index}
        position={location}
        clusterer={clusterer}
        className="marker"
      />
    ));
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDLEeR95TmBOIYOZayIWR-Ny9w_VG-9D8M"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        <MarkerClusterer>
          {(clusterer) => renderMarkers(clusterer)}
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100vw',
//   height: '100vh'
// };

// const center = {
//   lat: 20.5937,
//   lng: 78.9629
// };

// const locations = [

// ];

// function App() {
//   const [animatedLocations, setAnimatedLocations] = useState([]);

//   useEffect(() => {
//     const timeoutIds = [];
//     locations.forEach((location, index) => {
//       const timeoutId = setTimeout(() => {
//         setAnimatedLocations((prevLocations) => [...prevLocations, location]);
//       }, 100 * index);
//       timeoutIds.push(timeoutId);
//     });

//     return () => {
//       timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
//     };
//   }, []);

//   const renderMarkers = () => {
//     return animatedLocations.map((location, index) => {
//       const initialPosition = {
//         lat: location.lat - 10,
//         lng: location.lng
//       };

//       const [position, setPosition] = useState(initialPosition);

//       useEffect(() => {
//         const animationDuration = 1000; // duration in milliseconds
//         const startTime = performance.now();

//         const animateMarker = (timestamp) => {
//           const elapsedTime = timestamp - startTime;
//           const progress = Math.min(elapsedTime / animationDuration, 1);

//           const newPosition = {
//             lat: initialPosition.lat + (location.lat - initialPosition.lat) * progress,
//             lng: location.lng
//           };

//           setPosition(newPosition);

//           if (progress < 1) {
//             requestAnimationFrame(animateMarker);
//           }
//         };

//         requestAnimationFrame(animateMarker);
//       }, []);

//       return (
//         <Marker
//           key={index}
//           position={position}
//         />
//       );
//     });
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="YOUR_API_KEY"
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={2}
//       >
//         {renderMarkers()}
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default App;

