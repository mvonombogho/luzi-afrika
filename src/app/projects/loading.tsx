import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function ProjectsLoading() {
  return (
    <main className="pt-32 pb-24">
      {/* Header Skeleton */}
      <section className="px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <LoadingSkeleton className="mb-4" height="h-10" width="w-48" />
          <LoadingSkeleton className="mb-8" height="h-6" width="w-96" />
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <section className="px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <LoadingSkeleton className="mb-4" height="h-64" rounded="rounded-lg" />
                <LoadingSkeleton className="mb-2" height="h-4" width="w-24" />
                <LoadingSkeleton className="mb-4" height="h-6" width="w-64" />
                <LoadingSkeleton height="h-4" width="w-full" />
                <LoadingSkeleton height="h-4" width="w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}