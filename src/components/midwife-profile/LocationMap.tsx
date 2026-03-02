"use client";

import { Map, Marker } from "react-map-gl/maplibre";

export default function LocationMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  return (
    <Map
      initialViewState={{ latitude: lat, longitude: lng, zoom: 14 }}
      style={{ height: 180, width: "100%" }}
      mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      interactive={false}
      attributionControl={false}
    >
      <Marker latitude={lat} longitude={lng} anchor="bottom">
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0C7.164 0 0 7.164 0 16c0 12 16 24 16 24s16-12 16-24C32 7.164 24.836 0 16 0z"
            fill="hsl(340, 75%, 55%)"
          />
          <circle cx="16" cy="15" r="6" fill="white" />
        </svg>
      </Marker>
    </Map>
  );
}
