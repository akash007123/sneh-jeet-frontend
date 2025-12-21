import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, Handshake, ArrowRight, Clock, CheckCircle, Mail, Phone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LGBTLoading from "@/components/ui/LGBTLoading";
import { volunteerOpportunities } from "@/data/mockData";

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

const GetInvolved = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    interest: "",
    image: null as File | null,
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/membership`);
        const data = await response.json();
        const approvedMembers = data.filter((member: Member) => member.status === "Approved");
        const sortedMembers = approvedMembers.sort((a: Member, b: Member) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMembers(sortedMembers.slice(0, 3));
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  const submitMembershipMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', data.firstName);
      formDataToSend.append('lastName', data.lastName);
      formDataToSend.append('email', data.email);
      formDataToSend.append('mobile', data.mobile);
      formDataToSend.append('interest', data.interest);
      if (data.image) {
        formDataToSend.append('image', data.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/membership`, {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) throw new Error("Failed to submit membership application");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your membership application has been submitted successfully!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        interest: "",
        image: null,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit membership application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitMembershipMutation.mutate(formData);
  };

  return (
    <MainLayout>
      <PageHero
        badge="Get Involved"
        title="Join Our Mission"
        subtitle="There are many ways to support our community. Find the opportunity that's right for you."
      />

      {/* Ways to Help */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-warm rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-warm-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-warm-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Volunteer</h3>
              <p className="text-muted-foreground mb-6">
                Share your time and talents to make a real difference in people's lives.
              </p>
              <Button asChild variant="outline">
                <a href="#volunteer">Learn More</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-safe rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-safe-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-safe-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Donate</h3>
              <p className="text-muted-foreground mb-6">
                Your financial support funds critical programs and services for our community.
              </p>
              <Button asChild variant="hero">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-hope rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-hope-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-hope-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Partner</h3>
              <p className="text-muted-foreground mb-6">
                Organizations can partner with us to expand our reach and impact.
              </p>
              <Button asChild variant="outline">
                <a href="#partner">Partner With Us</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>      

      {/* Volunteer Opportunities */}
      <section id="volunteer" className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Volunteer"
            title="Volunteer Opportunities"
            subtitle="Find the perfect way to contribute your skills and time"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {opportunity.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {opportunity.commitment}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Requirements:</p>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Members */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <SectionHeading
            badge="Community"
            title="Latest Members"
            subtitle="Meet our newest approved members joining the fight for equality."
          />

          {loadingMembers ? (
            <div className="py-16 text-center">
              <LGBTLoading message="Loading members..." size="lg" variant="pride" />
            </div>
          ) : members.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold">No Members Yet</h3>
              <p className="text-muted-foreground mt-2">Check back soon for our latest members.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div className="relative bg-card rounded-2xl border border-border pt-16 pb-6 px-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 mt-[50px]">
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
                              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {member.firstName} {member.lastName}
                    </h3>
                    {member.position && (
                      <p className="text-sm font-medium text-primary mt-1">{member.position}</p>
                    )}
                    <div className="my-4 h-px bg-border" />
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">{member.email}</span>
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

      {/* Membership Form */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl">
          <SectionHeading
            badge="Join Us"
            title="Become a Member"
            subtitle="Join our community and stay connected with events, resources, and opportunities."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                Mobile Number
              </label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                I'm interested in...
              </label>
              <Textarea
                id="interest"
                name="interest"
                placeholder="Tell us how you'd like to get involved or what programs interest you"
                rows={4}
                value={formData.interest}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                Profile Image (Optional)
              </label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload a profile image (max 5MB, JPG/PNG/GIF only)
              </p>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={submitMembershipMutation.isPending}
            >
              {submitMembershipMutation.isPending ? "Submitting..." : "Submit Application"}
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="section-padding bg-foreground text-background">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-sm font-medium mb-6">
              Partnership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Partner With Us
            </h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto mb-8">
              We partner with businesses, foundations, and organizations who share our 
              commitment to LGBTQIA+ equality. Together, we can create lasting change.
            </p>
            <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Contact for Partnership</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default GetInvolved;
