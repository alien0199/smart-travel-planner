import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Play, Square, MapPin } from 'lucide-react';
import { locations } from '@/types/locations';

const TravelMap = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([25.0478, 121.5171], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO',
      maxZoom: 20
    }).addTo(mapInstance.current);

    L.control.zoom({ position: 'topright' }).addTo(mapInstance.current);

    // Check URL params
    const dayParam = searchParams.get('day');
    const stopParam = searchParams.get('stop');
    
    if (dayParam) {
      const day = parseInt(dayParam);
      setCurrentDay(day);
      loadDay(day, stopParam ? parseInt(stopParam) : null);
    } else {
      loadDay(1, null);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const loadDay = (day: number, focusStop: number | null) => {
    if (!mapInstance.current) return;
    
    const map = mapInstance.current;
    const data = locations[`day${day}`];
    if (!data) return;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add polyline
    const latlngs = data.points.map(p => p.coords as [number, number]);
    L.polyline(latlngs, { color: data.color, weight: 4, opacity: 0.8, dashArray: '8, 8' }).addTo(map);

    // Clear old markers
    markersRef.current = [];

    // Add markers
    data.points.forEach((point, index) => {
      const isSelected = focusStop === index;
      const markerSize = isSelected ? 48 : 36;
      const icon = L.divIcon({
        html: `<div class="map-marker-wrapper ${isSelected ? 'marker-active' : ''}">
          ${isSelected ? `<div class="marker-pulse-ring" style="border-color: ${data.color};"></div>` : ''}
          <div class="map-marker-inner" style="background:${data.color}; width:${markerSize}px; height:${markerSize}px; border-radius:50%; border:${isSelected ? '4px' : '3px'} solid white; display:flex; align-items:center; justify-content:center; color:white; font-size:${isSelected ? '18px' : '14px'}; box-shadow:${isSelected ? `0 0 0 4px ${data.color}, 0 0 30px ${data.color}` : '0 2px 8px rgba(0,0,0,0.3)'}; transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'}; transition: all 0.3s ease;">
            ${getIconEmoji(point.type)}
          </div>
        </div>`,
        className: isSelected ? 'selected-marker-container' : '',
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2]
      });

      const marker = L.marker(point.coords as [number, number], { icon }).addTo(map);
      markersRef.current.push(marker);
      
      marker.on('click', () => {
        updateMarkerStyles(index, data.color);
        setSelectedPoint({ ...point, index, color: data.color });
        map.panTo(point.coords as [number, number]);
      });

      if (focusStop === index) {
        setTimeout(() => {
          updateMarkerStyles(index, data.color);
          setSelectedPoint({ ...point, index, color: data.color });
          map.flyTo(point.coords as [number, number], 16, { duration: 1 });
        }, 500);
      }
    });

    map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
  };

  const getIconEmoji = (type: string) => {
    const icons: Record<string, string> = {
      airport: '✈️', transit: '🚆', hotel: '🏨', food: '🍜',
      cafe: '☕', drink: '🧋', shopping: '🛒', temple: '⛩️',
      photo: '📸', art: '🎨', sea: '🌊', tea: '🍵', city: '🏙️'
    };
    return icons[type] || '📍';
  };

  const updateMarkerStyles = (selectedIndex: number, color: string) => {
    const data = locations[`day${currentDay}`];
    if (!data) return;

    markersRef.current.forEach((marker, index) => {
      const point = data.points[index];
      const isSelected = index === selectedIndex;
      const markerSize = isSelected ? 48 : 36;
      const icon = L.divIcon({
        html: `<div class="map-marker-wrapper ${isSelected ? 'marker-active' : ''}">
          ${isSelected ? `<div class="marker-pulse-ring" style="border-color: ${color};"></div>` : ''}
          <div class="map-marker-inner" style="background:${color}; width:${markerSize}px; height:${markerSize}px; border-radius:50%; border:${isSelected ? '4px' : '3px'} solid white; display:flex; align-items:center; justify-content:center; color:white; font-size:${isSelected ? '18px' : '14px'}; box-shadow:${isSelected ? `0 0 0 4px ${color}, 0 0 30px ${color}` : '0 2px 8px rgba(0,0,0,0.3)'}; transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'}; transition: all 0.3s ease;">
            ${getIconEmoji(point.type)}
          </div>
        </div>`,
        className: isSelected ? 'selected-marker-container' : '',
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2]
      });
      marker.setIcon(icon);
    });
  };

  const handleBackToHome = () => {
    // Save scroll position info
    sessionStorage.setItem('lastViewedDay', currentDay.toString());
    if (selectedPoint) {
      sessionStorage.setItem('lastViewedStop', selectedPoint.index.toString());
    }
    navigate('/');
  };

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    setSelectedPoint(null);
    loadDay(day, null);
  };

  const dayColors = ['#60a5fa', '#fbbf24', '#34d399', '#a8a29e'];

  return (
    <div className="h-screen w-full relative font-mali">
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-3xl p-3 shadow-lg border-2 border-white">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              🇹🇼 บันทึกเที่ยวไทเป
            </h1>
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-1.5 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 rounded-xl hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" /> กลับหน้าแรก
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[1, 2, 3, 4].map((day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  currentDay === day
                    ? 'text-white shadow-md'
                    : 'bg-white border-2 border-muted text-muted-foreground'
                }`}
                style={currentDay === day ? { backgroundColor: dayColors[day - 1] } : {}}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      {selectedPoint && (
        <div className="absolute bottom-6 left-4 right-4 z-50 max-w-md mx-auto animate-slide-up">
          <div className="bg-white rounded-3xl p-5 shadow-xl border-4" style={{ borderColor: selectedPoint.color + '40' }}>
            <button
              onClick={() => setSelectedPoint(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-muted hover:bg-muted/80"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-3 py-1 rounded-full text-white text-sm font-bold"
                style={{ backgroundColor: selectedPoint.color }}
              >
                จุดที่ {selectedPoint.index + 1}
              </span>
            </div>
            
            <h3 className="font-bold text-lg">{selectedPoint.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{selectedPoint.desc}</p>
            
            {selectedPoint.review && (
              <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl p-3 mb-3">
                <span className="text-xs font-bold text-amber-600">✨ รีวิว</span>
                <p className="text-sm text-amber-900 italic mt-1">{selectedPoint.review}</p>
              </div>
            )}
            
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPoint.googleMapsQuery || selectedPoint.title + ' Taiwan')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-bold"
              style={{ backgroundColor: selectedPoint.color }}
            >
              <MapPin className="w-4 h-4" /> นำทาง (Google Maps)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelMap;
