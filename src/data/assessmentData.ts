import { AssessmentModule, AssessmentItem } from '../types/assessment'

// Module 1: Mi Energía (Agotamiento Emocional) - 6 items
const energiaItems: AssessmentItem[] = [
  { id: 'ae-1', moduleId: 'energia', text: 'Me siento emocionalmente agotado/a por mi trabajo' },
  { id: 'ae-2', moduleId: 'energia', text: 'Siento que trabajar todo el día me exige un gran esfuerzo' },
  { id: 'ae-3', moduleId: 'energia', text: 'Me siento frustrado/a por mi trabajo' },
  { id: 'ae-4', moduleId: 'energia', text: 'Siento que estoy al límite de mis posibilidades' },
  { id: 'ae-5', moduleId: 'energia', text: 'Me cuesta recuperarme después de la jornada laboral' },
  { id: 'ae-6', moduleId: 'energia', text: 'Siento que mi trabajo me consume emocionalmente' },
]

// Module 2: Mi Conexión (Despersonalización) - 5 items
const conexionItems: AssessmentItem[] = [
  { id: 'dp-1', moduleId: 'conexion', text: 'Siento que trato a algunas personas en el trabajo como si fueran objetos impersonales' },
  { id: 'dp-2', moduleId: 'conexion', text: 'He perdido interés en conectar genuinamente con mis colegas' },
  { id: 'dp-3', moduleId: 'conexion', text: 'Me he vuelto más cínico/a sobre si mi trabajo realmente importa' },
  { id: 'dp-4', moduleId: 'conexion', text: 'Dudo de la autenticidad de las relaciones en mi trabajo' },
  { id: 'dp-5', moduleId: 'conexion', text: 'Evito interactuar con colegas o clientes más de lo necesario' },
]

// Module 3: Mi Propósito (Realización Personal) - 6 items (reversed)
const propositoItems: AssessmentItem[] = [
  { id: 'rp-1', moduleId: 'proposito', text: 'Siento que puedo crear un clima agradable en mi trabajo', reversed: true },
  { id: 'rp-2', moduleId: 'proposito', text: 'Siento que consigo muchas cosas valiosas en este trabajo', reversed: true },
  { id: 'rp-3', moduleId: 'proposito', text: 'Me siento estimulado/a después de haber trabajado en algo importante', reversed: true },
  { id: 'rp-4', moduleId: 'proposito', text: 'Siento que mi trabajo tiene sentido y propósito', reversed: true },
  { id: 'rp-5', moduleId: 'proposito', text: 'Me siento competente/a en mi trabajo', reversed: true },
  { id: 'rp-6', moduleId: 'proposito', text: 'Siento que puedo influir positivamente en mi entorno laboral', reversed: true },
]

// Module 4: Mi Entorno (Factores Organizacionales) - 7 items
const entornoItems: AssessmentItem[] = [
  { id: 'for-1', moduleId: 'entorno', text: 'Mi carga de trabajo es excesiva' },
  { id: 'for-2', moduleId: 'entorno', text: 'Tengo claridad sobre mis roles y responsabilidades' },
  { id: 'for-3', moduleId: 'entorno', text: 'Mi líder directo me apoya en mi desarrollo' },
  { id: 'for-4', moduleId: 'entorno', text: 'Existen comportamientos de violencia o acoso en mi trabajo' },
  { id: 'for-5', moduleId: 'entorno', text: 'Mi trabajo es reconocido y valorado' },
  { id: 'for-6', moduleId: 'entorno', text: 'Tengo control sobre cómo realizo mi trabajo' },
  { id: 'for-7', moduleId: 'entorno', text: 'Puedo tomar descansos cuando los necesito' },
]

// Module 5: Mi Equilibrio (Conciliación Vida-Trabajo) - 6 items
const equilibrioItems: AssessmentItem[] = [
  { id: 'cvt-1', moduleId: 'equilibrio', text: 'Puedo dedicar tiempo suficiente a mi vida personal y familia' },
  { id: 'cvt-2', moduleId: 'equilibrio', text: 'Mi trabajo interfere con mis responsabilidades personales' },
  { id: 'cvt-3', moduleId: 'equilibrio', text: 'Tengo flexibilidad para manejar asuntos personales durante la jornada' },
  { id: 'cvt-4', moduleId: 'equilibrio', text: 'Puedo desconectarme del trabajo después de mi jornada' },
  { id: 'cvt-5', moduleId: 'equilibrio', text: 'Mi horario de trabajo me permite tener una vida social satisfactoria' },
  { id: 'cvt-6', moduleId: 'equilibrio', text: 'Siento que tengo balance entre trabajo y vida personal' },
]

// Module 6: Mi Fortaleza (Resiliencia) - 6 items
const fortalezaItems: AssessmentItem[] = [
  { id: 'rri-1', moduleId: 'fortaleza', text: 'Tengo personas en mi entorno que me apoyan cuando lo necesito' },
  { id: 'rri-2', moduleId: 'fortaleza', text: 'Practico hábitos de autocuidado regularmente' },
  { id: 'rri-3', moduleId: 'fortaleza', text: 'Puedo recuperarme rápidamente de situaciones estresantes' },
  { id: 'rri-4', moduleId: 'fortaleza', text: 'Tengo una visión positiva de mi futuro profesional' },
  { id: 'rri-5', moduleId: 'fortaleza', text: 'Puedo adaptarme a cambios inesperados en el trabajo' },
  { id: 'rri-6', moduleId: 'fortaleza', text: 'Siento que tengo recursos para afrontar los desafíos laborales' },
]

// All modules
export const assessmentModules: AssessmentModule[] = [
  {
    id: 'energia',
    title: 'Mi Energía',
    description: 'Evalúa tu nivel de agotamiento emocional y cansancio laboral',
    items: energiaItems,
    color: '#c53030',
    icon: 'battery',
  },
  {
    id: 'conexion',
    title: 'Mi Conexión',
    description: 'Mide tu nivel de conexión y cinismo hacia el trabajo',
    items: conexionItems,
    color: '#dd6b20',
    icon: 'users',
  },
  {
    id: 'proposito',
    title: 'Mi Propósito',
    description: 'Evalúa tu sentido de realización y propósito laboral',
    items: propositoItems,
    color: '#38a169',
    icon: 'target',
  },
  {
    id: 'entorno',
    title: 'Mi Entorno',
    description: 'Analiza los factores organizacionales que afectan tu bienestar',
    items: entornoItems,
    color: '#3182ce',
    icon: 'building',
  },
  {
    id: 'equilibrio',
    title: 'Mi Equilibrio',
    description: 'Mide tu balance entre vida personal y trabajo',
    items: equilibrioItems,
    color: '#805ad5',
    icon: 'scale',
  },
  {
    id: 'fortaleza',
    title: 'Mi Fortaleza',
    description: 'Evalúa tus recursos de resiliencia y recuperación',
    items: fortalezaItems,
    color: '#319795',
    icon: 'shield',
  },
]

// All items flattened
export const allAssessmentItems: AssessmentItem[] = [
  ...energiaItems,
  ...conexionItems,
  ...propositoItems,
  ...entornoItems,
  ...equilibrioItems,
  ...fortalezaItems,
]

// Get items by module
export const getItemsByModule = (moduleId: string): AssessmentItem[] => {
  return allAssessmentItems.filter(item => item.moduleId === moduleId)
}

// Total item count
export const TOTAL_ITEMS = allAssessmentItems.length
