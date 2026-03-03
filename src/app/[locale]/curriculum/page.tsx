// app/curriculum/page.tsx

export default function CurriculumPage() {
  return (
    <main className="min-h-screen  py-10 print:bg-white print:py-0">
      <div className="mx-auto w-full max-w-204 bg-white shadow-lg print:shadow-none font-sans text-gray-900 text-[13px] leading-relaxed px-14 py-12">

        {/* ── ENCABEZADO ── */}
        <header className="mb-5 border-b-2 border-gray-900 pb-3">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Daniel Pérez Guzman</h1>
          <p className="text-sm font-semibold text-gray-600 mt-0.5">Desarrollador Full Stack | Next.js · React · TypeScript</p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-700">
            <a href="mailto:danidevcol@gmail.com" className="hover:underline" target="_blank" rel="noopener noreferrer">📧 danidevcol@gmail.com</a>
            <a href="https://wa.me/573001234567" className="hover:underline" target="_blank" rel="noopener noreferrer">📞 WhatsApp</a>
            <a href="https://linkedin.com/in/danielperez" className="hover:underline" target="_blank" rel="noopener noreferrer">🌐 linkedin.com/in/danielperez</a>
            <a href="https://github.com/danidevcol" className="hover:underline" target="_blank" rel="noopener noreferrer">📍 github.com/danidevcol</a>
          </div>
        </header>

        {/* ── PERFIL PROFESIONAL ── */}
        <Section title="Perfil Profesional">
          <p className="text-justify">
            Desarrollador Full Stack con más de 3 años impulsando la eficiencia y la optimización de procesos mediante aplicaciones web robustas en Next.js, React y TypeScript.
            Experto en sistemas de gestión documental y automatización con Google Sheets, facilitando la toma de decisiones y el control operativo. Destaco por diseñar interfaces intuitivas con Tailwind CSS que mejoran la experiencia de usuario y la productividad del equipo.
            Capacidad para liderar proyectos desde la arquitectura hasta el despliegue, generando soluciones que potencian el crecimiento y la competitividad empresarial.
          </p>
        </Section>

        {/* ── EXPERIENCIA LABORAL ── */}
        <Section title="Experiencia Laboral">
          <ExperienceItem
            company="Servicrep"
            role="Fundador y Desarrollador Full Stack"
            date="Ene 2023 – Presente"
            location="Soledad, Atlántico"
            bullets={[
              "Desarrollé sistema de gestión de inspecciones y certificaciones para estaciones de servicio EDS, optimizando el flujo de trabajo y la trazabilidad de procesos.",
              "Implementé validación de certificados mediante códigos QR, agilizando la verificación y fortaleciendo la confianza en los servicios ofrecidos.",
              "Integré Google Sheets como base de datos intermedia, facilitando el análisis y seguimiento de reportes para una toma de decisiones más efectiva.",
              "Diseñé sistema de plantillas PDF para certificados, asegurando consistencia institucional y mejorando la presentación ante clientes y entes reguladores.",
            ]}
          />
          <ExperienceItem
            company="Oasix"
            role="Desarrollador Web Freelance"
            date="Mar 2022 – Dic 2022"
            location="Remoto"
            bullets={[
              "Construí interfaces responsivas con React y Tailwind CSS, mejorando la interacción y satisfacción de los usuarios finales.",
              "Desarrollé integraciones con APIs REST y optimicé el rendimiento de aplicaciones, contribuyendo a la continuidad operativa y la escalabilidad de los proyectos de clientes.",
            ]}
          />
          <ExperienceItem
            company="Freelance Web Developer"
            role="Desarrollador Web Independiente"
            date="2021 – Presente"
            location="Remoto"
            bullets={[
              "Desarrollo y mantenimiento de sitios web y pequeñas web apps para clientes diversos.",
              "Despliegue en producción utilizando cPanel y Vercel, asegurando disponibilidad y estabilidad de los proyectos.",
              "Configuración de dominios personalizados para mejorar la presencia digital de los clientes.",
              "Implementación de SEO básico y optimización de rendimiento para aumentar la visibilidad y eficiencia de los sitios.",
              "Elaboración de documentación técnica y soporte a clientes en entornos web, facilitando la gestión y el uso de las soluciones entregadas."
            ]}
          />
        </Section>

        {/* ── EDUCACIÓN ── */}
        <Section title="Formación Académica">
          <EducationItem
            title="Tecnólogo en Sistemas / Ingeniería de Sistemas"
            institution="Universidad del Atlántico"
            date="2018 – 2022"
          />
          <EducationItem
            title="Desarrollo Web Full Stack"
            institution="Platzi"
            date="2021 – Presente"
          />
        </Section>

        {/* ── HABILIDADES ── */}
        <Section title="Habilidades Técnicas">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <SkillGroup label="Frontend" skills="Next.js, React, TypeScript, Tailwind CSS" />
            <SkillGroup label="Backend" skills="FastAPI, Laravel, Node.js, REST APIs" />
            <SkillGroup label="Bases de datos" skills="PostgreSQL, MySQL, Google Sheets" />
            <SkillGroup label="Herramientas" skills="Git, VS Code, Figma, Vercel" />
          </div>
        </Section>

        {/* ── IDIOMAS ── */}
        <Section title="Idiomas">
          <div className="flex gap-10">
            <span><strong>Español:</strong> Nativo</span>
            <span><strong>Inglés:</strong> Intermedio (B1)</span>
          </div>
        </Section>

        {/* ── PROYECTOS ── */}
        <Section title="Proyectos Destacados">
          <ProjectItem
            name="Sistema de Certificados EDS"
            tech="Next.js · Google Sheets · QR Code"
            description="Plataforma web para emisión, gestión y validación de certificados de inspección, que optimiza procesos internos y fortalece la reputación de la empresa ante clientes y entes reguladores. Incluye panel administrativo y portal público de verificación, facilitando el acceso y la transparencia."
          />
          <ProjectItem
            name="Portal de Gestión ISO 17020"
            tech="React · TypeScript · Tailwind CSS"
            description="Sistema de documentación y control de calidad para organismos de inspección, diseñado para mejorar la eficiencia operativa y el cumplimiento normativo, contribuyendo a la excelencia y diferenciación en el sector."
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
