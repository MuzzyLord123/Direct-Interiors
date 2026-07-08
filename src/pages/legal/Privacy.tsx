import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const PROSE =
  "max-w-prose font-sans text-[1.02rem] font-light leading-relaxed text-graphite marker:text-brass " +
  "[&>*+*]:mt-5 " +
  "[&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-[1.6rem] [&>h2]:font-light [&>h2]:leading-snug [&>h2]:text-text-light " +
  "[&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 " +
  "[&_a]:font-normal [&_a]:text-brass [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-brass-light " +
  "[&_strong]:font-normal [&_strong]:text-text-light";

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy — Direct Interiors North West"
        description="How Direct Interiors North West collects, uses and protects the personal information you share when you enquire through this website."
        path="/privacy"
        image="about-us-parallax"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <PageHero
        size="compact"
        eyebrow="Legal"
        title="Privacy Policy"
        image="about-us-parallax"
        imageAlt="A completed Direct Interiors commercial interior fit-out"
        crumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy" }]}
      />

      <Section tone="light">
        {/* TODO(client): confirm data processors, retention periods and any analytics/cookies vendors with a solicitor before launch */}
        <Reveal>
          <div className={PROSE}>
            <p className="text-lg text-text-light">
              This policy explains how {site.legalName} collects, uses and protects the personal information you
              share with us when you enquire about our work or get in touch through this website.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite/70">Last updated: July 2026</p>

            <h2>Who we are</h2>
            <p>
              {site.legalName} is the data controller responsible for your personal information. You can reach us by
              email at <a href={`mailto:${site.email}`}>{site.email}</a>, by phone on{" "}
              <a href={site.phoneHref}>{site.phoneDisplay}</a>, or by post at {site.addressOneLine}.
            </p>

            <h2>The information we collect</h2>
            <p>
              We only collect the details you choose to give us. When you complete our enquiry form, we ask for
              your:
            </p>
            <ul>
              <li>Name</li>
              <li>Company or organisation (where relevant)</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Message and any project details you provide</li>
            </ul>
            <p>We do not ask for, or knowingly collect, any sensitive personal data through this site.</p>

            <h2>How we use it</h2>
            <p>
              We use the information you provide solely to respond to your enquiry — to answer your questions,
              arrange a site survey, and prepare a quotation for the work you have in mind. We will not use your
              details for unrelated marketing without your consent.
            </p>

            <h2>Our lawful basis</h2>
            <p>
              Under the UK GDPR, we rely on our <strong>legitimate interest</strong> in responding to enquiries
              about our services and, where you have actively chosen to contact us, on your{" "}
              <strong>consent</strong>. You are free to withdraw that consent at any time.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep your enquiry only for as long as we need it to respond to you and to meet any related business
              or legal obligations. When it is no longer needed, we securely delete it.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We do not sell your information. We share it only with members of our own team who need it to answer
              your enquiry, and with any trusted supplier that helps us run the website or reply to you — and then
              only to the extent required, and always on our instructions.
            </p>

            <h2>Your rights</h2>
            <p>Under UK data protection law you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Ask us to correct anything that is inaccurate</li>
              <li>Ask us to erase your information</li>
              <li>Object to how we are using it</li>
              <li>Complain to the Information Commissioner&rsquo;s Office (ICO), the UK data protection regulator</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details below.</p>

            <h2>Contact us</h2>
            <div className="space-y-2">
              <p>
                <strong>Email</strong> — <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <p>
                <strong>Phone</strong> — <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
              <p>
                <strong>Post</strong> — {site.addressOneLine}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <GoldRule className="mb-6" />
          <p className="font-sans font-light text-graphite">
            Questions about how we handle your data?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brass underline underline-offset-4 hover:text-brass-light"
            >
              Contact us
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
