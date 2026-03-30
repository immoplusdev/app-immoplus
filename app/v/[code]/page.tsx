import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function ShortLinkPage({ params }: PageProps) {
  const { code } = await params;

  let feedVideoId: string;
  try {
    const res = await fetch(`https://api-v2.immoplus.ci/short/${code}`, {
      cache: 'no-store',
    });
    if (!res.ok) return notFound();

    const data = await res.json();
    feedVideoId = data.entityId;
  } catch {
    return notFound();
  }

  if (!feedVideoId) return notFound();

  redirect(`/vivre/${feedVideoId}`);
}
