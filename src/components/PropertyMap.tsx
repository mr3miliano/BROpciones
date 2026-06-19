"use client";

import { useEffect, useRef } from "react";

interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function PropertyMap({ lat, lng, address }: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let active = true;

    // 1. Inject Leaflet CSS from CDN if not already present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }

    // 2. Wait for CSS to load, then init map
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      if (!active) return;

      const container = containerRef.current;
      if (!container) return;

      // Prevent duplicate initialization on the same ref
      if (mapInstanceRef.current) return;

      // Clean up any leftover leaflet state on this DOM element (crucial for StrictMode & Hot Reloads)
      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
        container.innerHTML = "";
      }

      // Use props or fallback to default coordinates
      const mapLat = lat || 19.4055;
      const mapLng = lng || -99.2365;

      const map = L.map(container, {
        center: [mapLat, mapLng],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.marker([mapLat, mapLng], { icon }).addTo(map).bindPopup(address);

      mapInstanceRef.current = map;

      // Force recalculate size
      setTimeout(() => {
        if (active && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    };

    initMap();

    return () => {
      active = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, address]);

  return (
    <div
      ref={containerRef}
      id="property-leaflet-map"
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "1.5rem",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        position: "relative",
        zIndex: 10,
        background: "#2d3748",
      }}
    />
  );
}
