import React from 'react';
import { Residence } from '../../models/residence.model';

interface ResidenceInfoProps {
  residence: Residence;
}

const ResidenceInfo: React.FC<ResidenceInfoProps> = ({ residence }) => {
  return (
    <div className="flex flex-col gap-6 py-8 border-b border-gray-200">
      <div>
        <h2 className="text-2xl font-semibold text-[#222222]">
          {residence.typeResidence} à {residence.commune_model?.name || 'Inconnu'}
        </h2>
        <div className="text-[#222222] mt-1">
          {residence.pieces.map((piece, index) => (
            <span key={piece.nom}>
                {piece.nombre} {piece.nom}{index < residence.pieces.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-200">
        <p className="whitespace-pre-line text-[#222222] leading-7">
          {residence.description}
        </p>
      </div>

      <div className="pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Règles de la maison</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#222222]">
            <li>Arrivée : {residence.heureEntree}</li>
            <li>Départ : {residence.heureDepart}</li>
            <li>Maximum {residence.nombreMaxOccupants} occupants</li>
            <li>Animaux : {residence.animauxAutorises ? 'Autorisés' : 'Non autorisés'}</li>
            <li>Fêtes : {residence.fetesAutorises ? 'Autorisées' : 'Non autorisées'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ResidenceInfo;
