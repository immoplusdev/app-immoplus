export interface FeedVideo {
  id: string;
  titre: string;
  description: string;
  miniature: string; // The thumbnail ID
  video: string;     // The video ID
  createdAt: string;
  updatedAt: string;
}

export interface FeedVideoResponse {
  data: FeedVideo;
}
