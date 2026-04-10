import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { socialLinks } from "@/src/libs/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.curriculum" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "curriculum vitae",
      "CV developerr",
      "Full Stack Developer",
      "Next.js developer",
      "React developer",
      "TypeScript expert",
      "web developer resume"
    ]
  };
}

export default async function CurriculumPage() {
  const t = await getTranslations("CurriculumPage");

  return (
    <>
      <Script
        id="json-ld-resume"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Resume",
            "applicant": {
              "@type": "Person",
              "name": t("header.name"),
              "jobTitle": "Full Stack Developer",
              "url": "https://danidevcol.com"
            },
            "skills": [
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Firebase",
              "Node.js",
              "HTML",
              "CSS",
              "Git"
            ],
            "workExperience": [
              {
                "@type": "WorkPosition",
                "title": t("experience.servicrep.role"),
                "companyName": t("experience.servicrep.company"),
                "startDate": "2023-01-01",
                "currentlyEmployed": true
              },
              {
                "@type": "WorkPosition",
                "title": t("experience.oasix.role"),
                "companyName": t("experience.oasix.company"),
                "startDate": "2022-03-01",
                "endDate": "2022-12-31"
              }
            ]
          })
        }}
      />
      <main className="min-h-screen bg-gray-50 py-10 print:bg-white print:py-0">
        <div className="mx-auto w-[850px] bg-white shadow-xl print:shadow-none font-sans text-gray-800 text-[13.5px] leading-snug px-16 py-14">
          
          {/* ── ENCABEZADO ── */}
          <header className="mb-8 flex flex-col items-center">
            <h2 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">{t("header.role")}</h2>
            <h1 className="text-[42px] font-bold uppercase tracking-widest text-[#78A4B2] mt-0.5 leading-none">{t("header.name")}</h1>
            <p className="text-[14px] text-gray-800 mt-2 font-medium">{t("header.degree")}</p>
            
            <div className="flex w-full justify-between items-center mt-7 text-[13px] font-medium px-4">
              <a href={socialLinks.whatsapp} className="flex items-center gap-2 hover:opacity-80 text-[#78A4B2]" target="_blank" rel="noopener noreferrer">
                <WhatsappIcon />
                <span className="underline">+57 3016328564</span>
              </a>
              <div className="flex gap-4 text-gray-800">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80"><LinkedinIcon /></a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80"><GithubIcon /></a>
              </div>
            </div>
          </header>

          {/* ── SOBRE MÍ ── */}
          <Section title={t("sections.profile")}>
            <p className="text-justify pt-1 text-[13.5px]">
              {t("profile.text")}
            </p>
          </Section>

          {/* ── COLUMNAS ── */}
          <div className="grid grid-cols-[40%_52%] justify-between gap-x-6 mt-8">
            
            {/* ── COLUMNA IZQUIERDA ── */}
            <div>
              <Section title={t("sections.training")}>
                <ul className="list-none space-y-1.5 mt-3">
                  <li className="flex"><Bullet/>{t("training.items.i1")}</li>
                  <li className="flex"><Bullet/>{t("training.items.i2")}</li>
                  <li className="flex"><Bullet/>{t("training.items.i3")}</li>
                  <li className="flex"><Bullet/>{t("training.items.i4")}</li>
                  <li className="flex"><Bullet/>{t("training.items.i5")}</li>
                </ul>
              </Section>
              
              <Section title={t("sections.languages")}>
                <ul className="list-none space-y-1.5 mt-3">
                  <li className="flex"><Bullet/>{t("languages.english.label")} {t("languages.english.level")}</li>
                  <li className="flex"><Bullet/>{t("languages.spanish.label")} {t("languages.spanish.level")}</li>
                </ul>
              </Section>

              <Section title={t("sections.skills")}>
                <ul className="list-none space-y-1.5 mt-3">
                  <li className="flex"><Bullet/>{t("skills.flatItems.i1")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i2")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i3")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i4")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i5")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i6")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i7")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i8")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i9")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i10")}</li>
                  <li className="flex"><Bullet/>{t("skills.flatItems.i11")}</li>
                </ul>
              </Section>

              <Section title={t("sections.hobbies")}>
                <div className="h-10 mt-2"></div>
              </Section>
            </div>

            {/* ── COLUMNA DERECHA ── */}
            <div>
              <Section title={t("sections.education")}>
                <div className="mt-3 text-[14px]">
                  <p className="font-bold">{t("education.degree1.institution")}</p>
                  <p className="mt-0.5">{t("education.degree1.title")}</p>
                  <p className="mt-0.5">{t("education.degree1.date")}</p>
                </div>
              </Section>

              <Section title={t("sections.experience")}>
                <div className="mt-4 mb-6">
                  <div className="text-[14px] leading-tight">
                    <p className="font-bold">{t("experience.freelance.company")}</p>
                    <p className="font-bold mt-1"><span className="text-[#78A4B2] underline">{t("experience.freelance.role")}</span>, {t("experience.freelance.date")}</p>
                  </div>
                  <ul className="list-none space-y-1.5 mt-3">
                    <li className="flex"><Bullet/>{t("experience.freelance.bullets.b1")}</li>
                    <li className="flex"><Bullet/>{t("experience.freelance.bullets.b2")}</li>
                    <li className="flex"><Bullet/>{t("experience.freelance.bullets.b3")}</li>
                    <li className="flex"><Bullet/>{t("experience.freelance.bullets.b4")}</li>
                    <li className="flex"><Bullet/>{t("experience.freelance.bullets.b5")}</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-[14px] leading-tight">
                    <p className="font-bold">{t("experience.oasix.company")}</p>
                    <p className="font-bold mt-1"><span className="text-[#78A4B2] underline">{t("experience.oasix.role")}</span> {t("experience.oasix.date")}</p>
                  </div>
                  <ul className="list-none space-y-1.5 mt-3">
                    <li className="flex"><Bullet/>{t("experience.oasix.bullets.b1")}</li>
                    <li className="flex"><Bullet/>{t("experience.oasix.bullets.b2")}</li>
                    <li className="flex"><Bullet/>{t("experience.oasix.bullets.b3")}</li>
                    <li className="flex"><Bullet/>{t("experience.oasix.bullets.b4")}</li>
                    <li className="flex"><Bullet/>{t("experience.oasix.bullets.b5")}</li>
                  </ul>
                </div>
              </Section>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

/* ── Componentes auxiliares ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="text-[#78A4B2] text-[17px] font-bold uppercase tracking-wide border-b-[2.5px] border-[#78A4B2] pb-1">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullet() {
  return <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#78A4B2] mt-[7px] mr-2.5 shrink-0 opacity-90"></span>;
}

function WhatsappIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  );
}

function GithubIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  );
}

