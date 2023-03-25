import { Marker } from '@react-google-maps/api';

const colorMappings = {
	  available: "#917ff4",
	  active: "#4bc475",
    stopped: "#dc3545",
    connected: "#ffc107"
};

const strokeMappings = {
  	available: "#6c5acf",
  	active: "#24904a",
    stopped: "#801620",
    connected: "#bb8d04"
};

// const Marker = ({ type }) => <svg>
// 	<path fill={colorMappings[type]} stroke={strokeMappings[type]} d="M 13.5 14.592 C 0 13.1328 0 8.7552 1.8 8.7552 L 46.8 8.7552 A 2.1888 1.8 90 0 0 46.8 8.7552 M 13.5 14.592 L 34.5 14.592 C 48 13 48.6 8.7552 46.8 8.7552 M 13.5 14.592 L 5.4 13.1328 C 10.5 20.064 8 22 10 23 L 13 17 C 21 16 26 16 33 17 L 36 23 C 38 22 36 20.064 42 12.768 M 10.8 8.7552 L 14.4 8.7552 L 14.4 4.3776 L 10.8 4.3776 L 10.8 8.7552 M 36 8.7552 L 36 4.3776 L 32.4 4.3776 L 32.4 8.7552 L 36 8.7552 M 12.6 4.3776 L 12.6 0 M 9 0 L 16.2 2.1888 C 18 2.1888 18 0 16.2 0 L 9 2.1888 C 7.2 2.1888 7.2 0 9 0 M 34.2 0 L 34.2 4.3776 M 30.6 0 L 37.8 2.1888 C 39.6 2.1888 39.6 0 37.8 0 L 30.6 2.1888 C 28.8 2.1888 28.8 0 30.6 0"/>
//   </svg>;

const CustomMarker = ({ type, lat, lng }) => <Marker
      icon={{
        path:
          "M 13.5 14.592 C 0 13.1328 0 8.7552 1.8 8.7552 L 46.8 8.7552 A 2.1888 1.8 90 0 0 46.8 8.7552 M 13.5 14.592 L 34.5 14.592 C 48 13 48.6 8.7552 46.8 8.7552 M 13.5 14.592 L 5.4 13.1328 C 10.5 20.064 8 22 10 23 L 13 17 C 21 16 26 16 33 17 L 36 23 C 38 22 36 20.064 42 12.768 M 10.8 8.7552 L 14.4 8.7552 L 14.4 4.3776 L 10.8 4.3776 L 10.8 8.7552 M 36 8.7552 L 36 4.3776 L 32.4 4.3776 L 32.4 8.7552 L 36 8.7552 M 12.6 4.3776 L 12.6 0 M 9 0 L 16.2 2.1888 C 18 2.1888 18 0 16.2 0 L 9 2.1888 C 7.2 2.1888 7.2 0 9 0 M 34.2 0 L 34.2 4.3776 M 30.6 0 L 37.8 2.1888 C 39.6 2.1888 39.6 0 37.8 0 L 30.6 2.1888 C 28.8 2.1888 28.8 0 30.6 0",
        fillColor: colorMappings[type],
        fillOpacity: 1,
        scale: 0.8,
        strokeColor: strokeMappings[type],
        strokeWeight: 2,
      }}
      position={{lat, lng}}
    />

export default CustomMarker;