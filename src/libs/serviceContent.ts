export interface ServiceBenefit {
  title: string;
  titleEs?: string;
  titlePt?: string;
  titleAr?: string;
  description: string;
  descriptionEs?: string;
  descriptionPt?: string;
  descriptionAr?: string;
}

export interface ServiceProcess {
  step: string;
  stepEs?: string;
  stepPt?: string;
  stepAr?: string;
  description: string;
  descriptionEs?: string;
  descriptionPt?: string;
  descriptionAr?: string;
}

export interface ServiceContent {
  benefits: ServiceBenefit[];
  process: ServiceProcess[];
}

const benefitsEmojis = ["✨", "⚡", "🔒", "📈", "🎨", "🛠️"];

export const serviceContent: Record<string, ServiceContent> = {
  existingProjects: {
    benefits: [
      {
        title: "Performance Optimization",
        titleEs: "Optimización de Rendimiento",
        titlePt: "Otimização de Desempenho",
        titleAr: "تحسين الأداء",
        description: "Accelerate your app: faster loading, smoother execution. Result: more satisfied users.",
        descriptionEs: "Aceleramos tu app: carga más rápida, ejecuta más fluido. Resultado: usuarios más satisfechos.",
        descriptionPt: "Aceleramos sua app: carregamento mais rápido, execução mais fluida. Resultado: usuários mais satisfeitos.",
        descriptionAr: "نسرع تطبيقك: تحميل أسرع، تنفيذ أكثر سلاسة. النتيجة: مستخدمون أكثر رضا.",
      },
      {
        title: "Code Modernization",
        titleEs: "Modernización de Código",
        titlePt: "Modernização de Código",
        titleAr: "تحديث الكود",
        description: "Update obsolete technologies to modern, maintainable tools.",
        descriptionEs: "Actualizamos tecnologías obsoletas a herramientas modernas y mantenibles.",
        descriptionPt: "Atualizamos tecnologias obsoletas para ferramentas modernas e mantíveis.",
        descriptionAr: "نحدث التقنيات القديمة إلى أدوات حديثة وقابلة للصيانة.",
      },
      {
        title: "Security Enhancement",
        titleEs: "Mejora de Seguridad",
        titlePt: "Melhoria de Segurança",
        titleAr: "تحسين الأمان",
        description: "Implement current security standards to protect sensitive data.",
        descriptionEs: "Implementamos estándares de seguridad actuales para proteger datos sensibles.",
        descriptionPt: "Implementamos padrões de segurança atuais para proteger dados sensíveis.",
        descriptionAr: "نطبق معايير الأمان الحالية لحماية البيانات الحساسة.",
      },
      {
        title: "Scalability",
        titleEs: "Escalabilidad",
        titlePt: "Escalabilidade",
        titleAr: "القابلية للتوسع",
        description: "Prepare your application to grow without technical issues.",
        descriptionEs: "Preparamos tu aplicación para crecer sin problemas técnicos.",
        descriptionPt: "Preparamos sua aplicação para crescer sem problemas técnicos.",
        descriptionAr: "نجهز تطبيقك للنمو بدون مشاكل تقنية.",
      },
      {
        title: "Improved UX/UI",
        titleEs: "UX/UI Mejorado",
        titlePt: "UX/UI Melhorado",
        titleAr: "تجربة مستخدم محسنة",
        description: "Redesign the interface for better usability and intuitiveness.",
        descriptionEs: "Rediseñamos la interfaz para mejor usabilidad e intuitividad.",
        descriptionPt: "Redesenhamos a interface para melhor usabilidade e intuitividade.",
        descriptionAr: "نعيد تصميم الواجهة لسهولة الاستخدام والحدس.",
      },
      {
        title: "Technical Support",
        titleEs: "Soporte Técnico",
        titlePt: "Suporte Técnico",
        titleAr: "الدعم الفني",
        description: "Continuous support and quick problem resolution.",
        descriptionEs: "Acompañamiento continuo y solución rápida de problemas.",
        descriptionPt: "Acompanhamento contínuo e solução rápida de problemas.",
        descriptionAr: "متابعة مستمرة والحل السريع للمشاكل.",
      },
    ],
    process: [
      {
        step: "Audit",
        stepEs: "Auditoría",
        stepPt: "Auditoria",
        stepAr: "التدقيق",
        description: "We analyze your application in depth to identify areas for improvement.",
        descriptionEs: "Analizamos tu aplicación en profundidad para identificar áreas de mejora.",
        descriptionPt: "Analisamos sua aplicação em profundidade para identificar áreas de melhoria.",
        descriptionAr: "نحلل تطبيقك بعمق لتحديد مجالات التحسين.",
      },
      {
        step: "Planning",
        stepEs: "Planificación",
        stepPt: "Planejamento",
        stepAr: "التخطيط",
        description: "Create a detailed action plan with timeline and resources.",
        descriptionEs: "Creamos un plan de acción detallado con timeline y recursos.",
        descriptionPt: "Criamos um plano de ação detalhado com cronograma e recursos.",
        descriptionAr: "نعد خطة عمل مفصلة مع الجدول الزمني والموارد.",
      },
      {
        step: "Development",
        stepEs: "Desarrollo",
        stepPt: "Desenvolvimento",
        stepAr: "التطوير",
        description: "Implement improvements incrementally without affecting current operations.",
        descriptionEs: "Implementamos mejoras de forma incremental sin afectar la operación actual.",
        descriptionPt: "Implementamos melhorias de forma incremental sem afetar a operação atual.",
        descriptionAr: "نطبق التحسينات بشكل تدريجي دون التأثير على العملية الحالية.",
      },
      {
        step: "Testing",
        stepEs: "Testing",
        stepPt: "Testes",
        stepAr: "الاختبار",
        description: "Comprehensive testing to ensure stability and functionality.",
        descriptionEs: "Pruebas exhaustivas para garantizar estabilidad y funcionalidad.",
        descriptionPt: "Testes abrangentes para garantir estabilidade e funcionalidade.",
        descriptionAr: "اختبارات شاملة لضمان الاستقرار والوظائف.",
      },
      {
        step: "Deployment",
        stepEs: "Despliegue",
        stepPt: "Implantação",
        stepAr: "النشر",
        description: "Safe launch with continuous performance monitoring.",
        descriptionEs: "Lanzamiento seguro con monitoreo continuo del rendimiento.",
        descriptionPt: "Lançamento seguro com monitoramento contínuo do desempenho.",
        descriptionAr: "إطلاق آمن مع المراقبة المستمرة للأداء.",
      },
    ],
  },
  newProjects: {
    benefits: [
      {
        title: "Scalable Architecture",
        titleEs: "Arquitectura Escalable",
        titlePt: "Arquitetura Escalável",
        titleAr: "البنية الخوارزمية القابلة للتوسع",
        description: "We build on solid foundations that grow with your business.",
        descriptionEs: "Construimos sobre bases sólidas que crecen con tu negocio.",
        descriptionPt: "Construímos sobre fundações sólidas que crescem com seu negócio.",
        descriptionAr: "نبني على أسس صلبة التي تنمو مع عملك.",
      },
      {
        title: "Modern Technology",
        titleEs: "Tecnología Moderna",
        titlePt: "Tecnologia Moderna",
        titleAr: "التكنولوجيا الحديثة",
        description: "We use the latest generation frameworks and tools.",
        descriptionEs: "Usamos frameworks y herramientas de última generación.",
        descriptionPt: "Usamos frameworks e ferramentas de última geração.",
        descriptionAr: "نستخدم أحدث الأطر والأدوات.",
      },
      {
        title: "Responsive Design",
        titleEs: "Diseño Responsivo",
        titlePt: "Design Responsivo",
        titleAr: "التصميم المتجاوب",
        description: "Perfect experience on any device and screen size.",
        descriptionEs: "Experiencia perfecta en cualquier dispositivo y tamaño de pantalla.",
        descriptionPt: "Experiência perfeita em qualquer dispositivo e tamanho de tela.",
        descriptionAr: "تجربة مثالية على أي جهاز وحجم شاشة.",
      },
      {
        title: "SEO Optimized",
        titleEs: "Optimizado para SEO",
        titlePt: "Otimizado para SEO",
        titleAr: "محسّن لمحركات البحث",
        description: "Built from the start to appear in search engines.",
        descriptionEs: "Desde el inicio, construido para aparecer en buscadores.",
        descriptionPt: "Desde o início, construído para aparecer nos buscadores.",
        descriptionAr: "مبني من البداية للظهور في محركات البحث.",
      },
      {
        title: "Enterprise Security",
        titleEs: "Seguridad de Clase Empresarial",
        titlePt: "Segurança de Classe Empresarial",
        titleAr: "أمان على مستوى المؤسسة",
        description: "Maximum protection against vulnerabilities from code.",
        descriptionEs: "Protección máxima contra vulnerabilidades desde el código.",
        descriptionPt: "Proteção máxima contra vulnerabilidades desde o código.",
        descriptionAr: "أقصى حماية ضد الثغرات الأمنية من الكود.",
      },
      {
        title: "Maintenance Included",
        titleEs: "Mantenimiento Incluido",
        titlePt: "Manutenção Incluída",
        titleAr: "الصيانة المضمنة",
        description: "Post-launch support to ensure trouble-free operation.",
        descriptionEs: "Soporte post-lanzamiento para asegurar operación sin problemas.",
        descriptionPt: "Suporte pós-lançamento para garantir operação sem problemas.",
        descriptionAr: "الدعم بعد الإطلاق لضمان عملية خالية من المشاكل.",
      },
    ],
    process: [
      {
        step: "Consultation",
        stepEs: "Consultoría",
        stepPt: "Consultoria",
        stepAr: "الاستشارة",
        description: "We understand your vision, market, and business objectives.",
        descriptionEs: "Entendemos tu visión, mercado y objetivos comerciales.",
        descriptionPt: "Entendemos sua visão, mercado e objetivos comerciais.",
        descriptionAr: "نفهم رؤيتك والسوق والأهداف التجارية.",
      },
      {
        step: "Design",
        stepEs: "Diseño",
        stepPt: "Design",
        stepAr: "التصميم",
        description: "Create mockups and prototypes to validate concepts.",
        descriptionEs: "Creamos mockups y prototipos para validar conceptos.",
        descriptionPt: "Criamos mockups e protótipos para validar conceitos.",
        descriptionAr: "ننشئ نماذج أولية للتحقق من صحة المفاهيم.",
      },
      {
        step: "Development",
        stepEs: "Desarrollo",
        stepPt: "Desenvolvimento",
        stepAr: "التطوير",
        description: "Agile construction with incremental deliveries and feedback.",
        descriptionEs: "Construcción ágil con entregas incrementales y feedback.",
        descriptionPt: "Construção ágil com entregas incrementais e feedback.",
        descriptionAr: "البناء الرشيق مع التسليم الزيادي والتعليقات.",
      },
      {
        step: "Testing and QA",
        stepEs: "Testing y QA",
        stepPt: "Testes e QA",
        stepAr: "الاختبار ومراقبة الجودة",
        description: "Rigorous testing across browsers, devices, and use cases.",
        descriptionEs: "Pruebas rigurosas en navegadores, dispositivos y casos de uso.",
        descriptionPt: "Testes rigorosos em navegadores, dispositivos e casos de uso.",
        descriptionAr: "اختبارات صارمة عبر المتصفحات والأجهزة.",
      },
      {
        step: "Launch",
        stepEs: "Lanzamiento",
        stepPt: "Lançamento",
        stepAr: "الإطلاق",
        description: "Professional deployment with training and documentation.",
        descriptionEs: "Lanzamiento profesional con capacitación y documentación.",
        descriptionPt: "Lançamento profissional com treinamento e documentação.",
        descriptionAr: "النشر الاحترافي مع التدريب والتوثيق.",
      },
    ],
  },
};

export function getServiceBenefits(serviceKey: string, locale: string): Array<{ title: string; description: string }> {
  const content = serviceContent[serviceKey];
  if (!content) return [];
  
  return content.benefits.map((benefit) => {
    const localeKey = locale.toLowerCase();
    const titleKey = `title${capitalize(localeKey)}` as keyof typeof benefit;
    const descriptionKey = `description${capitalize(localeKey)}` as keyof typeof benefit;
    
    return {
      title: (benefit[titleKey] as string | undefined) || benefit.title,
      description: (benefit[descriptionKey] as string | undefined) || benefit.description,
    };
  });
}

export function getServiceProcess(serviceKey: string, locale: string): Array<{ step: string; description: string }> {
  const content = serviceContent[serviceKey];
  if (!content) return [];
  
  return content.process.map((item) => {
    const localeKey = locale.toLowerCase();
    const stepKey = `step${capitalize(localeKey)}` as keyof typeof item;
    const descriptionKey = `description${capitalize(localeKey)}` as keyof typeof item;
    
    return {
      step: (item[stepKey] as string | undefined) || item.step,
      description: (item[descriptionKey] as string | undefined) || item.description,
    };
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getBenefitEmoji(index: number): string {
  return benefitsEmojis[index] || "✨";
}
