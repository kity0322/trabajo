import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ListChecks, Users, Play, ShieldCheck, Eye, ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/AuthContext'
import { areas, type AreaId } from '@/data/areas'
import {
  simulacros,
  type Dificultad,
  obtenerEstadoPruebasDesbloqueadas,
  PRUEBAS_DESBLOQUEADAS_EVENT,
} from '@/data/simulacros'
import { buildExamQuestions } from '@/lib/examQuestions'
import { cn } from '@/lib/utils'

const dificultadColor: Record<Dificultad, string> = {
  Básico: 'success',
  Intermedio: 'gold',
  Avanzado: 'wine',
}

export default function Catalog() {
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const [filtro, setFiltro] = useState<AreaId | 'todas'>('todas')
  const [cargando, setCargando] = useState(true)
  const [desbloqueadas, setDesbloqueadas] = useState(obtenerEstadoPruebasDesbloqueadas)

  const esAdmin = usuario?.rol === 'admin'
  const esDocente = usuario?.rol === 'docente'
  const areaDocente = areas.find((area) => area.id === usuario?.materia)

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 500)
    return () => clearTimeout(t)
  }, [filtro])

  useEffect(() => {
    const sync = () => setDesbloqueadas(obtenerEstadoPruebasDesbloqueadas())
    window.addEventListener(PRUEBAS_DESBLOQUEADAS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(PRUEBAS_DESBLOQUEADAS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const lista = esDocente
    ? simulacros.filter((simulacro) => usuario?.materia && simulacro.area === usuario.materia)
    : filtro === 'todas'
      ? simulacros
      : simulacros.filter((simulacro) => simulacro.area === filtro)
  return (
    <div className="space-y-6">
      {esAdmin && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-navy-700 bg-gradient-to-r from-navy-900 to-navy-800 p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-400/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-300 uppercase tracking-wide">
                Modo Supervisión Administradora
              </p>
              <p className="text-xs text-navy-200">
                Como administradora no presentas simulacros: tienes acceso al banco para auditar las preguntas y ver el rendimiento institucional.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shrink-0 shadow-sm"
            asChild
          >
            <Link to="/institucional">
              Ver Resultados & Auditoría
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>
      )}

      <div>
        <h1 className="font-heading text-2xl font-bold text-navy-800 sm:text-3xl">
          {esAdmin
            ? 'Banco de reactivos y simulacros'
            : esDocente
              ? `Pruebas de ${areaDocente?.nombre ?? 'mi materia'}`
              : 'Catálogo de simulacros'}
        </h1>
        <p className="mt-1 text-navy-400">
          {esAdmin
            ? 'Inspección de las pruebas oficiales y estructuración de preguntas ICFES'
            : esDocente
              ? 'Aquí solo están disponibles las pruebas del área que tienes asignada.'
              : 'Elige un área y empieza a practicar con preguntas tipo ICFES'}
        </p>
      </div>

      {!esDocente && (
        <Tabs value={filtro} onValueChange={(v) => {
          setCargando(true)
          setFiltro(v as AreaId | 'todas')
        }}>
          <TabsList className="flex h-auto flex-wrap gap-1">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            {areas.map((area) => (
              <TabsTrigger key={area.id} value={area.id}>
                {area.nombreCorto}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cargando
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)
          : lista.length === 0 ? (
            <p className="text-sm text-navy-500">
              No hay pruebas disponibles para tu materia asignada.
            </p>
          ) : lista.map((sim, i) => {
              const area = areas.find((a) => a.id === sim.area)!
              const desbloqueado = esAdmin || esDocente || desbloqueadas[sim.id] === true
              const bloqueadoEstudiante = usuario?.rol === 'estudiante' && !desbloqueado
              return (
                <motion.div
                  key={sim.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className={`group flex h-full flex-col overflow-hidden transition-all duration-300 ${bloqueadoEstudiante ? 'border-navy-100 bg-navy-50/70' : 'hover:-translate-y-1 hover:shadow-lg'}`}>
                    <div className={cn('h-2 w-full', bloqueadoEstudiante ? 'bg-navy-200' : area.color)} />
                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${area.color} text-white`}>
                          <area.icon className="h-5 w-5" />
                        </div>
                        {bloqueadoEstudiante ? (
                          <Badge variant="outline" className="gap-1 border-navy-200 text-navy-500">
                            <LockKeyhole className="h-3 w-3" /> Bloqueado
                          </Badge>
                        ) : <Badge variant={dificultadColor[sim.dificultad] as any}>{sim.dificultad}</Badge>}
                      </div>
                      <p className={`text-xs font-semibold uppercase tracking-wide ${bloqueadoEstudiante ? 'text-navy-400' : 'text-navy-500'}`}>{area.nombre}</p>
                      <h3 className={`mt-1 font-heading font-semibold ${bloqueadoEstudiante ? 'text-navy-500' : 'text-navy-800'}`}>{sim.titulo}</h3>
                      <p className="mt-1 flex-1 text-sm text-navy-400">{bloqueadoEstudiante ? 'Bloqueado por la administradora' : sim.descripcion}</p>

                      <div className="mt-4 flex items-center gap-4 text-xs text-navy-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {sim.duracionMin} min
                        </span>
                        <span className="flex items-center gap-1">
                          <ListChecks className="h-3.5 w-3.5" />{' '}
                          {esDocente
                            ? buildExamQuestions(sim.area, sim.numPreguntas).filter((pregunta) => pregunta.area === usuario?.materia).length
                            : sim.numPreguntas}{' '}
                          preguntas
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {sim.intentos.toLocaleString('es-CO')}
                        </span>
                      </div>

                      <Button className="mt-5 w-full" disabled={bloqueadoEstudiante} onClick={() => navigate(`/simulacro/${sim.id}`)}>
                        {bloqueadoEstudiante ? <LockKeyhole className="h-4 w-4" /> : esAdmin || esDocente ? <Eye className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {bloqueadoEstudiante ? 'Bloqueado por la administradora' : esAdmin || esDocente ? 'Analizar preguntas' : 'Presentar Prueba'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
      </div>

    </div>
  )
}
