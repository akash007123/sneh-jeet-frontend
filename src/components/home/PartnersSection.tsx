import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { partners } from "@/data/mockData";

const PartnersSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-padding mx-auto max-w-7xl">
        <SectionHeading
          badge="Partners"
          title="Together We're Stronger"
          subtitle="Organizations who share our vision for equality and inclusion"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-xl p-6 flex flex-col items-center justify-center border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground mb-3">
                {partner.logo}
              </div>
              <span className="text-sm text-center text-muted-foreground">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
