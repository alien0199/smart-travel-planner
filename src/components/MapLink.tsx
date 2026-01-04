import { MapPin } from 'lucide-react';
import { useState } from 'react';
import NavigationPopup from './NavigationPopup';

interface MapLinkProps {
  title: string;
  description: string;
  review?: string;
  hours?: string;
  googleMapsUrl: string;
  day: number;
  stopIndex: number;
  color?: string;
}

const MapLink = ({
  title,
  description,
  review,
  hours,
  googleMapsUrl,
  day,
  stopIndex,
  color
}: MapLinkProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="map-link cursor-pointer"
      >
        <MapPin className="w-3 h-3" />
        แผนที่
      </button>
      
      <NavigationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={title}
        description={description}
        review={review}
        hours={hours}
        googleMapsUrl={googleMapsUrl}
        day={day}
        stopIndex={stopIndex}
        color={color}
      />
    </>
  );
};

export default MapLink;
