// Previous imports remain the same
import Testimonial from '@/components/sections/project/Testimonial';

// Previous code remains the same until after the Stats Section

              {/* Testimonial Section */}
              {project.testimonial && (
                <Testimonial
                  quote={project.testimonial.quote}
                  author={project.testimonial.author}
                  position={project.testimonial.position}
                  company={project.testimonial.company}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}