import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Residence } from '../../models/residence.model';

interface ResidenceHeaderProps {
  residence: Residence;
}

const ResidenceHeader: React.FC<ResidenceHeaderProps> = ({ residence }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-sans">
      <h1 className="text-3xl font-semibold text-[#222222] mb-2">{residence.nom}</h1>
      <div className="flex items-center justify-between text-sm text-[#222222]">
        <div className="flex items-center gap-2 underline font-medium cursor-pointer">
          {residence.adresse}
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors underline font-medium">
            <FontAwesomeIcon icon={faShare} />
            Partager
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors underline font-medium">
            <FontAwesomeIcon icon={faHeart} />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidenceHeader;
