import { Metadata } from 'next';
import { FeedRepository } from '@/repositories/feed.repository';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const id = (await params).id;
  try {
    const { data: video } = await FeedRepository.getById(id);
    const title = video.content?.title || 'Voir cette vidéo sur ImmoPlus';
    const description = video.content?.description?.slice(0, 160)
      || (video.content?.price && video.content?.location
        ? `${video.content.price} — ${video.content.location}`
        : 'Découvrez cette vidéo sur ImmoPlus');
    const image = video.thumbnailUrl || '/icon.jpg';

    return {
      title: `${title} | ImmoPlus`,
      description,
      openGraph: {
        title,
        description,
        images: [image],
        type: 'video.other',
        siteName: 'ImmoPlus',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: 'Voir une vidéo | ImmoPlus',
      description: 'Découvrez des contenus exclusifs sur ImmoPlus.',
      openGraph: {
        title: 'ImmoPlus - Feed',
        description: 'Découvrez des contenus exclusifs sur ImmoPlus.',
        images: ['/icon.jpg'],
      },
    };
  }
}

export default async function VideoPage({ params }: PageProps) {
  const id = (await params).id;

  let video;
  try {
    const response = await FeedRepository.getById(id);
    video = response.data;
  } catch {
    // Falls back to showing generic download page if video fetch fails
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img
        src={video?.thumbnailUrl || '/icon.jpg'}
        alt="ImmoPlus"
        className="w-40 h-40 object-cover rounded-2xl mb-6 shadow-lg"
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center max-w-md">
        {video?.content?.title || 'Voir cette vidéo sur ImmoPlus'}
      </h1>

      {video?.content?.description && (
        <p className="text-gray-600 text-center mb-4 max-w-sm line-clamp-3">
          {video.content.description}
        </p>
      )}

      <p className="text-gray-500 text-center mb-10">
        {"Téléchargez l'application pour accéder à cette vidéo et à toutes nos offres immobilières."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://apps.apple.com/ci/app/immo-plus/id6755297623"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img src="/download_appstore.svg" alt="Télécharger sur l'App Store" className="h-12" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.immoplus.ci&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img src="/download_playstore.svg" alt="Disponible sur Google Play" className="h-12" />
        </a>
      </div>
    </main>
  );
}
