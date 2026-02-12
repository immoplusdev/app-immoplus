import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import { Residence } from '../../models/residence.model';

interface ResidenceAmenitiesProps {
  residence: Residence;
}

const iconMap: Record<string, IconDefinition> = {
  'wifi': SolidIcons.faWifi,
  'tv': SolidIcons.faTv,
  'kitchen': SolidIcons.faKitchenSet,
  'kitchen-set-solid': SolidIcons.faKitchenSet,
  'fan-solid': SolidIcons.faFan,
  'dry_cleaning': SolidIcons.faSoap,
  'directions_car': SolidIcons.faCar,
  'microwave': SolidIcons.faUtensils,
  'wind': SolidIcons.faWind,
};

const ResidenceAmenities: React.FC<ResidenceAmenitiesProps> = ({ residence }) => {
  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold mb-6">Ce que propose ce logement</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        {residence.commodites.map((amenity, index) => {
          const icon = iconMap[amenity.icon] || SolidIcons.faCircleCheck;
          return (
            <div key={index} className="flex items-center gap-4 text-[#222222]">
              <div className="w-6 flex justify-center text-xl">
                <FontAwesomeIcon icon={icon} />
              </div>
              <span>{amenity.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResidenceAmenities;
