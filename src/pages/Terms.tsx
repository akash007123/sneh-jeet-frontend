import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";

const Terms = () => {
  return (
    <MainLayout>
      <PageHero
        badge="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the PrideConnect website and services, you accept 
                  and agree to be bound by the terms and provisions of this agreement. If 
                  you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Use of Services
                </h2>
                <p className="mb-4">Our services are intended to provide:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Information and resources for the LGBTQIA+ community</li>
                  <li>Support services including counseling and crisis intervention</li>
                  <li>Community programs and events</li>
                  <li>Educational materials and workshops</li>
                </ul>
                <p className="mt-4">
                  You agree to use our services only for lawful purposes and in a way that 
                  does not infringe on the rights of others or restrict their use of the services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Not Medical or Legal Advice
                </h2>
                <p>
                  The information provided through our website and services is for general 
                  informational purposes only. It should not be considered as medical, legal, 
                  or professional advice. Always seek the guidance of qualified professionals 
                  for specific concerns.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Crisis Services
                </h2>
                <p>
                  While we offer crisis support services, in life-threatening emergencies, 
                  please call emergency services (911) immediately. Our crisis line is a 
                  supplementary support resource and not a replacement for emergency services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  User Conduct
                </h2>
                <p className="mb-4">When using our services, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Harass, intimidate, or threaten other users or staff</li>
                  <li>Post or share discriminatory, hateful, or offensive content</li>
                  <li>Impersonate others or misrepresent your identity</li>
                  <li>Share confidential information about other service users</li>
                  <li>Attempt to disrupt or interfere with our services</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Donations
                </h2>
                <p>
                  Donations to PrideConnect are voluntary and non-refundable. As a 501(c)(3) 
                  nonprofit organization, donations may be tax-deductible to the extent 
                  permitted by law. Please consult your tax advisor for guidance.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, 
                  is the property of PrideConnect and is protected by copyright and other 
                  intellectual property laws. You may not reproduce, distribute, or create 
                  derivative works without our express permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Limitation of Liability
                </h2>
                <p>
                  PrideConnect shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages resulting from your use of or inability 
                  to use our services, even if we have been advised of the possibility of 
                  such damages.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of 
                  our services after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <p>
                  For questions about these Terms & Conditions, please contact us at:
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Email:</strong> legal@prideconnect.org<br />
                  <strong className="text-foreground">Address:</strong> 123 Rainbow Street, Pride City, PC 12345
                </p>
              </section>

              <section>
                <p className="text-sm">
                  <em>Last updated: January 2025</em>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Terms;
