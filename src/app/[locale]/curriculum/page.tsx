import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.curriculum" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function CurriculumPage() {
  const t = await getTranslations("CurriculumPage");

  return (
    <main className="min-h-screen  py-10 print:bg-white print:py-0">
      <div className="mx-auto w-full max-w-204 bg-white shadow-lg print:shadow-none font-sans text-gray-900 text-[13px] leading-relaxed px-14 py-12">

        {/* ── ENCABEZADO ── */}
        <header className="mb-5 border-b-2 border-gray-900 pb-3">
          <h1 className="text-3xl font-bold tracking-tight uppercase">{t("header.name")}</h1>
          <p className="text-sm font-semibold text-gray-600 mt-0.5">{t("header.role")}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-700">
            <a href="mailto:danidevcol@gmail.com" className="hover:underline" target="_blank" rel="noopener noreferrer">📧 danidevcol@gmail.com</a>
            <a href="https://wa.me/573001234567" className="hover:underline" target="_blank" rel="noopener noreferrer">📞 {t("header.contacts.whatsapp")}</a>
            <a href="https://linkedin.com/in/danielperez" className="hover:underline" target="_blank" rel="noopener noreferrer">🌐 {t("header.contacts.linkedin")}</a>
            <a href="https://github.com/DaniP-Dev" className="hover:underline" target="_blank" rel="noopener noreferrer">📍 {t("header.contacts.github")}</a>
          </div>
        </header>

        {/* ── PERFIL PROFESIONAL ── */}
        <Section title={t("sections.profile") }>
          <p className="text-justify">
            {t("profile.text")}
          </p>
        </Section>

        {/* ── EXPERIENCIA LABORAL ── */}
        <Section title={t("sections.experience") }>
          <ExperienceItem
            company={t("experience.servicrep.company")}
            role={t("experience.servicrep.role")}
            date={t("experience.servicrep.date")}
            location={t("experience.servicrep.location")}
            bullets={[
              t("experience.servicrep.bullets.b1"),
              t("experience.servicrep.bullets.b2"),
              t("experience.servicrep.bullets.b3"),
              t("experience.servicrep.bullets.b4"),
            ]}
          />
          <ExperienceItem
            company={t("experience.oasix.company")}
            role={t("experience.oasix.role")}
            date={t("experience.oasix.date")}
            location={t("experience.oasix.location")}
            bullets={[
              t("experience.oasix.bullets.b1"),
              t("experience.oasix.bullets.b2"),
            ]}
          />
          <ExperienceItem
            company={t("experience.freelance.company")}
            role={t("experience.freelance.role")}
            date={t("experience.freelance.date")}
            location={t("experience.freelance.location")}
            bullets={[
              t("experience.freelance.bullets.b1"),
              t("experience.freelance.bullets.b2"),
              t("experience.freelance.bullets.b3"),
              t("experience.freelance.bullets.b4"),
              t("experience.freelance.bullets.b5")
            ]}
          />
        </Section>

        {/* ── EDUCACIÓN ── */}
        <Section title={t("sections.education") }>
          <EducationItem
            title={t("education.degree1.title")}
            institution={t("education.degree1.institution")}
            date={t("education.degree1.date")}
          />
          <EducationItem
            title={t("education.degree2.title")}
            institution={t("education.degree2.institution")}
            date={t("education.degree2.date")}
          />
        </Section>

        {/* ── HABILIDADES ── */}
        <Section title={t("sections.skills") }>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <SkillGroup label={t("skills.frontend.label")} skills={t("skills.frontend.items")} />
            <SkillGroup label={t("skills.backend.label")} skills={t("skills.backend.items")} />
            <SkillGroup label={t("skills.databases.label")} skills={t("skills.databases.items")} />
            <SkillGroup label={t("skills.tools.label")} skills={t("skills.tools.items")} />
          </div>
        </Section>

        {/* ── IDIOMAS ── */}
        <Section title={t("sections.languages") }>
          <div className="flex gap-10">
            <span><strong>{t("languages.spanish.label")}:</strong> {t("languages.spanish.level")}</span>
            <span><strong>{t("languages.english.label")}:</strong> {t("languages.english.level")}</span>
          </div>
        </Section>

        {/* ── PROYECTOS ── */}
        <Section title={t("sections.projects") }>
          <ProjectItem
            name={t("projects.certificates.name")}
            tech={t("projects.certificates.tech")}
            description={t("projects.certificates.description")}
          />
          <ProjectItem
            name={t("projects.iso.name")}
            tech={t("projects.iso.tech")}
            description={t("projects.iso.description")}
          />
        </Section>

      </div>
    </main>
  );
}

/* ── Componentes auxiliares ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExperienceItem({
  company, role, date, location, bullets,
}: {
  company: string; role: string; date: string; location: string; bullets: string[];
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <p className="font-bold text-[13px]">{company}</p>
        <p className="text-xs text-gray-600 shrink-0 ml-4">{date}</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="italic text-[12px] text-gray-700">{role}</p>
        <p className="text-xs text-gray-500 shrink-0 ml-4">{location}</p>
      </div>
      <ul className="mt-1 ml-4 list-disc space-y-0.5">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function EducationItem({ title, institution, date }: { title: string; institution: string; date: string }) {
  return (
    <div className="flex justify-between items-baseline mb-1.5">
      <div>
        <span className="font-bold">{title}</span>
        <span className="text-gray-600"> — {institution}</span>
      </div>
      <span className="text-xs text-gray-600 shrink-0 ml-4">{date}</span>
    </div>
  );
}

function SkillGroup({ label, skills }: { label: string; skills: string }) {
  return (
    <p><span className="font-semibold">{label}:</span> {skills}</p>
  );
}

function ProjectItem({ name, tech, description }: { name: string; tech: string; description: string }) {
  return (
    <div className="mb-2">
      <div className="flex gap-2 items-baseline">
        <span className="font-bold">{name}</span>
        <span className="text-xs text-gray-500 italic">({tech})</span>
      </div>
      <p className="ml-4">{description}</p>
    </div>
  );
}
