// Previous imports remain the same
import Gallery from '@/components/sections/project/Gallery';

// Previous code remains the same until after the content section

      {/* Project Gallery */}
      {project.gallery && (
        <section className="px-6 mb-24">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-light">Project Gallery</h2>
              <Gallery images={project.gallery} title={project.title} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Projects - Optional Enhancement */}
      <section className="px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-light">More Projects</h2>
              <Link 
                href="/projects"
                className="text-sm hover:opacity-60 transition-opacity"
              >
                View All Projects
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects
                .filter(p => p.slug !== project.slug)
                .slice(0, 3)
                .map((relatedProject, index) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    className="group"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                        <OptimizedImage
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          width={600}
                          height={450}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-lg font-medium mb-2">{relatedProject.title}</h3>
                      <p className="text-sm text-neutral-500">{relatedProject.category}</p>
                    </motion.article>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}