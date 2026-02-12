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

export interface BienImmobilier {
  id: string;
  nom: string;
  typeBienImmobilier: string;
  description: string;
  amentities: any[]; // The API returns 'amentities'
  tags: string[];
  images: string[];
  adresse: string;
  position: Position;
  latitude: number;
  longitude: number;
  statusValidation: string;
  prix: number;
  metadata: any | null;
  featured: boolean;
  aLouer: boolean;
  typeLocation: string; // 'vente', 'mois', 'jour', etc.
  pieces: any[]; // Assuming similar to residence pieces if not empty
  bienImmobilierDisponible: boolean;
  nombreMaxOccupants: number;
  animauxAutorises: boolean | null;
  fetesAutorises: boolean;
  reglesSupplementaires: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  miniature: string;
  video: string;
  ville: string;
  commune: string;
  proprietaire: string;
  ville_model: Ville;
  commune_model: Commune;
  ville_id: string;
  commune_id: string;
}

export interface BienResponse {
  data: BienImmobilier;
}
