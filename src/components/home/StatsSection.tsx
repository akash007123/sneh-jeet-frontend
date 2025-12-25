import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import {
  Users,
  Award,
  TrendingUp,
  Clock,
} from "lucide-react";
import { stats } from "@/data/mockData";

const icons = {
  users: Users,
  award: Award,
  growth: TrendingUp,
  clock: Clock,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-24 bg-gradient-to-b from-foreground via-foreground to-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />

      <div
        ref={ref}
        className="relative container-padding mx-auto max-w-7xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {stats.map((stat, index) => {
            const Icon = icons[stat.icon];

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  rotateX: 6,
                  rotateY: -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                }}
                className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-white/20"
              >
                {/* Glow Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <div className="font-display text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.isStatic ? (
                    stat.value
                  ) : isInView ? (
                    <CountUp
                      end={Number(stat.value.replace(/\D/g, ""))}
                      suffix={stat.value.replace(/[0-9]/g, "")}
                      duration={2}
                    />
                  ) : (
                    stat.value
                  )}
                </div>

                {/* Label */}
                <p className="text-background/70 text-sm md:text-base font-medium tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
