// import { useEffect, useRef } from "react";

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

// const location: Coordinates = {
//   lat: -7.1508,
//   lng: 111.74891,
// };

// export default function HereMap() {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const platformScript = document.createElement("script");
//     const serviceScript = document.createElement("script");
//     const uiScript = document.createElement("script");
//     const eventsScript = document.createElement("script");
//     const cssLink = document.createElement("link");

//     platformScript.src = "https://js.api.here.com/v3/3.1/mapsjs-core.js";
//     serviceScript.src = "https://js.api.here.com/v3/3.1/mapsjs-service.js";
//     uiScript.src = "https://js.api.here.com/v3/3.1/mapsjs-ui.js";
//     eventsScript.src = "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js";
//     cssLink.rel = "stylesheet";
//     cssLink.href = "https://js.api.here.com/v3/3.1/mapsjs-ui.css";

//     document.head.append(cssLink);
//     document.body.append(platformScript, serviceScript, uiScript, eventsScript);

//     const handleScriptsLoaded = () => {
//       if (
//         typeof window.H !== "undefined" &&
//         mapRef.current &&
//         window.H?.service?.Platform
//       ) {
//         const platform = new window.H.service.Platform({
//           apikey: "***REMOVED***",
//         });

//         const defaultLayers = platform.createDefaultLayers();

//         const map = new window.H.Map(
//           mapRef.current,
//           defaultLayers.vector.normal.map,
//           {
//             center: location,
//             zoom: 16,
//           }
//         );

//         new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
//         window.H.ui.UI.createDefault(map, defaultLayers);

//         const marker = new window.H.map.Marker(location);
//         map.addObject(marker);
//       }
//     };

//     // Delay execution until scripts are fully loaded
//     eventsScript.onload = handleScriptsLoaded;

//     return () => {
//       platformScript.remove();
//       serviceScript.remove();
//       uiScript.remove();
//       eventsScript.remove();
//       cssLink.remove();
//     };
//   }, []);

//   return <div id="mapContainer" ref={mapRef} className="w-full h-full border-2 border-(--separator-color) rounded-2xl" />;
// }
