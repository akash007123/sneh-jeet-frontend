import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { partners } from "@/data/mockData";

const PartnersSection = () => {
  const allPartners = partners.flatMap(category => category.organizations);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-padding mx-auto max-w-7xl">
        <SectionHeading
          badge="Partners"
          title="Together We're Stronger"
          subtitle="Organizations who share our vision for equality and inclusion"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-xl p-6 flex flex-col items-center justify-center border border-border hover:border-primary/30 transition-colors"
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-3 overflow-hidden"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #ffd93d, #a855f7)",
                  backgroundSize: "300% 300%",
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
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
