import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Users } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import LGBTLoading from "@/components/ui/LGBTLoading";

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  interest?: string;
  position?: string;
  image?: string;
  status: string;
  createdAt: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/membership`
        );
        const data = await response.json();
        const approvedMembers = data.filter(
          (member: Member) => member.status === "Approved"
        );
        setMembers(approvedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <MainLayout>
      {/* HERO */}
      <PageHero
        badge="Community"
        title="Our Members"
        subtitle="Meet the amazing individuals who are part of our Sneh Jeet NGO family, working together for equality and inclusion."
      />

      {/* MEMBERS SECTION */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          {loading ? (
            <div className="py-16 text-center">
              <LGBTLoading message="Loading members..." size="lg" variant="pride" />
            </div>
          ) : members.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold">
                No Approved Members Yet
              </h3>
              <p className="text-muted-foreground mt-2">
                We're building our community. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div className="relative bg-card rounded-2xl border border-border pt-16 pb-6 px-6 text-center shadow-sm hover:shadow-lg transition-all duration-300">

                    {/* PROFILE IMAGE */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-purple-600 p-[3px]">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                          {member.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}${member.image}`}
                              alt={`${member.firstName} ${member.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-bold text-primary">
                              {member.firstName.charAt(0)}
                              {member.lastName.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* NAME */}
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {member.firstName} {member.lastName}
                    </h3>

                    {/* POSITION */}
                    {member.position && (
                      <p className="text-sm font-medium text-primary mt-1">
                        {member.position}
                      </p>
                    )}

                    {/* INTEREST */}
                    {/* {member.interest && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {member.interest}
                      </p>
                    )} */}

                    {/* DIVIDER */}
                    <div className="my-4 h-px bg-border" />

                    {/* CONTACT INFO */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">
                          {member.email}
                        </span>
                      </div>

                      {member.mobile && (
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{member.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Be part of something meaningful. Join Sneh Jeet NGO and help us
              build a more inclusive future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                Become a Member
              </button>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Members;
