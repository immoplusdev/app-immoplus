import { ImageResponse } from 'next/og';
import { FeedRepository } from '@/repositories/feed.repository';

export const runtime = 'edge';
export const alt = 'ImmoPlus - Vidéo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let thumbnailUrl: string | null = null;
  let title = 'ImmoPlus';

  try {
    const { data: video } = await FeedRepository.getById(id);
    thumbnailUrl = video.thumbnailUrl || null;
    title = video.content?.title || 'ImmoPlus';
  } catch {
    // fallback to default
  }

  if (thumbnailUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px 30px',
            }}
          >
            <span style={{ color: 'white', fontSize: 32, fontWeight: 700 }}>
              {title}
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Fallback: image générique
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
          color: '#111827',
        }}
      >
        <span style={{ fontSize: 64, marginBottom: 20 }}>ImmoPlus</span>
        <span style={{ fontSize: 28, color: '#6b7280', fontWeight: 400 }}>
          Découvrez cette vidéo
        </span>
      </div>
    ),
    { ...size }
  );
}
