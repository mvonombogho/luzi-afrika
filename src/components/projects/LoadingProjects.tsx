export default function LoadingProjects() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            <div className="w-24 h-10 animate-pulse bg-neutral-200 rounded-full"></div>
            <div className="w-32 h-10 animate-pulse bg-neutral-200 rounded-full"></div>
            <div className="w-28 h-10 animate-pulse bg-neutral-200 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-6">
              <div className="aspect-[4/3] animate-pulse bg-neutral-200 rounded-lg"></div>
              <div className="space-y-3">
                <div className="w-32 h-4 animate-pulse bg-neutral-200 rounded-full"></div>
                <div className="w-full h-6 animate-pulse bg-neutral-200 rounded-full"></div>
                <div className="w-full h-4 animate-pulse bg-neutral-200 rounded-full"></div>
                <div className="w-3/4 h-4 animate-pulse bg-neutral-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}