import { Link, useLocation } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ClipboardList,
  LineChart as LineChartIcon,
  Sparkles,
  Target,
  Trophy,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { ContactSection } from '@/components/ContactSection'
import { areas } from '@/data/areas'
import { institucionesAliadasPorMunicipio } from '@/data/institutional'

const pasos = [
  {
    icon: ClipboardList,
    titulo: 'Elige tu simulacro',
    descripcion: 'Selecciona el área y la dificultad según lo que necesites reforzar.',
  },
  {
    icon: Target,
    titulo: 'Preséntalo a tu ritmo',
    descripcion: 'Resuelve preguntas tipo ICFES con cronómetro y navegación libre entre ellas.',
  },
  {
    icon: LineChartIcon,
    titulo: 'Recibe tu análisis',
    descripcion: 'Descubre tu puntaje, tus fortalezas y un plan de estudio personalizado.',
  },
  {
    icon: Trophy,
    titulo: 'Mejora simulacro a simulacro',
    descripcion: 'Sigue tu evolución y compite contigo mismo hasta llegar a tu mejor versión.',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Landing() {
  const { pathname } = useLocation()
  const esInicio = pathname === '/'
  const esComoFunciona = pathname === '/como-funciona'
  const esInstituciones = pathname === '/instituciones'
  const esAreas = pathname === '/areas'
  const esContacto = pathname === '/contacto'

  return (
    <div className="min-h-screen bg-surface">
      <PublicNavbar />

      {/* Hero */}
      {esInicio && <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 via-navy-700 to-navy-600 pt-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 -top-24 h-96 w-96 animate-float rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute -right-24 top-40 h-96 w-96 animate-float rounded-full bg-wine-400 blur-3xl" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                ImpulsarSAS
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Prepárate para el <span className="text-gold-400">Pre-ICFES</span> y las Pruebas Saber 11 con confianza
              </h1>
              <p className="mt-6 max-w-xl text-lg text-navy-100">
                Simulacros ilimitados, retroalimentación inmediata y un plan de estudio hecho a tu medida.
                Miles de estudiantes colombianos ya están mejorando su puntaje con ImpulsarSaber.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/registro">
                    Regístrate gratis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-navy-800" asChild>
                  <Link to="/iniciar-sesion">Inicia sesión</Link>
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <p className="font-heading text-2xl font-bold text-white">+12.000</p>
                  <p className="text-sm text-navy-200">Estudiantes activos</p>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <p className="font-heading text-2xl font-bold text-white">+80</p>
                  <p className="text-sm text-navy-200">Instituciones aliadas</p>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <p className="font-heading text-2xl font-bold text-white">+40 pts</p>
                  <p className="text-sm text-navy-200">Mejora promedio</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <Card className="rotate-2 border-0 bg-white/95 p-2 shadow-2xl backdrop-blur">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-heading font-semibold text-navy-800">Tu resultado</p>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">+18 pts</span>
                  </div>
                  <div className="mb-4 flex items-end gap-2">
                    <span className="font-heading text-4xl font-bold text-navy-800">361</span>
                    <span className="mb-1 text-sm text-navy-400">/ 500</span>
                  </div>
                  <div className="space-y-3">
                    {areas.slice(0, 3).map((area) => (
                      <div key={area.id}>
                        <div className="mb-1 flex justify-between text-xs font-medium text-navy-500">
                          <span>{area.nombreCorto}</span>
                          <span>{72 + area.id.length}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-navy-100">
                          <div
                            className={`h-2 rounded-full ${area.color}`}
                            style={{ width: `${72 + area.id.length}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* Cómo funciona */}
      {esComoFunciona && <section id="como-funciona" className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-semibold text-gold-600">Cómo funciona</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-800 sm:text-4xl">
            Un camino claro hacia tu mejor puntaje
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => (
            <motion.div
              key={paso.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-white">
                    <paso.icon className="h-6 w-6" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gold-600">Paso {i + 1}</p>
                  <h3 className="mb-2 font-heading font-semibold text-navy-800">{paso.titulo}</h3>
                  <p className="text-sm text-navy-400">{paso.descripcion}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>}

      {/* Áreas */}
      {esAreas && <section id="areas" className="bg-white pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-gold-600">Áreas de estudio</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy-800 sm:text-4xl">
              Las 5 competencias de las Pruebas Saber 11
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {areas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group rounded-2xl border border-navy-100 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${area.color} text-white transition-transform duration-300 group-hover:scale-110`}>
                  <area.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-navy-800">{area.nombre}</h3>
                <p className="mt-1 text-xs text-navy-400">{area.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}

      {/* Instituciones aliadas */}
      {esInstituciones && <section id="instituciones" className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-gold-600">Confían en nosotros</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-800 sm:text-4xl">
            Instituciones aliadas
          </h2>
          <p className="mt-2 text-sm text-navy-400">
            Colegios e instituciones educativas de Nariño vinculadas en la preparación de sus estudiantes
          </p>
        </div>

        <div className="mt-14 space-y-10">
          {institucionesAliadasPorMunicipio.map((grupo, gIdx) => (
            <motion.div
              key={grupo.municipio}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gIdx * 0.1 }}
            >
              {/* Municipality header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-700 text-gold-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy-800">
                    {grupo.municipio}
                  </h3>
                  <p className="text-xs text-navy-400">{grupo.departamento}</p>
                </div>
              </div>

              {/* Institutions grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.instituciones.map((inst, iIdx) => (
                  <motion.div
                    key={inst.id}
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: gIdx * 0.08 + iIdx * 0.06 }}
                  >
                    <Card className="h-full border-navy-100 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg">
                      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <span className="font-heading text-sm font-bold text-navy-800 leading-snug">
                          {inst.nombre}
                        </span>
                        {inst.sigla && (
                          <span className="mt-1.5 rounded-full bg-navy-50 px-2.5 py-0.5 text-[11px] font-semibold text-navy-500">
                            {inst.sigla}
                          </span>
                        )}
                        <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-gold-600">
                          Alianza Saber 11
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>}

      {/* Contactos */}
      {esContacto && <div className="pt-16"><ContactSection /></div>}

    </div>
  )
}
