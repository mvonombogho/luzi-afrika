'use client';

// ... previous imports and code remains the same until the main content div ...

            {/* Main Content */}
            <div className="md:col-span-2 space-y-16">
              {/* Challenge Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-light">The Challenge</h2>
                <div className="prose prose-lg prose-neutral">
                  <p>{project.challenge}</p>
                </div>
              </motion.div>

              {/* Solution Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-light">Our Solution</h2>
                <div className="prose prose-lg prose-neutral">
                  <p>{project.solution}</p>
                </div>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-light">Key Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <p className="text-lg text-neutral-600">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 bg-neutral-50 rounded-lg px-8"
              >
                <div className="text-center">
                  <p className="text-3xl font-light mb-2">200%</p>
                  <p className="text-sm text-neutral-600">Performance Boost</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-light mb-2">99.9%</p>
                  <p className="text-sm text-neutral-600">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-light mb-2">40%</p>
                  <p className="text-sm text-neutral-600">Cost Reduction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-light mb-2">3x</p>
                  <p className="text-sm text-neutral-600">Processing Speed</p>
                </div>
              </motion.div>
            </div>
