import api from '../providers/api';
import { BienResponse } from '../models/bien.model';

export const BienRepository = {
  getById: async (id: string) => {
    return api.get<BienResponse>(`/biens-immobiliers/data/public/${id}`);
  },
};
