"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export type GuideOnMap = {
  id: string;
  name: string;
  initials: string;
  status: "available" | "busy";
  imageUrl?: string;
  lat: number;
  lng: number;
};

type Props = {
  guides: GuideOnMap[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

const DEFAULT_CENTER: [number, number] = [58.3829, 23.588];
const DEFAULT_ZOOM = 10;

export function LiveMap({ guides, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("Missing NEXT_PUBLIC_MAPBOX_TOKEN");
      return;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function clearMarkers() {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }

  function createMarkerEl(g: GuideOnMap, isSelected: boolean) {
    const isAvailable = g.status === "available";

    const el = document.createElement("button");
    el.type = "button";
    el.setAttribute("aria-label", `Select ${g.name}`);

    // ✅ brand-like marker (gold ring when selected)
    el.className = [
      "relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white shadow-md",
      isAvailable ? "border-emerald-500" : "border-red-500",
      isSelected ? "scale-110 shadow-lg ring-4 ring-[var(--brand-gold)]/25" : "",
      "transition-transform",
    ].join(" ");

    const inner = document.createElement("span");
    inner.className = "text-xs font-extrabold text-[var(--brand-green)]";
    inner.innerText = g.initials;
    el.appendChild(inner);

    const dot = document.createElement("span");
    dot.className = [
      "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white",
      isAvailable ? "bg-emerald-500" : "bg-red-500",
    ].join(" ");
    el.appendChild(dot);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      onSelect?.(g.id);
    });

    return el;
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    clearMarkers();

    guides.forEach((g) => {
      if (g.lat == null || g.lng == null) return;

      const isSelected = g.id === selectedId;
      const el = createMarkerEl(g, isSelected);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([g.lng, g.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    const sel = guides.find((g) => g.id === selectedId);
    if (sel && sel.lat != null && sel.lng != null) {
      map.flyTo({ center: [sel.lng, sel.lat], zoom: 12, essential: true });
    }
  }, [guides, selectedId]);

  return (
    <div
      className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden border shadow-sm bg-white"
      style={{ borderColor: "rgba(45,79,43,0.12)" }}
    >
      <div ref={containerRef} className="h-full w-full" />

      {/* ✅ Legend */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-[var(--brand-olive)] shadow-sm flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Available</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span>Busy</span>
        </span>
      </div>

      {/* ✅ Small brand badge */}
      <div className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-[11px] shadow-sm"
           style={{ color: "var(--brand-green)", border: "1px solid rgba(255,184,35,0.35)" }}>
        GuiderX Map
      </div>
    </div>
  );
}
