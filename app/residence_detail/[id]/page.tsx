import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResidenceRepository } from '@/repositories/residence.repository';
import ResidenceHeader from '@/components/residence/ResidenceHeader';
import ResidenceGallery from '@/components/residence/ResidenceGallery';
import ResidenceInfo from '@/components/residence/ResidenceInfo';
import ResidenceAmenities from '@/components/residence/ResidenceAmenities';
import { getImageUrl, getVideoUrl } from '@/providers/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const id = (await params).id;
  try {
    const { data: residence } = await ResidenceRepository.getById(id);
    const images = residence.images.map(imgId => getImageUrl(imgId));
    console.log(images,'IMAGES')
    return {
      title: `${residence.nom} | ImmoPlus`,
      description: residence.description.slice(0, 160),
      icons: {
        icon: '/icon.jpg',
        shortcut: '/icon.jpg',
        apple: images.length > 0 ? images[0] : '/icon.jpg',
      },
      openGraph: {
        title: residence.nom,
        description: residence.description.slice(0, 160),
        images: images.length > 0 ? images.slice(0, 1) : ['/icon.jpg'],
        type: 'website',
        siteName: 'ImmoPlus',
      },
      twitter: {
        card: 'summary_large_image',
        title: residence.nom,
        description: residence.description.slice(0, 160),
        images: images.length > 0 ? images.slice(0, 1) : ['/icon.jpg'],
      },
    };
  } catch {
    return {
      title: 'Résidence non trouvée | ImmoPlus',
      icons: {
        icon: '/icon.jpg',
      },
    };
  }
}

export default async function ResidenceDetailPage({ params }: PageProps) {
  const id = (await params).id;
  
  let residence;
  try {
    const response = await ResidenceRepository.getById(id);
    residence = response.data;
  } catch {
     return notFound();
  }

  if (!residence) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <ResidenceHeader residence={residence} />
      <ResidenceGallery residence={residence} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <ResidenceInfo residence={residence} />
          <ResidenceAmenities residence={residence} />
          
          {residence.video && (
            <div className="py-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Visite vidéo</h3>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <video 
                  controls 
                  className="w-full h-full"
                  src={getVideoUrl(residence.video)}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar Space (Price & Download) */}
        <div className="mt-8 md:mt-0">
           <div className="sticky top-28 p-6 border border-gray-200 rounded-xl shadow-xl">
              <div className="text-2xl font-semibold mb-4">
                {residence.prixReservation.toLocaleString()} FCFA <span className="text-base font-normal text-gray-500">/ nuit</span>
              </div>
              {/* <div className="text-sm text-gray-500 mb-6">
                Durée min : {residence.dureeMinSejour} jour(s)
              </div> */}
              
              <div className="flex flex-col gap-3">
                 <p className="text-center text-sm font-medium text-gray-700">Télécharger l'application pour réserver</p>
                 <div className="flex gap-2 justify-center">
                    <a href="https://apps.apple.com/ci/app/immo-plus/id6755297623" target="_blank" rel="noopener noreferrer">
                      <img src="/download_appstore.svg" alt="Télécharger sur l'App Store" className="h-10" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.immoplus.ci&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                      <img src="/download_playstore.svg" alt="Disponible sur Google Play" className="h-10" />
                    </a>
                 </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                Cette résidence est gérée par ImmoPlus
              </p>
           </div>
        </div>
      </div>
    </main>
  );
}
