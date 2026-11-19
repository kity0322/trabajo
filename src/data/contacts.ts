export interface CanalContacto {
  id: 'correo' | 'whatsapp' | 'facebook' | 'instagram' | 'tiktok'
  nombre: string
  subtitulo: string
  valor: string
  descripcion: string
  url: string
  accionTexto: string
  color: string
  badge: string
}

export const canalesContacto: CanalContacto[] = [
  {
    id: 'correo',
    nombre: 'Correo Electrónico',
    subtitulo: 'Atención e Información',
    valor: 'sasimpulsar@gmail.com',
    descripcion: 'Escríbenos para resolver dudas sobre los simulacros Saber 11, convenios con colegios o soporte de la plataforma.',
    url: 'mailto:sasimpulsar@gmail.com',
    accionTexto: 'Enviar correo',
    color: 'from-navy-800 to-navy-950',
    badge: 'Atención oficial',
  },
  {
    id: 'whatsapp',
    nombre: 'WhatsApp',
    subtitulo: 'Chat directo y asesoría rápida',
    valor: '+57 316 581 1216',
    descripcion: 'Comunícate en tiempo real para recibir orientación personalizada sobre planes y preparación Pre-ICFES.',
    url: 'https://wa.me/573165811216?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20ImpulsarSaber',
    accionTexto: 'Abrir WhatsApp',
    color: 'from-emerald-600 to-emerald-800',
    badge: 'En línea',
  },
  {
    id: 'instagram',
    nombre: 'Instagram',
    subtitulo: 'Historias, tips y novedades',
    valor: '@impulsarsas_educacion',
    descripcion: 'Encuentra infografías de estudio, fechas clave del ICFES, reels pedagógicos y novedades diarias.',
    url: 'https://instagram.com/impulsarsas_educacion',
    accionTexto: 'Seguir en Instagram',
    color: 'from-pink-600 via-purple-600 to-amber-500',
    badge: 'Comunidad',
  },
  {
    id: 'facebook',
    nombre: 'Facebook',
    subtitulo: 'Página oficial y comunidad',
    valor: 'ImpulsarSAS Saber 11',
    descripcion: 'Sigue nuestras noticias, avisos clave del ICFES, eventos pedagógicos y transmisiones en directo.',
    url: 'https://facebook.com/ImpulsarSASEducacion',
    accionTexto: 'Visitar Facebook',
    color: 'from-blue-600 to-blue-800',
    badge: 'Comunidad',
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    subtitulo: 'Tips rápidos y retos ICFES',
    valor: '@impulsarsaber',
    descripcion: 'Aprende con videos dinámicos, trucos para responder preguntas difíciles y técnicas de estudio.',
    url: 'https://tiktok.com/@impulsarsaber',
    accionTexto: 'Ver videos en TikTok',
    color: 'from-neutral-900 to-neutral-950',
    badge: 'Tips & Videos',
  },
]
