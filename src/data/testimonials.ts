export interface Testimonial {
  quote: string
  author: string
  company: string
  role: string
  profile: string
  metric: string
}

export const testimonials: Testimonial[] = [
  // Floreciente
  {
    quote: "Después de implementar las recomendaciones de PULSO-H, mantuvimos nuestro alto nivel de bienestar y redujimos el ausentismo en un 15%.",
    author: "María González",
    company: "TechCorp México",
    role: "Directora de RRHH",
    profile: "Floreciente",
    metric: "-15% ausentismo",
  },
  {
    quote: "El diagnóstico nos ayudó a identificar áreas de mejora antes de que se convirtieran en problemas. Nuestro equipo está más comprometido que nunca.",
    author: "Carlos Mendoza",
    company: "Innovación Digital",
    role: "CEO",
    profile: "Floreciente",
    metric: "+20% productividad",
  },
  
  // Estable
  {
    quote: "PULSO-H nos dio insights valiosos sobre el balance trabajo-vida de nuestro equipo. Implementamos políticas de flexibilidad que mejoraron la satisfacción.",
    author: "Ana López",
    company: "Consultores Asociados",
    role: "Gerente de Talento",
    profile: "Estable",
    metric: "+25% satisfacción",
  },
  {
    quote: "Gracias al diagnóstico, pudimos crear programas de bienestar personalizados. Nuestros empleados se sienten más valorados.",
    author: "Roberto Sánchez",
    company: "Finanzas Integrales",
    role: "Director de Operaciones",
    profile: "Estable",
    metric: "-10% rotación",
  },
  
  // Resiliente
  {
    quote: "Aunque enfrentábamos momentos de estrés, PULSO-H nos mostró cómo fortalecer la resiliencia de nuestro equipo. Los resultados fueron sorprendentes.",
    author: "Diana Herrera",
    company: "Salud Total",
    role: "Coordinadora de Bienestar",
    profile: "Resiliente",
    metric: "+30% resiliencia",
  },
  {
    quote: "Las intervenciones sugeridas nos ayudaron a crear un ambiente más saludable. Nuestro equipo ahora maneja mejor la presión.",
    author: "Luis Torres",
    company: "Manufacturas del Norte",
    role: "Jefe de Planta",
    profile: "Resiliente",
    metric: "-20% accidentes",
  },
  
  // Requete
  {
    quote: "El diagnóstico nos alertó sobre riesgos que no veíamos. Implementamos cambios inmediatos y evitamos una crisis mayor.",
    author: "Patricia Ruiz",
    company: "Servicios Globales",
    role: "Directora de RRHH",
    profile: "Requete",
    metric: "-35% riesgo psicosocial",
  },
  {
    quote: "PULSO-H fue nuestra señal de alerta. Con las recomendaciones, mejoramos la comunicación interna y redujimos el estrés significativamente.",
    author: "Fernando Castro",
    company: "Logística Express",
    role: "Gerente General",
    profile: "Requete",
    metric: "+40% comunicación",
  },
  
  // Sobrecargadx
  {
    quote: "Estábamos al borde del burnout como equipo. PULSO-H nos mostró el camino para recuperarnos y crear límites saludables.",
    author: "Carmen Vázquez",
    company: "Agencia Creativa",
    role: "Directora Creativa",
    profile: "Sobrecargadx",
    metric: "-50% horas extras",
  },
  {
    quote: "El diagnóstico fue duro pero necesario. Con ayuda profesional, transformamos nuestra cultura laboral y recuperamos el bienestar.",
    author: "Jorge Martínez",
    company: "Desarrollos Urbanos",
    role: "Gerente de Proyectos",
    profile: "Sobrecargadx",
    metric: "+60% bienestar",
  },
  
  // Funcional pero Frágil
  {
    quote: "Aunque parecíamos funcionar bien, PULSO-H reveló vulnerabilidades importantes. Las intervenciones tempranas nos salvaron de una crisis.",
    author: "Sofia Jiménez",
    company: "Consultoría Estratégica",
    role: "Socia",
    profile: "Funcional pero Frágil",
    metric: "-25% agotamiento",
  },
  {
    quote: "El diagnóstico nos ayudó a equilibrar el alto rendimiento con el cuidado personal. Nuestro equipo está más sostenible ahora.",
    author: "Andrés Flores",
    company: "FinTech Solutions",
    role: "CTO",
    profile: "Funcional pero Frágil",
    metric: "+35% sostenibilidad",
  },
]

export const getTestimonialsByProfile = (profileName: string): Testimonial[] => {
  return testimonials.filter(t => t.profile === profileName).slice(0, 2)
}

export default testimonials
