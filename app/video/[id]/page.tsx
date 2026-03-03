export default function VideoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img src="/icon.jpg" alt="ImmoPlus" className="w-20 h-20 rounded-2xl mb-6" />
      <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        Voir cette vidéo sur ImmoPlus
      </h1>
      <p className="text-gray-500 text-center mb-10">
        Téléchargez l'application pour accéder à cette vidéo et à toutes nos offres immobilières.
      </p>
      <div className="flex gap-4">
        <a
          href="https://apps.apple.com/ci/app/immo-plus/id6755297623"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/download_appstore.svg" alt="Télécharger sur l'App Store" className="h-12" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.immoplus.ci&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/download_playstore.svg" alt="Disponible sur Google Play" className="h-12" />
        </a>
      </div>
    </main>
  );
}
