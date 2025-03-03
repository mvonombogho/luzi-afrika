import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function ProjectLoading() {
  return (
    <main className="pt-32">
      {/* Project Header */}
      <section className="px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <LoadingSkeleton className="mb-4" height="h-6" width="w-32" />
          <LoadingSkeleton className="mb-8" height="h-12" width="w-96" />
          <LoadingSkeleton height="h-[600px]" rounded="rounded-lg" />
        </div>
      </section>

      {/* Project Content */}
      <section className="px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Client Info */}
              <div className="space-y-2">
                <LoadingSkeleton className="mb-2" height="h-4" width="w-24" />
                <LoadingSkeleton height="h-6" width="w-48" />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <LoadingSkeleton className="mb-2" height="h-4" width="w-24" />
                <LoadingSkeleton height="h-6" width="w-32" />
              </div>

              {/* Services */}
              <div className="space-y-4">
                <LoadingSkeleton className="mb-4" height="h-4" width="w-24" />
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingSkeleton key={index} height="h-4" width="w-full" />
                ))}
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <LoadingSkeleton className="mb-4" height="h-4" width="w-24" />
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingSkeleton key={index} height="h-4" width="w-full" />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-16">
              {/* Challenge Section */}
              <div className="space-y-6">
                <LoadingSkeleton className="mb-4" height="h-8" width="w-48" />
                <LoadingSkeleton height="h-4" width="w-full" />
                <LoadingSkeleton height="h-4" width="w-full" />
                <LoadingSkeleton height="h-4" width="w-3/4" />
              </div>

              {/* Solution Section */}
              <div className="space-y-6">
                <LoadingSkeleton className="mb-4" height="h-8" width="w-48" />
                <LoadingSkeleton height="h-4" width="w-full" />
                <LoadingSkeleton height="h-4" width="w-full" />
                <LoadingSkeleton height="h-4" width="w-3/4" />
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <LoadingSkeleton className="mb-4" height="h-8" width="w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex gap-4">
                      <LoadingSkeleton height="h-8" width="w-8" rounded="rounded-full" />
                      <LoadingSkeleton height="h-4" width="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Skeleton */}
      <section className="px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <LoadingSkeleton className="mb-8" height="h-8" width="w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} height="h-64" rounded="rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}