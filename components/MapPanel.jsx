// MapPanel.jsx — Leaflet map with circle markers sized + colored by score band.
// Supports hovered/focused/selected highlights.
function MapPanel({ ranked, hoveredName, selectedNames, onMarkerClick, height, simple }) {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);
  const markersRef = React.useRef({});

  React.useEffect(() => {
    if (mapRef.current || !ref.current) return;
    const map = L.map(ref.current, {
      zoomControl: !simple,
      scrollWheelZoom: !simple,
      attributionControl: false,
      dragging: !simple,
    }).setView([37.7649, -122.4394], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 18, subdomains: 'abcd',
    }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 18, subdomains: 'abcd', opacity: 0.85,
    }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // clear
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    (ranked || []).forEach((r, i) => {
      const n = r.data;
      const rank = i + 1;
      const isTop = rank === 1;
      const isHover = hoveredName === r.name;
      const isSelected = (selectedNames || []).includes(r.name);
      const color = window.scoreColor(r.score);
      let radius = rank === 1 ? 16 : rank <= 5 ? 11 : 7;
      if (isHover) radius += 4;
      if (isSelected) radius = Math.max(radius, 13);

      const marker = L.circleMarker([n.lat, n.lng], {
        radius,
        fillColor: color,
        color: isHover || isSelected ? '#111' : '#fff',
        weight: isHover || isSelected ? 2.5 : 2,
        fillOpacity: isHover ? 1 : 0.9,
      }).addTo(map);
      marker.on('click', () => onMarkerClick && onMarkerClick(r.name));
      marker.bindTooltip(`${r.name} · ${r.score}%`, {
        direction: 'top', offset: [0, -4], opacity: 0.95,
        className: 'nm-tooltip',
      });
      markersRef.current[r.name] = marker;
    });
  }, [ranked, hoveredName, selectedNames]);

  React.useEffect(() => {
    setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 50);
  }, [height]);

  return <div className="nm-map" ref={ref} style={height ? {height} : undefined} />;
}
window.MapPanel = MapPanel;
