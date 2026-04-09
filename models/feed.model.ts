export interface FeedVideoContent {
  title: string;
  description: string;
  price?: string;
  location?: string;
}

export interface FeedVideo {
  id: string;
  source: string;
  videoUrl: string;
  videoType: string;
  thumbnailUrl: string;
  status: string;
  content: FeedVideoContent;
  shortCode: string;
  createdAt: string;
}

export interface FeedVideoResponse {
  data: FeedVideo;
}
