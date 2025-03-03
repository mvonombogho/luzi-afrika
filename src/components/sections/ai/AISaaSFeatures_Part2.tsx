          {/* Content Side */}
          <div>
            <motion.h3
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              AI Software Solutions Tailored for Kenya
            </motion.h3>
            
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our AI SaaS solutions are specifically designed for the Kenyan market, taking into account local business practices, data availability, and connectivity challenges. We provide powerful machine learning and analytics capabilities that are accessible and affordable for businesses of all sizes.
            </motion.p>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Benefits for Kenyan Businesses:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-purple-100 p-6 rounded-lg border border-purple-200">
                <h4 className="text-lg font-semibold mb-2">Ready to transform your business with AI?</h4>
                <p className="text-gray-700 mb-4">
                  Schedule a free consultation with our AI specialists in Nairobi to discover the right solutions for your business needs.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800"
                >
                  Book a consultation <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}