import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#2744de] to-[#7ca1f9] font-sans px-4 py-6 overflow-y-auto">
      <main className="flex flex-col items-center justify-start max-w-6xl w-full mx-auto gap-4 md:gap-6">
        {/* iPhone Mockup - Responsive sizing with max height */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px] aspect-9/19 flex-shrink-0">
          <Image
            src="/compress.png"
            alt="ImmoPlus App Screenshot"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        
        {/* App Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Immo Plus
        </h1>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 text-center max-w-2xl">
         {"Votre 1rere plateforme immobilière tout en un en Côte d'Ivoire"}
        </p>
        
        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pb-4">
          <a 
            href="https://apps.apple.com/ci/app/immo-plus/id6755297623" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image 
              src="/download_appstore.svg" 
              alt="Télécharger sur l'App Store" 
              width={160} 
              height={48}
              className="h-12 w-auto"
            />
          </a>
          <a 
            href="https://play.google.com/store/apps/details?id=com.immoplus.ci&pcampaignid=web_share" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image 
              src="/download_playstore.svg" 
              alt="Disponible sur Google Play" 
              width={160} 
              height={48}
              className="h-12 w-auto"
            />
          </a>
        </div>
      </main>
    </div>
  );
}