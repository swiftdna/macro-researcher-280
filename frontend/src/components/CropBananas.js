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
  
  { name: "Iceland", lat: 64.126521, lng: -21.817439 },
  { name: "India", lat: 28.613939, lng: 77.209021 },
  { name: "Indonesia", lat: -6.208763, lng: 106.845599 },
  { name: "Ireland", lat: 53.349805, lng: -6.260310 },
  { name: "Israel", lat: 31.046051, lng: 34.851612 },
  { name: "Italy", lat: 41.902782, lng: 12.496366},
  { name: "Japan", lat: 35.689487, lng: 139.691706 },
  { name: "Kenya", lat: -1.292066, lng: 36.821946 },
  { name: "Mexico", lat: 19.432608, lng: -99.133208 },
  { name: "Netherlands", lat: 52.370216, lng: 4.895168 },
  { name: "New Zealand", lat: -41.286460, lng: 174.776236 },
  { name: "Norway", lat: 59.913869, lng: 10.752245 },
  { name: "Peru", lat: -12.046373, lng: -77.042754 },
  { name: "Philippines", lat: 14.599512, lng: 120.984219 },
  { name: "Poland", lat: 52.229676, lng: 21.012229 },
  { name: "Portugal", lat: 38.722252, lng: -9.139337 },
  { name: "Russia", lat: 55.755826, lng: 37.617300 },
  { name: "South Africa", lat: -33.924869, lng: 18.424055 },
  { name: "South Korea", lat: 37.566535, lng: 126.977969 },
  { name: "Spain", lat: 40.416775, lng: -3.703790 },  
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

