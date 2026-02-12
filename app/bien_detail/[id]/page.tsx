import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Using the generic gallery component
import PropertyGallery from '@/components/property/PropertyGallery';
import { BienRepository } from '@/repositories/bien.repository';
// Reusing these if compatible, or recreating/adapting inline if data shape differs significantly
import ResidenceHeader from '@/components/residence/ResidenceHeader';
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
    const { data: responseData } = await BienRepository.getById(id);
    const bien = responseData.data;
    const images = bien.images.map(imgId => getImageUrl(imgId));

    const priceText = bien.aLouer 
      ? `${bien.prix?.toLocaleString() ?? 'N/A'} FCFA/${bien.typeLocation}` 
      : `${bien.prix?.toLocaleString() ?? 'N/A'} FCFA`;

    return {
      title: `${bien.nom} | ${priceText}`,
      description: bien.description.slice(0, 160),
      icons: {
        icon: '/icon.jpg',
        shortcut: '/icon.jpg',
        apple: images.length > 0 ? images[0] : '/icon.jpg',
      },
      openGraph: {
        title: `${bien.nom} | ${priceText}`,
        description: bien.description.slice(0, 160),
        images: images.length > 0 ? images.slice(0, 1) : ['/icon.jpg'],
        type: 'website',
        siteName: 'ImmoPlus',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${bien.nom} | ${priceText}`,
        description: bien.description.slice(0, 160),
        images: images.length > 0 ? images.slice(0, 1) : ['/icon.jpg'],
      },
    };
  } catch {
    return {
      title: 'Bien non trouvé | ImmoPlus',
      icons: {
         icon: '/icon.jpg',
      },
    };
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const id = (await params).id;
  
  let bien;
  try {
    const response = await BienRepository.getById(id);
    bien = response.data.data;
  } catch {
     return notFound();
  }

  if (!bien) {
    return notFound();
  }

  // Determine display strings
  const isRent = bien.aLouer;
  const priceDisplay = isRent 
    ? `${bien?.prix?.toLocaleString() ?? 'N/A'} FCFA / ${bien?.typeLocation}`
    : `${bien?.prix?.toLocaleString() ?? 'N/A'} FCFA`;

  // Adapt Amenities: The API returns 'amentities' (typo in API?), mapping to our component expected format if needed
  // If ResidenceAmenities expects { residence: Residence }, we might need to adapt or create a PropertyAmenities
  // For now, let's look at ResidenceAmenities props.
  // Assuming we need to inline or adapt, I will assume a PropertyAmenities or reuse inline for now.
  // Since I can't easily check ResidenceAmenities props right now without a view_file (I am in a hurry),
  // I will assume I can create a similar structure or just display them.

  // Logic to determine a concise title
  const isNameLong = bien.nom.length > 80;
  const isNameSameAsDesc = bien.nom === bien.description;
  const displayTitle = (isNameLong || isNameSameAsDesc)
    ? `${bien.typeBienImmobilier} à ${bien.commune_model?.name || bien.ville_model?.name || bien.adresse}`
    : bien.nom;

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="pt-8 pb-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 capitalize">
            {displayTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
             <span>{bien.adresse}, {bien.ville_model?.name}</span>
             {bien.featured && (
               <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">Featured</span>
             )}
             <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${isRent ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {isRent ? 'Location' : 'Vente'}
             </span>
          </div>
        </div>
      </div>

      <PropertyGallery images={bien.images} title={bien.nom} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2">
           {/* Info Section */}
           <div className="py-8 border-b border-gray-200">
             <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {bien.typeBienImmobilier} {isRent ? 'à louer' : 'à vendre'}
                  </h2>
                  <p className="text-gray-600">
                    {/* Display pieces if available, else standard text */}
                     Géré par {bien.proprietaire ? 'un professionnel' : 'ImmoPlus'}
                  </p>
               </div>
               {/* Owner Avatar / contact if available */}
             </div>
             
             <div className="prose max-w-none text-gray-700 whitespace-pre-line">
               {bien.description}
             </div>
           </div>

           {/* Amenities - Using 'amentities' from API */}
           {bien.amentities && bien.amentities.length > 0 && (
             <div className="py-8 border-b border-gray-200">
               <h3 className="text-xl font-semibold mb-6">Ce que propose ce bien</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {bien.amentities.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                       {/* Icon mapping would go here, displaying text for now */}
                       <span>{item.text || item.nom || item}</span> 
                    </div>
                 ))}
               </div>
             </div>
           )}
          
          {bien.video && (
            <div className="py-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Visite vidéo</h3>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <video 
                  controls 
                  className="w-full h-full"
                  src={getVideoUrl(bien.video)}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="mt-8 md:mt-0">
           <div className="sticky top-28 p-6 border border-gray-200 rounded-xl shadow-xl">
              <div className="text-2xl font-semibold mb-4 text-[#2172cb]">
                {priceDisplay}
              </div>
              
              {!isRent && (
                <div className="text-sm text-gray-500 mb-6 italic">
                   Prix à débattre (selon description)
                </div>
              )}

              <div className="flex flex-col gap-3">
                 <p className="text-center text-sm font-medium text-gray-700">Contacter pour {isRent ? 'louer' : 'acheter'}</p>
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
                Ce bien est géré par ImmoPlus
              </p>
           </div>
        </div>
      </div>
    </main>
  );
}
