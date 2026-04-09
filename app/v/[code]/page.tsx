import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { FeedRepository } from '@/repositories/feed.repository';

interface PageProps {
  params: Promise<{ code: string }>;
}

async function resolveShortCode(code: string) {
  const res = await fetch(`https://api-v2.immoplus.ci/short/${code}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.entityId as string | undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;

  try {
    const videoId = await resolveShortCode(code);
    if (!videoId) return { title: 'ImmoPlus' };

    const { data: video } = await FeedRepository.getById(videoId);
    const title = video.content?.title || 'Voir cette vidéo sur ImmoPlus';
    const description = video.content?.description?.slice(0, 160)
      || (video.content?.price && video.content?.location
        ? `${video.content.price} — ${video.content.location}`
        : 'Découvrez cette vidéo sur ImmoPlus');
    return {
      title: `${title} | ImmoPlus`,
      description,
      openGraph: {
        title,
        description,
        url: `https://app.immoplus.ci/vivre/${videoId}`,
        siteName: 'ImmoPlus',
        locale: 'fr_CI',
        type: 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch {
    return {
      title: 'ImmoPlus',
      description: 'Découvrez des contenus exclusifs sur ImmoPlus.',
    };
  }
}

export default async function ShortLinkPage({ params }: PageProps) {
  const { code } = await params;

  const feedVideoId = await resolveShortCode(code);

  if (!feedVideoId) return notFound();

  redirect(`/vivre/${feedVideoId}`);
}
