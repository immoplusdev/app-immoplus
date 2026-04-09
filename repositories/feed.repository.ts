import api from '../providers/api';
import { FeedVideoResponse } from '../models/feed.model';

export const FeedRepository = {
  getById: async (id: string): Promise<FeedVideoResponse> => {
    const response = await api.get<FeedVideoResponse>(`/feed-videos/data/public/${id}`);
    return response.data;
  },
};
