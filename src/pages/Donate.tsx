import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, CheckCircle, CreditCard } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const donationAmounts = [1075, 2150, 4350, 10750, 21500];

const impactItems = [
  { amount: "₹1075", impact: "Provides crisis support for one person" },
  { amount: "₹2150", impact: "Funds a mental health counseling session" },
  { amount: "₹4350", impact: "Supports a youth mentorship program for a month" },
  { amount: "₹10750", impact: "Covers legal consultation for name change" },
  { amount: "₹21500", impact: "Sponsors a community event" },
];

const Donate = () => {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const displayAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  return (
    <MainLayout>
      <PageHero
        badge="Support Us"
        title="Make a Difference Today"
        subtitle="Your generous donation helps us provide vital services to the LGBTQIA+ community."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 border border-border">
                {/* Donation Type Toggle */}
                <div className="flex bg-muted rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={cn(
                      "flex-1 py-3 rounded-lg font-medium transition-colors",
                      donationType === "one-time"
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground"
                    )}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={cn(
                      "flex-1 py-3 rounded-lg font-medium transition-colors",
                      donationType === "monthly"
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground"
                    )}
                  >
                    Monthly
                  </button>
                </div>

                {/* Amount Selection */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={cn(
                        "py-4 rounded-xl font-semibold transition-all",
                        selectedAmount === amount
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      )}
                    >
                      ₹{amount}
                    </button>
                  ))}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      placeholder="Other"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className={cn(
                        "pl-8 h-full",
                        customAmount && "border-primary"
                      )}
                    />
                  </div>
                </div>

                {donationType === "monthly" && displayAmount > 0 && (
                  <p className="text-sm text-muted-foreground mb-6">
                    You'll be charged ₹{displayAmount} monthly. Cancel anytime.
                  </p>
                )}

                {/* Form Fields */}
                <div className="space-y-4 mb-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                {/* Payment (Mock UI) */}
                <div className="border border-border rounded-xl p-6 mb-6 bg-muted/30">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Payment Details</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Payment processing is not enabled in this demo. In production, this would integrate with a payment provider.
                  </p>
                </div>

                <Button variant="hero" size="xl" className="w-full">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate {displayAmount > 0 ? `₹${displayAmount}` : ""}
                  {donationType === "monthly" ? " Monthly" : ""}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  Secure donation powered by industry-standard encryption
                </div>
              </div>
            </motion.div>

            {/* Impact & Trust */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Impact */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Your Impact
                </h2>
                <div className="space-y-4">
                  {impactItems.map((item, index) => (
                    <motion.div
                      key={item.amount}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl"
                    >
                      <div className="w-16 font-display font-bold text-primary">
                        {item.amount}
                      </div>
                      <p className="text-muted-foreground">{item.impact}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div className="bg-safe rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Transparency & Trust
                </h3>
                <ul className="space-y-3">
                  {[
                    "501(c)(3) nonprofit organization",
                    "85% of donations go directly to programs",
                    "Annual reports available to donors",
                    "Independent financial audits",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Ways */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Other Ways to Give
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Workplace giving programs</li>
                  <li>• Donor-advised funds</li>
                  <li>• Stock donations</li>
                  <li>• Legacy/planned giving</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Contact us at donations@prideconnect.org for more options.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Donate;
