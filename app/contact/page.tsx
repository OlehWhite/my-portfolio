import MainLayout from "@/layouts/MainLayout";
import { ENavLinks } from "@/types/nav.types";
import ContactForm from "@/components/contact/ContactForm";
import Link from "next/link";

const CV_PATH = "/files/CV_Bilostotskyi_Oleh_Front_End_React_2026.pdf";

const ContactPage = () => {
  return (
    <MainLayout page={ENavLinks.CONTACT}>
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-semibold text-light mb-2">
          Contact
        </h1>
        <p className="text-secondary text-base md:text-lg mb-10">
          Get in touch or send your project details
        </p>

        <div className="flex flex-col gap-10 lg:gap-14 xl:flex-row xl:items-start">
          {/* Left: contact info + form */}
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            <div className="rounded-2xl border border-secondary/20 bg-[#001a2e] p-6 md:p-8">
              <h2 className="text-lg font-semibold text-light mb-4">
                Reach me directly
              </h2>
              <ul className="space-y-4">
                <li>
                  <span className="text-secondary text-sm block mb-0.5">Email</span>
                  <a
                    href="mailto:oleg220298d@gmail.com"
                    className="text-primary hover:underline text-lg"
                  >
                    oleg220298d@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-secondary text-sm block mb-0.5">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/oleh-bilostotskyi-a535a921b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-lg"
                  >
                    Oleh Bilostotskyi
                  </a>
                </li>
                <li>
                  <span className="text-secondary text-sm block mb-0.5">CV</span>
                  <Link
                    href={CV_PATH}
                    download
                    className="text-primary hover:underline text-lg inline-flex items-center gap-1"
                  >
                    Download CV
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-secondary/20 bg-[#001a2e] p-6 md:p-8">
              <h2 className="text-lg font-semibold text-light mb-5">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Right: CV preview */}
          <div className="xl:w-[480px] xl:shrink-0">
            <div className="rounded-2xl border border-secondary/20 bg-[#001a2e] p-4 overflow-hidden sticky top-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-light m-0">CV preview</h2>
                <Link
                  href={CV_PATH}
                  download
                  className="text-sm text-primary hover:underline"
                >
                  Download
                </Link>
              </div>
              <iframe
                src={CV_PATH}
                title="CV preview"
                className="w-full h-[500px] md:h-[600px] rounded-lg border border-white/10 bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage;
