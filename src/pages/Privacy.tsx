import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";

const Privacy = () => {
  return (
    <MainLayout>
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Introduction
                </h2>
                <p>
                  PrideConnect ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard 
                  your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="mb-4">We may collect information about you in various ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Personal Data:</strong> Name, email address, 
                    phone number, and other contact information you voluntarily provide.
                  </li>
                  <li>
                    <strong className="text-foreground">Usage Data:</strong> Information about how 
                    you use our website, including pages visited and time spent.
                  </li>
                  <li>
                    <strong className="text-foreground">Communication Data:</strong> Records of 
                    correspondence when you contact us.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To respond to your inquiries and requests</li>
                  <li>To send newsletters and updates (with your consent)</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security measures to 
                  protect your personal information. However, no method of transmission over 
                  the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Your Rights
                </h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Confidentiality for Service Users
                </h2>
                <p>
                  We take extra care to protect the confidentiality of individuals using our 
                  support services. Information shared during counseling, support groups, or 
                  crisis intervention is kept strictly confidential, except where disclosure 
                  is required by law or necessary to prevent harm.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Email:</strong> privacy@prideconnect.org<br />
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

export default Privacy;
