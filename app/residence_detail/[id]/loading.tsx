export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-20 max-w-7xl mx-auto px-6 py-6">
      {/* Header Skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px] md:h-[500px] mb-8 animate-pulse">
        <div className="col-span-2 row-span-2 bg-gray-200"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-200"></div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-pulse">
        <div className="md:col-span-2">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
             <div className="h-4 bg-gray-200 rounded w-full"></div>
             <div className="h-4 bg-gray-200 rounded w-full"></div>
             <div className="h-4 bg-gray-200 rounded w-full"></div>
             <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
