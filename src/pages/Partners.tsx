import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { partners } from "@/data/mockData";

const Partners = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Partners & Supporters - Sneh Jeet NGO</title>
        <meta name="description" content="Meet our partners and supporters who help us advance LGBTQIA+ rights and create inclusive communities." />
        <meta name="keywords" content="partners, supporters, NGO, corporate sponsors, government, media partners" />
        <link rel="canonical" href="/partners" />
        <meta property="og:title" content="Partners & Supporters - Sneh Jeet NGO" />
        <meta property="og:description" content="Meet our partners and supporters who help us advance LGBTQIA+ rights and create inclusive communities." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/partners" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partners & Supporters - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Meet our partners and supporters who help us advance LGBTQIA+ rights and create inclusive communities." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      <PageHero
        badge="Partners & Supporters"
        title="Together We're Stronger"
        subtitle="Organizations and individuals who share our vision for equality and inclusion"
      />

      {/* Partners Sections */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          {partners.map((partnerCategory, categoryIndex) => (
            <motion.div
              key={partnerCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <SectionHeading
                badge={partnerCategory.category}
                title={`Our ${partnerCategory.category}`}
                subtitle={`Collaborating with organizations that support our mission`}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerCategory.organizations.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {partner.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 md:p-12 border border-border"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Become a Partner
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join our network of supporters and help us create lasting change in our community.
              Whether through funding, resources, or advocacy, your partnership makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/donate"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Make a Donation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Partners;