import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { Flame, Target, TrendingUp, Clock, ArrowRight, CalendarClock, PlayCircle, Award, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { areas } from '@/data/areas'
import { simulacros } from '@/data/simulacros'
import { useAuth } from '@/context/AuthContext'
import { useEstadisticasEstudiante } from '@/lib/studentHistory'
import { TeacherEvaluationModal } from '@/components/TeacherEvaluationModal'
import { useState } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Dashboard() {
  const { usuario } = useAuth()
  const { stats, cargando } = useEstadisticasEstudiante()
  const [modalEvalDocenteAbierto, setModalEvalDocenteAbierto] = useState(false)

  const proximos = simulacros.slice(0, 3)
  const primerNombre = usuario?.nombre?.split(' ')[0] || 'Estudiante'
  const sinSimulacros = stats.totalSimulacros === 0

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800 sm:text-3xl">
            Hola, {primerNombre} 👋
          </h1>
          <p className="mt-1 text-navy-400">Este es tu resumen de preparación para hoy</p>
        </div>

        {usuario?.rol !== 'admin' && (
          <Button
            size="sm"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-md self-start sm:self-auto"
            onClick={() => setModalEvalDocenteAbierto(true)}
          >
            <Star className="mr-1.5 h-4 w-4 fill-navy-950 text-navy-950" />
            Calificar a mis profesores (1 a 10)
          </Button>
        )}
      </motion.div>

      {/* Modal de Calificación a Profesores */}
      <TeacherEvaluationModal
        abierto={modalEvalDocenteAbierto}
        onCerrar={() => setModalEvalDocenteAbierto(false)}
      />

      {/* Banner motivacional para estado inicial en 0 */}
      {sinSimulacros && !cargando && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-800 via-navy-900 to-wine-900 p-6 text-white shadow-lg sm:p-8"
        >
          <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-3 py-1 text-xs font-bold text-gold-300 border border-gold-400/30 mb-2">
                <Target className="h-3.5 w-3.5" />
                Tu punto de partida
              </div>
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                ¡Empieza tu diagnóstico inicial!
              </h2>
              <p className="mt-1.5 text-sm text-navy-200">
                Tu puntaje actual está en <span className="font-bold text-gold-400">0 pts</span>. Presenta tu primer simulacro para medir tus conocimientos por área y comenzar a registrar tu evolución en tiempo real.
              </p>
            </div>
            <Button size="lg" className="bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 shrink-0 shadow-md" asChild>
              <Link to="/simulacros">
                <PlayCircle className="mr-2 h-5 w-5" />
                Iniciar primer simulacro
              </Link>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Tarjetas de progreso */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cargando ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
        ) : (
          <>
            <StatCard
              index={0}
              icon={TrendingUp}
              label="Puntaje actual"
              valor={sinSimulacros ? '0' : `${stats.puntajeActual}`}
              sub={
                sinSimulacros
                  ? 'Presenta tu primer simulacro'
                  : stats.mejora >= 0
                  ? `+${stats.mejora} pts desde el último simulacro`
                  : `${stats.mejora} pts desde el último simulacro`
              }
              subColor={sinSimulacros ? 'text-navy-400' : 'text-emerald-600'}
              iconBg="bg-navy-700"
            />
            <StatCard
              index={1}
              icon={Target}
              label="Vs. promedio nacional"
              valor={
                sinSimulacros
                  ? '0'
                  : stats.vsPromedioNacional >= 0
                  ? `+${stats.vsPromedioNacional}`
                  : `${stats.vsPromedioNacional}`
              }
              sub={`Promedio nacional: ${stats.promedioNacional} pts`}
              subColor="text-navy-400"
              iconBg="bg-gold-500"
            />
            <StatCard
              index={2}
              icon={Flame}
              label="Racha de estudio"
              valor={`${stats.diasConsecutivos} días`}
              sub={`${stats.diasCompletadosSemana}/${stats.metaSemanal} días esta semana`}
              subColor="text-wine-500"
              iconBg="bg-wine-500"
            />
            <StatCard
              index={3}
              icon={Clock}
              label="Simulacros presentados"
              valor={`${stats.totalSimulacros}`}
              sub={sinSimulacros ? 'Sin simulacros registrados' : 'Simulacros guardados'}
              subColor="text-navy-400"
              iconBg="bg-navy-500"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Áreas de estudio */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-navy-800">Áreas de estudio</h2>
              <Link to="/simulacros" className="text-sm font-semibold text-navy-500 hover:text-gold-600">
                Ver todas
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cargando
                ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
                : areas.map((area, i) => (
                    <motion.div key={area.id} custom={i} initial="hidden" animate="show" variants={fadeUp}>
                      <Link to="/simulacros">
                        <Card className="group h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="flex items-center gap-4 p-5">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${area.color} text-white transition-transform group-hover:scale-110`}>
                              <area.icon className="h-6 w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-heading font-semibold text-navy-800">{area.nombre}</p>
                              <p className="truncate text-xs text-navy-400">{area.descripcion}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" />
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </div>

          {/* Historial reciente si ya tiene simulacros */}
          {!sinSimulacros && stats.simulacros.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-gold-600" />
                    <h2 className="font-heading font-semibold text-navy-800">Tus simulacros guardados</h2>
                  </div>
                  <Link to="/progreso" className="text-xs font-semibold text-navy-500 hover:text-gold-600">
                    Ver gráfica completa
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {stats.simulacros.slice(-3).reverse().map((sim) => (
                    <div
                      key={sim.id}
                      className="flex items-center justify-between rounded-xl border border-navy-100 bg-navy-50/40 p-3.5 transition-colors hover:border-navy-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700 text-white text-xs font-bold">
                          {sim.puntajeIcfes}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{sim.tituloSimulacro}</p>
                          <p className="text-xs text-navy-400">
                            {sim.fecha} · {sim.aciertos}/{sim.totalPreguntas} aciertos ({sim.porcentaje}%)
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Guardado
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Próximos simulacros + racha */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-gold-600" />
                <h2 className="font-heading font-semibold text-navy-800">Próximos simulacros</h2>
              </div>
              <div className="space-y-3">
                {cargando
                  ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
                  : proximos.map((sim, i) => (
                      <motion.div
                        key={sim.id}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between rounded-xl border border-navy-100 p-3 transition-colors hover:border-gold-300"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="truncate text-sm font-semibold text-navy-800">{sim.titulo}</p>
                          <p className="text-xs text-navy-400">
                            {sim.duracionMin} min · {sim.numPreguntas} preguntas
                          </p>
                        </div>
                        <Badge variant="gold">{sim.dificultad}</Badge>
                      </motion.div>
                    ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link to="/simulacros">Ver catálogo completo</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-navy-700 to-navy-900 text-white">
            <CardContent className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <Flame className="h-5 w-5 text-gold-400" />
                <h2 className="font-heading font-semibold">Racha de estudio</h2>
              </div>
              <p className="font-heading text-3xl font-bold">{stats.diasConsecutivos} días</p>
              <p className="mt-1 text-sm text-navy-200">
                {sinSimulacros ? 'Presenta un simulacro hoy para iniciar tu racha.' : '¡Sigue así! No rompas la racha.'}
              </p>
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < stats.diasCompletadosSemana ? 'bg-gold-400' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  valor,
  sub,
  subColor,
  iconBg,
  index,
}: {
  icon: typeof Flame
  label: string
  valor: string
  sub: string
  subColor: string
  iconBg: string
  index: number
}) {
  return (
    <motion.div custom={index} initial="hidden" animate="show" variants={fadeUp}>
      <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-navy-400">{label}</span>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg} text-white`}>
              <Icon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <p className="font-heading text-2xl font-bold text-navy-800">{valor}</p>
          <p className={`mt-1 text-xs font-medium ${subColor}`}>{sub}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
