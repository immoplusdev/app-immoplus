export interface Amenity {
  icon: string;
  text: string;
}

export interface Piece {
  nom: string;
  nombre: number;
}

export interface Position {
  type: string;
  coordinates: [number, number];
}

export interface Ville {
  id: string;
  name: string;
}

export interface Commune {
  id: string;
  name: string;
}

export interface Residence {
  id: string;
  nom: string;
  typeResidence: string;
  description: string;
  commodites: Amenity[];
  pieces: Piece[];
  images: string[];
  adresse: string;
  latitude: number;
  longitude: number;
  residenceDisponible: boolean;
  prixReservation: number;
  dureeMinSejour: number;
  dureeMaxSejour: number;
  heureEntree: string;
  heureDepart: string;
  nombreMaxOccupants: number;
  animauxAutorises: boolean;
  fetesAutorises: boolean;
  reglesSupplementaires: string;
  miniature: string;
  video: string;
  ville_model: Ville;
  commune_model: Commune;
}

export interface ResidenceResponse {
  data: Residence;
}
