import api from '../providers/api';
import { ResidenceResponse } from '../models/residence.model';

export const ResidenceRepository = {
  getById: async (id: string): Promise<ResidenceResponse> => {
    const response = await api.get<ResidenceResponse>(`/residences/data/public/${id}`);
    return response.data;
  },
};
