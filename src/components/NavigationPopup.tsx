import { X, MapPin, Navigation, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  review?: string;
  hours?: string;
  googleMapsUrl?: string;
  day: number;
  stopIndex: number;
  color?: string;
}

const NavigationPopup = ({
  isOpen,
  onClose,
  title,
  description,
  review,
  hours,
  googleMapsUrl,
  day,
  stopIndex,
  color = '#60a5fa'
}: NavigationPopupProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewOnMap = () => {
    navigate(`/map?day=${day}&stop=${stopIndex}`);
  };

  const handleOpenGoogleMaps = () => {
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="nav-popup-overlay" onClick={onClose}>
      <div className="nav-popup animate-bounce-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: color }}
          >
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Hours */}
        {hours && (
          <div className="hours-tag mb-3 inline-block">
            🕒 {hours}
          </div>
        )}

        {/* Review Box */}
        {review && (
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl p-4 mb-4 relative">
            <div className="absolute -top-2 left-3 bg-amber-50 px-1 text-amber-600 font-bold">
              ❝
            </div>
            <div className="flex items-start gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                รีวิวล่าสุด
              </span>
            </div>
            <p className="text-sm text-amber-900 italic leading-relaxed font-sarabun">
              {review}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleViewOnMap}
            className="flex-1 gap-2 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: color }}
          >
            <Navigation className="w-4 h-4" />
            ดูบนแผนที่
          </Button>
          {googleMapsUrl && (
            <Button
              onClick={handleOpenGoogleMaps}
              variant="outline"
              className="flex-1 gap-2 rounded-2xl font-bold border-2"
            >
              <MapPin className="w-4 h-4" />
              Google Maps
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationPopup;
