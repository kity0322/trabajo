import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  ShieldCheck,
  Users,
  Award,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  MessageCircle,
  Save,
  ChevronRight,
  Send,
  Layers,
  ArrowRight,
  Filter,
  Sparkles,
  BarChart3,
  Calendar,
  Check,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus,
  Briefcase,
  HelpCircle,
  Star,
  Eye,
  ThumbsUp,
  UserCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { areas, type AreaId, getArea } from '@/data/areas'
import {
  auditoriaDocentesData,
  fallasEstudiantesData,
  consolidadoEstudiantesData,
  obtenerDirectricesGuardadas,
  guardarDirectrizAdmin,
  actualizarEstadoDirectriz,
  obtenerEstadisticasAdmin,
  type AuditoriaDocente,
  type FallaTematicaEstudiantil,
  type ConsolidadoEstudianteAdmin,
  type DirectrizGuardada,
  type EstadoDocencia,
  type NivelGravedad,
} from '@/data/adminOversightData'
import {
  obtenerResumenCalificacionesDocente,
  type ResumenCalificacionesDocente,
} from '@/data/teacherEvaluationData'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

const estadoDocenteConfig: Record<
  EstadoDocencia,
  { label: string; badgeVariant: 'success' | 'outline' | 'gold' | 'wine'; colorText: string; bgClass: string; icon: typeof CheckCircle2 }
> = {
  optimo: {
    label: 'Desempeño Óptimo',
    badgeVariant: 'success',
    colorText: 'text-emerald-700',
    bgClass: 'bg-emerald-50 border-emerald-200',
    icon: Award,
  },
  al_dia: {
    label: 'Al Día',
    badgeVariant: 'outline',
    colorText: 'text-navy-700',
    bgClass: 'bg-navy-50 border-navy-200',
    icon: CheckCircle2,
  },
  requiere_atencion: {
    label: 'Requiere Atención / Atraso',
    badgeVariant: 'gold',
    colorText: 'text-amber-700',
    bgClass: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
  },
  en_riesgo: {
    label: 'Alerta Crítica Docente',
    badgeVariant: 'wine',
    colorText: 'text-wine-700',
    bgClass: 'bg-wine-50 border-wine-200',
    icon: AlertCircle,
  },
}

const gravedadFallaConfig: Record<
  NivelGravedad,
  { label: string; bgBadge: string; textBadge: string; borderBadge: string }
> = {
  critico: {
    label: 'Cuello de Botella Crítico',
    bgBadge: 'bg-wine-100',
    textBadge: 'text-wine-800',
    borderBadge: 'border-wine-300',
  },
  alto: {
    label: 'Impacto Alto',
    bgBadge: 'bg-amber-100',
    textBadge: 'text-amber-800',
    borderBadge: 'border-amber-300',
  },
  medio: {
    label: 'Impacto Moderado',
    bgBadge: 'bg-navy-100',
    textBadge: 'text-navy-800',
    borderBadge: 'border-navy-300',
  },
}

export default function AdminDashboard() {
  const { usuario } = useAuth()

  // Pestaña activa
  const [tabActiva, setTabActiva] = useState<
    'resumen' | 'auditoria_docente' | 'evaluaciones_estudiantes' | 'fallas_estudiantes' | 'estudiantes_general' | 'directrices'
  >('resumen')

  // Búsquedas y filtros para estudiantes
  const [busquedaEstudiante, setBusquedaEstudiante] = useState('')
  const [filtroEstadoEstudiante, setFiltroEstadoEstudiante] = useState<'todos' | 'riesgo' | 'satisfactorio' | 'excelente'>('todos')
  const [filtroGradoEstudiante, setFiltroGradoEstudiante] = useState<string>('todos')

  // Filtro de docentes
  const [filtroDocenteEstado, setFiltroDocenteEstado] = useState<'todos' | 'alerta' | 'optimo'>('todos')

  // Modal para ver Ficha 360° del Estudiante
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<ConsolidadoEstudianteAdmin | null>(null)

  // Modal para ver Expediente 360° del Docente
  const [docenteSeleccionadoExpediente, setDocenteSeleccionadoExpediente] = useState<AuditoriaDocente | null>(null)

  // Modal para emitir directriz a docente
  const [docenteParaDirectriz, setDocenteParaDirectriz] = useState<AuditoriaDocente | null>(null)
  const [textoDirectriz, setTextoDirectriz] = useState('')
  const [urgenciaDirectriz, setUrgenciaDirectriz] = useState<'urgente' | 'moderada' | 'rutinaria'>('urgente')
  const [directrices, setDirectrices] = useState<DirectrizGuardada[]>(() => obtenerDirectricesGuardadas())
  const [directrizGuardadaMsg, setDirectrizGuardadaMsg] = useState(false)

  const stats = useMemo(() => obtenerEstadisticasAdmin(), [])

  // Filtrado de estudiantes
  const estudiantesFiltrados = useMemo(() => {
    return consolidadoEstudiantesData.filter((est) => {
      const matchBusqueda =
        est.nombre.toLowerCase().includes(busquedaEstudiante.toLowerCase()) ||
        est.grado.toLowerCase().includes(busquedaEstudiante.toLowerCase()) ||
        est.institucion.toLowerCase().includes(busquedaEstudiante.toLowerCase())

      if (!matchBusqueda) return false
      if (filtroGradoEstudiante !== 'todos' && est.grado !== filtroGradoEstudiante) return false

      if (filtroEstadoEstudiante === 'riesgo') {
        return est.estadoGeneral === 'en_riesgo' || est.estadoGeneral === 'critico'
      }
      if (filtroEstadoEstudiante === 'satisfactorio') {
        return est.estadoGeneral === 'satisfactorio'
      }
      if (filtroEstadoEstudiante === 'excelente') {
        return est.estadoGeneral === 'excelente'
      }
      return true
    })
  }, [busquedaEstudiante, filtroEstadoEstudiante, filtroGradoEstudiante])

  // Filtrado de docentes
  const docentesFiltrados = useMemo(() => {
    return auditoriaDocentesData.filter((d) => {
      if (filtroDocenteEstado === 'alerta') {
        return d.estadoDocencia === 'requiere_atencion' || d.estadoDocencia === 'en_riesgo'
      }
      if (filtroDocenteEstado === 'optimo') {
        return d.estadoDocencia === 'optimo' || d.estadoDocencia === 'al_dia'
      }
      return true
    })
  }, [filtroDocenteEstado])

  const handleEnviarDirectriz = (e: React.FormEvent) => {
    e.preventDefault()
    if (!docenteParaDirectriz || !textoDirectriz.trim()) return

    const guardada = guardarDirectrizAdmin(
      docenteParaDirectriz.id,
      docenteParaDirectriz.profesor,
      docenteParaDirectriz.materiaNombre,
      textoDirectriz.trim(),
      urgenciaDirectriz
    )

    setDirectrices((prev) => [guardada, ...prev])
    setDirectrizGuardadaMsg(true)
    setTimeout(() => {
      setDirectrizGuardadaMsg(false)
      setDocenteParaDirectriz(null)
      setTextoDirectriz('')
    }, 1500)
  }

  const handleCambiarEstadoDirectriz = (
    id: string,
    nuevoEstado: 'Pendiente de cumplimiento' | 'En atención por docente' | 'Cumplida y verificada'
  ) => {
    actualizarEstadoDirectriz(id, nuevoEstado)
    setDirectrices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, estado: nuevoEstado } : d))
    )
  }

  const generarWhatsAppAcudiente = (est: ConsolidadoEstudianteAdmin) => {
    const texto = `Estimado acudiente de ${est.nombre} (${est.grado}): Le escribe la Coordinación Académica de ImpulsarSAS. Le compartimos el reporte general del estudiante: Puntaje global simulado: ${est.puntajeGlobalIcfes}/500 pts. Materias con oportunidad de mejora: ${est.materiasEnRiesgo.join(', ') || 'Ninguna'}. Quedamos atentos para coordinar los talleres de nivelación.`
    return `https://wa.me/${est.telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(texto)}`
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Banner Principal de Dirección */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 sm:p-8 text-white shadow-2xl border border-navy-700"
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-400/30 shadow-inner">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/20 px-3 py-0.5 text-xs font-bold text-gold-300 border border-gold-400/30">
                  <Sparkles className="h-3 w-3" />
                  Módulo de Dirección y Supervisión General
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-navy-200">
                  Vista Exclusiva Administradora
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Supervisión Institucional & Auditoría Pedagógica
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-navy-200">
                Control 360° del rendimiento de estudiantes, avances y cuellos de botella en la docencia de cada materia.
              </p>
            </div>
          </div>

          {/* Botones de acción rápida para la administradora */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-md"
              onClick={() => setTabActiva('auditoria_docente')}
            >
              <Briefcase className="mr-1.5 h-4 w-4" />
              Auditar Profesores ({stats.totalDocentes})
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-semibold"
              onClick={() => setTabActiva('fallas_estudiantes')}
            >
              <AlertTriangle className="mr-1.5 h-4 w-4 text-amber-400" />
              Fallas Estudiantiles ({fallasEstudiantesData.length})
            </Button>
          </div>
        </div>

        {/* Barra de pestañas principal */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {[
            { id: 'resumen', label: 'Tablero General', icon: BarChart3 },
            { id: 'auditoria_docente', label: 'Auditoría y Avance Docente', icon: Briefcase, count: stats.docentesEnAlerta > 0 ? `${stats.docentesEnAlerta} alertas` : undefined },
            { id: 'evaluaciones_estudiantes', label: 'Calificación de Estudiantes a Profesores (1-10)', icon: Star, count: 'Opinión' },
            { id: 'fallas_estudiantes', label: 'Radiografía de Fallas Estudiantiles', icon: AlertTriangle, count: `${fallasEstudiantesData.length} temas` },
            { id: 'estudiantes_general', label: 'Padrón de Estudiantes & 5 Áreas', icon: Users, count: `${stats.totalEstudiantes}` },
            { id: 'directrices', label: 'Directrices Emitidas', icon: FileText, count: directrices.length > 0 ? `${directrices.length}` : undefined },
          ].map((tab) => {
            const activo = tabActiva === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id as typeof tabActiva)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  activo
                    ? 'bg-gold-500 text-navy-950 shadow-md font-bold'
                    : 'bg-white/5 text-navy-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      activo ? 'bg-navy-950 text-gold-300' : 'bg-white/20 text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* ─── PESTAÑA 1: TABLERO GENERAL Y RADIOGRAFÍA INSTITUCIONAL ─── */}
      {tabActiva === 'resumen' && (
        <div className="space-y-8">
          {/* Métricas Globales del Administrador */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-navy-400">Puntaje Global Promedio</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-white">
                    <Award className="h-4 w-4 text-gold-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-heading text-3xl font-bold text-navy-800">{stats.puntajePromedioGlobal}</p>
                  <span className="text-xs font-semibold text-navy-400">/ 500 pts ICFES</span>
                </div>
                <p className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" /> +23 pts por encima del promedio nacional
                </p>
              </CardContent>
            </Card>

            <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-navy-400">Cumplimiento Docente Global</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-heading text-3xl font-bold text-navy-800">{stats.promedioCumplimientoDocente}%</p>
                  <span className="text-xs font-semibold text-navy-400">índice directivo</span>
                </div>
                <p className="mt-1 text-[11px] text-navy-500">
                  {stats.promedioAvanceCurricular}% de avance medio en temarios ICFES
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-amber-200 bg-amber-50/40 shadow-sm hover:shadow-md cursor-pointer transition-all"
              onClick={() => setTabActiva('auditoria_docente')}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-800">Docentes en Alerta</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-heading text-3xl font-bold text-amber-800">{stats.docentesEnAlerta}</p>
                  <span className="text-xs font-semibold text-amber-700">de {stats.totalDocentes} áreas</span>
                </div>
                <p className="mt-1 text-[11px] text-amber-800 font-medium">
                  Atraso de cronograma o refuerzos pendientes
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-wine-200 bg-wine-50/40 shadow-sm hover:shadow-md cursor-pointer transition-all"
              onClick={() => setTabActiva('estudiantes_general')}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-wine-800">Estudiantes en Riesgo</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-wine-500 text-white">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-heading text-3xl font-bold text-wine-800">{stats.totalEnRiesgoOAlerta}</p>
                  <span className="text-xs font-semibold text-wine-700">alumnos rezagados</span>
                </div>
                <p className="mt-1 text-[11px] text-wine-800 font-medium">
                  {stats.estudiantesCriticos} en estado crítico urgente
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Semáforo Institucional de Áreas y Profesores */}
          <Card className="border-navy-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-navy-100">
                <div>
                  <h2 className="font-heading text-lg font-bold text-navy-800 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-navy-700" />
                    Semáforo Institucional por Materias y Profesores
                  </h2>
                  <p className="text-xs text-navy-400">
                    Diagnóstico comparado del avance pedagógico y desempeño por asignatura
                  </p>
                </div>
                <Badge variant="outline" className="border-gold-300 bg-gold-50 text-navy-900 font-bold self-start sm:self-auto">
                  5 Profesores evaluados
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 text-[11px] font-bold uppercase tracking-wider text-navy-400">
                      <th className="pb-3 pr-4">Materia</th>
                      <th className="pb-3 pr-4">Docente Asignado</th>
                      <th className="pb-3 pr-4">Avance Temario</th>
                      <th className="pb-3 pr-4">Cumplimiento</th>
                      <th className="pb-3 pr-4">Estado Docencia</th>
                      <th className="pb-3 pr-4">Diagnóstico / Alerta</th>
                      <th className="pb-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-50">
                    {auditoriaDocentesData.map((doc) => {
                      const cfg = estadoDocenteConfig[doc.estadoDocencia]
                      const CfgIcon = cfg.icon
                      const areaObj = getArea(doc.materiaId)
                      const AreaIcon = areaObj?.icon || BookOpen

                      return (
                        <tr key={doc.id} className="hover:bg-navy-50/50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 text-navy-800 font-bold">
                                <AreaIcon className="h-4 w-4" />
                              </div>
                              <span className="font-bold text-navy-800">{doc.materiaNombre}</span>
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-xs text-navy-700 font-medium">
                            {doc.profesor}
                          </td>
                          <td className="py-4 pr-4">
                            <div className="w-28 space-y-1">
                              <div className="flex justify-between text-[11px] font-bold text-navy-700">
                                <span>{doc.avanceCurricular}%</span>
                              </div>
                              <Progress value={doc.avanceCurricular} className="h-1.5" />
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="font-heading font-bold text-sm text-navy-800">
                              {doc.indiceCumplimientoDocente}%
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold border ${cfg.bgClass} ${cfg.colorText}`}
                            >
                              <CfgIcon className="h-3 w-3 shrink-0" />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="py-4 pr-4 text-xs text-navy-600 max-w-[240px]">
                            <p className="line-clamp-2">
                              {doc.fallasDocenciaOportunidades[0] || 'Sin observaciones registradas'}
                            </p>
                          </td>
                          <td className="py-4 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs font-semibold border-navy-200 hover:bg-navy-100"
                              onClick={() => {
                                setDocenteParaDirectriz(doc)
                                setTextoDirectriz(`Directriz para ${doc.profesor} (${doc.materiaNombre}): `)
                              }}
                            >
                              <Send className="h-3.5 w-3.5 mr-1 text-gold-600" />
                              Directriz
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── PESTAÑA 2: AUDITORÍA Y AVANCE DOCENTE (EN QUÉ AVANZAN Y EN QUÉ FALLAN) ─── */}
      {tabActiva === 'auditoria_docente' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-800 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-navy-700" />
                Auditoría Pedagógica y Desempeño de Profesores
              </h2>
              <p className="text-xs text-navy-400">
                Supervisión detallada de avances de cada profesor, cumplimiento curricular y áreas donde están fallando.
              </p>
            </div>

            {/* Filtros de estado docente */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltroDocenteEstado('todos')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  filtroDocenteEstado === 'todos' ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-600'
                }`}
              >
                Todos ({auditoriaDocentesData.length})
              </button>
              <button
                onClick={() => setFiltroDocenteEstado('alerta')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filtroDocenteEstado === 'alerta'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Con Alertas ({stats.docentesEnAlerta})
              </button>
              <button
                onClick={() => setFiltroDocenteEstado('optimo')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  filtroDocenteEstado === 'optimo'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                Cumplimiento Óptimo
              </button>
            </div>
          </div>

          {/* Tarjetas de Auditoría Docente */}
          <div className="grid gap-6 lg:grid-cols-2">
            {docentesFiltrados.map((doc, i) => {
              const cfg = estadoDocenteConfig[doc.estadoDocencia]
              const CfgIcon = cfg.icon
              const areaObj = getArea(doc.materiaId)
              const AreaIcon = areaObj?.icon || BookOpen

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-6 space-y-5">
                      {/* Encabezado del docente */}
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-navy-100">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 font-bold shadow-sm">
                            <AreaIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-heading text-base font-bold text-navy-800">
                                {doc.profesor}
                              </h3>
                            </div>
                            <p className="text-xs text-navy-500 font-medium">
                              Materia: <strong className="text-navy-800">{doc.materiaNombre}</strong> · Grupos: {doc.gruposAsignados.join(', ')}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold border shrink-0 ${cfg.bgClass} ${cfg.colorText}`}
                        >
                          <CfgIcon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </div>

                      {/* Métricas clave de docencia */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                        <div className="rounded-xl bg-navy-50/70 p-2.5 border border-navy-100/70">
                          <span className="text-[10px] font-semibold text-navy-400 uppercase">Avance Temario</span>
                          <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">{doc.avanceCurricular}%</p>
                        </div>
                        <div className="rounded-xl bg-navy-50/70 p-2.5 border border-navy-100/70">
                          <span className="text-[10px] font-semibold text-navy-400 uppercase">Cumplimiento</span>
                          <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">{doc.indiceCumplimientoDocente}%</p>
                        </div>
                        <div className="rounded-xl bg-navy-50/70 p-2.5 border border-navy-100/70">
                          <span className="text-[10px] font-semibold text-navy-400 uppercase">Seguimiento</span>
                          <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">{doc.tasaRespuestaSeguimiento}%</p>
                        </div>
                        <div className="rounded-xl bg-navy-50/70 p-2.5 border border-navy-100/70">
                          <span className="text-[10px] font-semibold text-navy-400 uppercase">Refuerzos Hechos</span>
                          <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">
                            {doc.planesRefuerzoCompletados}/{doc.planesRefuerzoCreados}
                          </p>
                        </div>
                      </div>

                      {/* Fortalezas vs En qué está fallando */}
                      <div className="space-y-3">
                        {/* Fortalezas */}
                        <div className="rounded-xl bg-emerald-50/60 p-3.5 border border-emerald-200/80 space-y-1.5">
                          <h4 className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            Fortalezas y Avances Pedagógicos
                          </h4>
                          <ul className="text-xs text-emerald-950 space-y-1">
                            {doc.fortalezasDocentes.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* En qué está fallando el docente */}
                        <div className="rounded-xl bg-wine-50/60 p-3.5 border border-wine-200/80 space-y-1.5">
                          <h4 className="text-[11px] font-bold text-wine-900 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-wine-600" />
                            En qué está fallando / Oportunidades de Mejora
                          </h4>
                          <ul className="text-xs text-wine-950 space-y-1">
                            {doc.fallasDocenciaOportunidades.map((fallo, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-wine-600 font-bold">•</span>
                                <span>{fallo}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recomendación directiva */}
                      <div className="rounded-xl bg-gold-50/60 p-3 border border-gold-200/70 text-xs text-navy-800">
                        <strong className="text-gold-900 block mb-0.5 uppercase text-[10px] tracking-wider">
                          Recomendación de la Dirección Académica:
                        </strong>
                        <p>{doc.recomendacionAdministrador}</p>
                      </div>

                      {/* Botones de acción directiva */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-navy-100">
                        <span className="text-[11px] text-navy-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Supervisado {doc.ultimaSupervision}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs font-semibold border-navy-200 hover:bg-navy-50"
                            onClick={() => setDocenteSeleccionadoExpediente(doc)}
                          >
                            <Eye className="mr-1.5 h-3.5 w-3.5 text-navy-600" />
                            Ver Ficha 360° Profesor
                          </Button>
                          <Button
                            size="sm"
                            className="bg-navy-800 hover:bg-navy-900 text-white font-semibold text-xs"
                            onClick={() => {
                              setDocenteParaDirectriz(doc)
                              setTextoDirectriz(`Directriz formal para ${doc.profesor} (${doc.materiaNombre}): `)
                            }}
                          >
                            <Send className="mr-1.5 h-3.5 w-3.5 text-gold-400" />
                            Emitir Directriz
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── PESTAÑA: CALIFICACIÓN DE ESTUDIANTES A PROFESORES (1 A 10) ─── */}
      {tabActiva === 'evaluaciones_estudiantes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-800 flex items-center gap-2">
                <Star className="h-6 w-6 text-gold-500 fill-gold-500" />
                Calificaciones y Opiniones de Estudiantes hacia los Profesores
              </h2>
              <p className="text-xs text-navy-400">
                Supervisión directa de qué tan bien se hacen entender los docentes, claridad explicativa y satisfacción del estudiantado.
              </p>
            </div>
            <Badge variant="outline" className="border-gold-300 bg-gold-50 text-navy-900 font-bold self-start sm:self-auto">
              Escala de Calificación 1 a 10
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {auditoriaDocentesData.map((doc, idx) => {
              const resumen = obtenerResumenCalificacionesDocente(doc.id)
              const areaObj = getArea(doc.materiaId)
              const AreaIcon = areaObj?.icon || BookOpen

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-5">
                      {/* Encabezado del Profesor */}
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-navy-100">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 font-bold">
                            <AreaIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-heading text-base font-bold text-navy-800">
                              {doc.profesor}
                            </h3>
                            <p className="text-xs text-navy-500">
                              {doc.materiaNombre} · {resumen.totalEvaluaciones} estudiantes encuestados
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-navy-400 uppercase block">
                            Calificación Promedio
                          </span>
                          <div className="flex items-baseline gap-1 justify-end">
                            <span className="font-heading text-3xl font-bold text-navy-900">
                              {resumen.promedioGlobal}
                            </span>
                            <span className="text-xs text-navy-400 font-semibold">/ 10</span>
                          </div>
                        </div>
                      </div>

                      {/* Desglose de aspectos evaluados (1-10) */}
                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-navy-700 flex items-center gap-1.5">
                              <Award className="h-3.5 w-3.5 text-gold-600" />
                              Claridad en las Explicaciones (Qué tan bien se hace entender)
                            </span>
                            <span className="font-heading font-bold text-navy-900">{resumen.promediosPorAspecto.claridad} / 10</span>
                          </div>
                          <Progress
                            value={resumen.promediosPorAspecto.claridad * 10}
                            className={`h-2 ${
                              resumen.promediosPorAspecto.claridad >= 8
                                ? '[&>div]:bg-emerald-600'
                                : resumen.promediosPorAspecto.claridad >= 6
                                ? '[&>div]:bg-gold-500'
                                : '[&>div]:bg-wine-600'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-navy-700">Metodología y Didáctica Saber 11</span>
                            <span className="font-heading font-bold text-navy-900">{resumen.promediosPorAspecto.metodologia} / 10</span>
                          </div>
                          <Progress
                            value={resumen.promediosPorAspecto.metodologia * 10}
                            className="h-2 [&>div]:bg-navy-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-navy-700">Paciencia y Acompañamiento a rezagados</span>
                            <span className="font-heading font-bold text-navy-900">{resumen.promediosPorAspecto.acompanamiento} / 10</span>
                          </div>
                          <Progress
                            value={resumen.promediosPorAspecto.acompanamiento * 10}
                            className="h-2 [&>div]:bg-navy-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-navy-700">Puntualidad y Cumplimiento de entregas</span>
                            <span className="font-heading font-bold text-navy-900">{resumen.promediosPorAspecto.puntualidad} / 10</span>
                          </div>
                          <Progress
                            value={resumen.promediosPorAspecto.puntualidad * 10}
                            className="h-2 [&>div]:bg-navy-600"
                          />
                        </div>
                      </div>

                      {/* Opiniones y testimonios de estudiantes */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-[11px] font-bold text-navy-800 uppercase tracking-wider">
                          Opiniones de Estudiantes ({resumen.comentariosRecientes.length}):
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {resumen.comentariosRecientes.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-navy-200 p-3 text-xs text-navy-400">
                              Aún no hay recomendaciones escritas para este profesor.
                            </p>
                          ) : resumen.comentariosRecientes.map((c) => (
                            <div key={c.id} className="rounded-xl bg-navy-50/70 p-3 text-xs border border-navy-100/70 space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-navy-800">{c.estudianteNombre} ({c.grado})</span>
                                <div className="flex items-center gap-1 font-heading font-bold text-gold-700">
                                  <Star className="h-3 w-3 fill-gold-500 text-gold-500" />
                                  <span>{c.promedio}/10</span>
                                </div>
                              </div>
                              <p className="text-navy-600 italic">"{c.comentario}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botón ver expediente */}
                      <div className="pt-2 border-t border-navy-100 flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-semibold"
                          onClick={() => setDocenteSeleccionadoExpediente(doc)}
                        >
                          <Eye className="mr-1.5 h-3.5 w-3.5 text-navy-600" />
                          Ver expediente completo del profesor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── PESTAÑA 3: RADIOGRAFÍA DE FALLAS ESTUDIANTILES ─── */}
      {tabActiva === 'fallas_estudiantes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-800 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                Radiografía Institucional de Fallas Estudiantiles
              </h2>
              <p className="text-xs text-navy-400">
                Temas y competencias críticas donde más se rajan los estudiantes en las pruebas Saber 11
              </p>
            </div>
            <Badge variant="wine" className="font-bold self-start sm:self-auto">
              {fallasEstudiantesData.length} Cuellos de botella detectados
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallasEstudiantesData.map((falla, idx) => {
              const cfg = gravedadFallaConfig[falla.nivelGravedad]
              const areaObj = getArea(falla.materiaId)
              const AreaIcon = areaObj?.icon || BookOpen

              return (
                <motion.div
                  key={falla.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <CardContent className="p-5 space-y-4">
                      <div>
                        {/* Encabezado con materia y nivel */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700">
                            <AreaIcon className="h-4 w-4 text-gold-600" />
                            {falla.materiaNombre}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${cfg.bgBadge} ${cfg.textBadge} ${cfg.borderBadge}`}
                          >
                            {cfg.label}
                          </span>
                        </div>

                        <h3 className="font-heading text-base font-bold text-navy-900 leading-snug">
                          {falla.tema}
                        </h3>
                        <p className="text-[11px] text-navy-400 mt-0.5">Competencia: {falla.competencia}</p>
                      </div>

                      {/* Barra de porcentaje de falla */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-wine-700">Tasa de Error Estudiantil</span>
                          <span className="font-heading font-bold text-sm text-wine-800">{falla.porcentajeFalla}%</span>
                        </div>
                        <Progress value={falla.porcentajeFalla} className="h-2 bg-wine-100 [&>div]:bg-wine-600" />
                        <p className="text-[11px] text-navy-500 font-medium">
                          {falla.estudiantesAfectados} estudiantes presentan falencias en este tema
                        </p>
                      </div>

                      {/* Motivo pedagógico */}
                      <div className="rounded-xl bg-navy-50/80 p-3 text-xs text-navy-700 border border-navy-100">
                        <strong className="text-navy-900 block mb-1 uppercase text-[10px] tracking-wide">
                          Por qué fallan los estudiantes:
                        </strong>
                        <p>{falla.motivoPedagogico}</p>
                      </div>

                      {/* Acción correctiva institucional */}
                      <div className="rounded-xl bg-amber-50/70 p-3 text-xs text-amber-950 border border-amber-200">
                        <strong className="text-amber-900 block mb-1 uppercase text-[10px] tracking-wide flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-amber-600" />
                          Plan de Choque Institucional:
                        </strong>
                        <p>{falla.accionCorrectivaInstitucional}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── PESTAÑA 4: PADRÓN CONSOLIDADO DE ESTUDIANTES (TODAS LAS NOTAS) ─── */}
      {tabActiva === 'estudiantes_general' && (
        <div className="space-y-6">
          <Card className="border-navy-100 shadow-sm">
            <CardContent className="p-6">
              {/* Encabezado y búsqueda */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-navy-100">
                <div>
                  <h2 className="font-heading text-lg font-bold text-navy-800 flex items-center gap-2">
                    <Users className="h-5 w-5 text-navy-700" />
                    Padrón Consolidado de Estudiantes (5 Áreas ICFES)
                  </h2>
                  <p className="text-xs text-navy-400">
                    Visualiza el puntaje global simulado y la nota exacta en cada una de las 5 materias
                  </p>
                </div>

                <div className="relative w-full lg:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                  <Input
                    placeholder="Buscar estudiante o grupo..."
                    className="pl-9"
                    value={busquedaEstudiante}
                    onChange={(e) => setBusquedaEstudiante(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtros rápidos */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setFiltroEstadoEstudiante('todos')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold ${
                      filtroEstadoEstudiante === 'todos' ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-600'
                    }`}
                  >
                    Todos ({consolidadoEstudiantesData.length})
                  </button>
                  <button
                    onClick={() => setFiltroEstadoEstudiante('riesgo')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold ${
                      filtroEstadoEstudiante === 'riesgo'
                        ? 'bg-wine-600 text-white'
                        : 'bg-wine-50 text-wine-800 border border-wine-200'
                    }`}
                  >
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    En Riesgo ({stats.totalEnRiesgoOAlerta})
                  </button>
                  <button
                    onClick={() => setFiltroEstadoEstudiante('satisfactorio')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold ${
                      filtroEstadoEstudiante === 'satisfactorio' ? 'bg-navy-700 text-white' : 'bg-navy-50 text-navy-600'
                    }`}
                  >
                    Satisfactorios ({stats.estudiantesSatisfactorio})
                  </button>
                  <button
                    onClick={() => setFiltroEstadoEstudiante('excelente')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold ${
                      filtroEstadoEstudiante === 'excelente' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    Excelentes ({stats.estudiantesExcelente})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-navy-500">Grupo:</span>
                  <select
                    value={filtroGradoEstudiante}
                    onChange={(e) => setFiltroGradoEstudiante(e.target.value)}
                    className="rounded-xl border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700"
                  >
                    <option value="todos">Todos los grupos</option>
                    <option value="11°A">Grado 11°A</option>
                    <option value="11°B">Grado 11°B</option>
                    <option value="11°C">Grado 11°C</option>
                  </select>
                </div>
              </div>

              {/* Tabla consolidada */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 text-[11px] font-bold uppercase tracking-wider text-navy-400">
                      <th className="pb-3 pr-4">Estudiante</th>
                      <th className="pb-3 pr-4">Grado</th>
                      <th className="pb-3 pr-4 text-center">Global ICFES</th>
                      <th className="pb-3 pr-2 text-center">Mat</th>
                      <th className="pb-3 pr-2 text-center">Lec</th>
                      <th className="pb-3 pr-2 text-center">Cie</th>
                      <th className="pb-3 pr-2 text-center">Soc</th>
                      <th className="pb-3 pr-4 text-center">Ing</th>
                      <th className="pb-3 pr-4">Estado</th>
                      <th className="pb-3 text-right">Ficha 360°</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-50">
                    {estudiantesFiltrados.map((est) => (
                      <tr
                        key={est.id}
                        className="hover:bg-navy-50/60 transition-colors cursor-pointer"
                        onClick={() => setEstudianteSeleccionado(est)}
                      >
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-navy-100">
                              <AvatarFallback className="text-[10px] font-bold text-navy-700 bg-navy-50">
                                {iniciales(est.nombre)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-bold text-navy-800 hover:text-gold-600 block">
                                {est.nombre}
                              </span>
                              <span className="text-[10px] text-navy-400">{est.institucion}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-xs text-navy-600 font-semibold">{est.grado}</td>
                        <td className="py-3.5 pr-4 text-center">
                          <span className="font-heading font-bold text-base text-navy-900">
                            {est.puntajeGlobalIcfes}
                          </span>
                          <span className="text-[10px] text-navy-400 block">/ 500 pts</span>
                        </td>

                        {/* 5 Materias con colores de alerta */}
                        <td className="py-3.5 pr-2 text-center">
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              est.materias.matematicas >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : est.materias.matematicas >= 60
                                ? 'bg-navy-50 text-navy-700'
                                : 'bg-wine-50 text-wine-700'
                            }`}
                          >
                            {est.materias.matematicas}
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 text-center">
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              est.materias.lectura >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : est.materias.lectura >= 60
                                ? 'bg-navy-50 text-navy-700'
                                : 'bg-wine-50 text-wine-700'
                            }`}
                          >
                            {est.materias.lectura}
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 text-center">
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              est.materias.ciencias >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : est.materias.ciencias >= 60
                                ? 'bg-navy-50 text-navy-700'
                                : 'bg-wine-50 text-wine-700'
                            }`}
                          >
                            {est.materias.ciencias}
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 text-center">
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              est.materias.sociales >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : est.materias.sociales >= 60
                                ? 'bg-navy-50 text-navy-700'
                                : 'bg-wine-50 text-wine-700'
                            }`}
                          >
                            {est.materias.sociales}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-center">
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              est.materias.ingles >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : est.materias.ingles >= 60
                                ? 'bg-navy-50 text-navy-700'
                                : 'bg-wine-50 text-wine-700'
                            }`}
                          >
                            {est.materias.ingles}
                          </span>
                        </td>

                        {/* Estado */}
                        <td className="py-3.5 pr-4">
                          <Badge
                            variant={
                              est.estadoGeneral === 'excelente'
                                ? 'success'
                                : est.estadoGeneral === 'satisfactorio'
                                ? 'outline'
                                : 'wine'
                            }
                            className="text-[10px] font-bold"
                          >
                            {est.estadoGeneral === 'excelente'
                              ? 'Excelente'
                              : est.estadoGeneral === 'satisfactorio'
                              ? 'Satisfactorio'
                              : est.estadoGeneral === 'en_riesgo'
                              ? 'En Riesgo'
                              : 'Crítico'}
                          </Badge>
                        </td>

                        <td className="py-3.5 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-navy-600 font-bold hover:text-navy-900"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEstudianteSeleccionado(est)
                            }}
                          >
                            Ver detalle <ChevronRight className="h-4 w-4 ml-1 text-gold-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── PESTAÑA 5: HISTORIAL DE DIRECTRICES Y COMPROMISOS ─── */}
      {tabActiva === 'directrices' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-800 flex items-center gap-2">
                <FileText className="h-6 w-6 text-navy-700" />
                Historial de Directrices y Compromisos Docentes
              </h2>
              <p className="text-xs text-navy-400">
                Registro de órdenes, llamados de atención y planes de contingencia emitidos a los profesores
              </p>
            </div>
            <Button
              size="sm"
              className="bg-navy-800 hover:bg-navy-900 text-white font-bold"
              onClick={() => {
                setDocenteParaDirectriz(auditoriaDocentesData[0])
                setTextoDirectriz('')
              }}
            >
              <Send className="h-4 w-4 mr-1.5 text-gold-400" />
              Nueva Directriz
            </Button>
          </div>

          <div className="space-y-3">
            {directrices.map((dir) => (
              <Card key={dir.id} className="border-navy-100 shadow-sm">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={dir.urgencia === 'urgente' ? 'wine' : dir.urgencia === 'moderada' ? 'gold' : 'outline'}
                        className="text-[10px] uppercase font-bold"
                      >
                        {dir.urgencia}
                      </Badge>
                      <span className="font-bold text-navy-800 text-sm">
                        Dirigido a: {dir.docenteNombre} ({dir.materiaNombre})
                      </span>
                      <span className="text-[11px] text-navy-400 flex items-center gap-1 ml-auto">
                        <Clock className="h-3 w-3" /> {dir.fecha}
                      </span>
                    </div>

                    <p className="text-xs text-navy-700 bg-navy-50/60 p-3 rounded-xl border border-navy-100/60">
                      {dir.texto}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <select
                      value={dir.estado}
                      onChange={(e) =>
                        handleCambiarEstadoDirectriz(
                          dir.id,
                          e.target.value as DirectrizGuardada['estado']
                        )
                      }
                      className="rounded-lg border border-navy-200 bg-white px-2.5 py-1 text-[11px] font-bold text-navy-800 focus:outline-none"
                    >
                      <option value="Pendiente de cumplimiento">Pendiente de cumplimiento</option>
                      <option value="En atención por docente">En atención por docente</option>
                      <option value="Cumplida y verificada">Cumplida y verificada</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}

            {directrices.length === 0 && (
              <div className="py-12 text-center text-navy-400 bg-white rounded-2xl border border-navy-100">
                <FileText className="mx-auto h-10 w-10 text-navy-200 mb-2" />
                <p className="font-heading font-semibold text-navy-700">No hay directrices registradas aún</p>
                <p className="text-xs text-navy-400 mt-0.5">
                  Usa el botón "Auditar Profesores" para enviar directrices a cualquier docente.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Ficha 360° del Estudiante para la Administración */}
      <Dialog
        open={Boolean(estudianteSeleccionado)}
        onOpenChange={(open) => !open && setEstudianteSeleccionado(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          {estudianteSeleccionado && (
            <div className="space-y-6">
              {/* Encabezado */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-100">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-gold-400 shadow-md">
                    <AvatarFallback className="text-base font-bold text-navy-800 bg-gold-50">
                      {iniciales(estudianteSeleccionado.nombre)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-navy-800">
                      {estudianteSeleccionado.nombre}
                    </h2>
                    <p className="text-xs text-navy-500">
                      {estudianteSeleccionado.grado} · {estudianteSeleccionado.institucion} · {estudianteSeleccionado.correo}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:pl-4 border-navy-100">
                  <span className="text-[11px] font-semibold text-navy-400 uppercase">Puntaje Global ICFES</span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="font-heading text-3xl font-bold text-navy-900">
                      {estudianteSeleccionado.puntajeGlobalIcfes}
                    </span>
                    <span className="text-xs font-semibold text-navy-400">/ 500 pts</span>
                  </div>
                </div>
              </div>

              {/* Desglose en las 5 materias */}
              <div className="space-y-3">
                <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider">
                  Desglose de Calificaciones por Materia (0 a 100 pts)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                    <span className="text-[10px] font-bold text-navy-500 block">Matemáticas</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {estudianteSeleccionado.materias.matematicas}
                    </p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                    <span className="text-[10px] font-bold text-navy-500 block">Lectura</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {estudianteSeleccionado.materias.lectura}
                    </p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                    <span className="text-[10px] font-bold text-navy-500 block">Ciencias</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {estudianteSeleccionado.materias.ciencias}
                    </p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                    <span className="text-[10px] font-bold text-navy-500 block">Sociales</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {estudianteSeleccionado.materias.sociales}
                    </p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                    <span className="text-[10px] font-bold text-navy-500 block">Inglés</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {estudianteSeleccionado.materias.ingles}
                    </p>
                  </div>
                </div>
              </div>

              {/* Materias en riesgo vs destacadas */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-wine-50/70 p-3.5 border border-wine-200">
                  <span className="text-xs font-bold text-wine-900 block mb-1">
                    ⚠️ Materias que requieren refuerzo urgente:
                  </span>
                  <p className="text-xs text-wine-950 font-medium">
                    {estudianteSeleccionado.materiasEnRiesgo.join(', ') || 'Ninguna materia en riesgo'}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50/70 p-3.5 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    🌟 Materias con desempeño sobresaliente:
                  </span>
                  <p className="text-xs text-emerald-950 font-medium">
                    {estudianteSeleccionado.materiasDestacadas.join(', ') || 'En proceso de consolidación'}
                  </p>
                </div>
              </div>

              {/* Botón WhatsApp directivo */}
              <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                <Button variant="outline" size="sm" onClick={() => setEstudianteSeleccionado(null)}>
                  Cerrar
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold" asChild>
                  <a href={generarWhatsAppAcudiente(estudianteSeleccionado)} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    Enviar Informe al Acudiente ({estudianteSeleccionado.telefono})
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para emitir directriz a docente */}
      <Dialog
        open={Boolean(docenteParaDirectriz)}
        onOpenChange={(open) => !open && setDocenteParaDirectriz(null)}
      >
        <DialogContent className="max-w-lg p-6">
          {docenteParaDirectriz && (
            <form onSubmit={handleEnviarDirectriz} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-base font-bold text-navy-800">
                  Emitir Directriz Administrativa
                </DialogTitle>
                <DialogDescription className="text-xs text-navy-400">
                  Enviar instrucción pedagógica a {docenteParaDirectriz.profesor} ({docenteParaDirectriz.materiaNombre})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-navy-700">Nivel de urgencia:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['urgente', 'moderada', 'rutinaria'] as const).map((urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setUrgenciaDirectriz(urg)}
                      className={`rounded-lg py-1.5 text-xs font-bold capitalize transition-all ${
                        urgenciaDirectriz === urg
                          ? urg === 'urgente'
                            ? 'bg-wine-600 text-white'
                            : urg === 'moderada'
                            ? 'bg-amber-500 text-white'
                            : 'bg-navy-700 text-white'
                          : 'bg-navy-50 text-navy-600'
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-navy-700">Contenido de la directriz / compromiso:</label>
                <textarea
                  rows={4}
                  value={textoDirectriz}
                  onChange={(e) => setTextoDirectriz(e.target.value)}
                  placeholder="Escribe la instrucción administrativa, ajuste de cronograma o requerimiento pedagógico..."
                  className="w-full rounded-xl border border-navy-200 bg-white p-3 text-xs text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-600"
                  required
                />
              </div>

              {directrizGuardadaMsg && (
                <div className="rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Directriz guardada y registrada con éxito
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-navy-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDocenteParaDirectriz(null)}
                >
                  Cancelar
                </Button>
                <Button type="submit" size="sm" className="bg-navy-800 hover:bg-navy-900 text-white font-bold">
                  <Send className="h-3.5 w-3.5 mr-1 text-gold-400" />
                  Guardar y Emitir
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Ficha 360° Completa del Profesor */}
      <Dialog
        open={Boolean(docenteSeleccionadoExpediente)}
        onOpenChange={(open) => !open && setDocenteSeleccionadoExpediente(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          {docenteSeleccionadoExpediente && (() => {
            const doc = docenteSeleccionadoExpediente
            const resumen = obtenerResumenCalificacionesDocente(doc.id)
            const areaObj = getArea(doc.materiaId)
            const AreaIcon = areaObj?.icon || BookOpen
            const cfg = estadoDocenteConfig[doc.estadoDocencia]

            return (
              <div className="space-y-6">
                {/* Encabezado del Profesor */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 font-bold shadow-md">
                      <AreaIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-heading text-xl font-bold text-navy-800">
                          {doc.profesor}
                        </h2>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold border ${cfg.bgClass} ${cfg.colorText}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">
                        Área: <strong className="text-navy-800">{doc.materiaNombre}</strong> · Contacto: {doc.correo} · {doc.telefono}
                      </p>
                      <p className="text-xs text-navy-400">
                        Grupos asignados: {doc.gruposAsignados.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:pl-4 border-navy-100">
                    <span className="text-[10px] font-bold text-navy-400 uppercase">Calificación de Alumnos</span>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="font-heading text-3xl font-bold text-gold-600">
                        {resumen.promedioGlobal}
                      </span>
                      <span className="text-xs font-semibold text-navy-400">/ 10 pts</span>
                    </div>
                    <span className="text-[11px] text-navy-500 font-medium block">
                      {resumen.porcentajeSatisfaccion}% de recomendación
                    </span>
                  </div>
                </div>

                {/* Métricas de Rendimiento Docente */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-3">
                    <span className="text-[10px] font-bold text-navy-400 uppercase">Avance de Temario</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">{doc.avanceCurricular}%</p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-3">
                    <span className="text-[10px] font-bold text-navy-400 uppercase">Cumplimiento General</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">{doc.indiceCumplimientoDocente}%</p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-3">
                    <span className="text-[10px] font-bold text-navy-400 uppercase">Tasa de Respuesta</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">{doc.tasaRespuestaSeguimiento}%</p>
                  </div>
                  <div className="rounded-xl border border-navy-100 bg-navy-50/50 p-3">
                    <span className="text-[10px] font-bold text-navy-400 uppercase">Refuerzos Realizados</span>
                    <p className="font-heading text-xl font-bold text-navy-800 mt-1">
                      {doc.planesRefuerzoCompletados}/{doc.planesRefuerzoCreados}
                    </p>
                  </div>
                </div>

                {/* Calificación de los Estudiantes por Criterio */}
                <div className="rounded-2xl border border-navy-100 bg-white p-4 space-y-3">
                  <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-gold-500 fill-gold-500" />
                    Evaluación de los Estudiantes hacia el Docente (1 al 10)
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-navy-50/70 border border-navy-100/70">
                      <div className="flex justify-between font-bold mb-1">
                        <span>Claridad explicativa (Se hace entender):</span>
                        <span className="text-navy-900">{resumen.promediosPorAspecto.claridad}/10</span>
                      </div>
                      <Progress value={resumen.promediosPorAspecto.claridad * 10} className="h-1.5" />
                    </div>
                    <div className="p-3 rounded-xl bg-navy-50/70 border border-navy-100/70">
                      <div className="flex justify-between font-bold mb-1">
                        <span>Metodología y Didáctica:</span>
                        <span className="text-navy-900">{resumen.promediosPorAspecto.metodologia}/10</span>
                      </div>
                      <Progress value={resumen.promediosPorAspecto.metodologia * 10} className="h-1.5" />
                    </div>
                    <div className="p-3 rounded-xl bg-navy-50/70 border border-navy-100/70">
                      <div className="flex justify-between font-bold mb-1">
                        <span>Paciencia y Refuerzo a rezagados:</span>
                        <span className="text-navy-900">{resumen.promediosPorAspecto.acompanamiento}/10</span>
                      </div>
                      <Progress value={resumen.promediosPorAspecto.acompanamiento * 10} className="h-1.5" />
                    </div>
                    <div className="p-3 rounded-xl bg-navy-50/70 border border-navy-100/70">
                      <div className="flex justify-between font-bold mb-1">
                        <span>Puntualidad y Cumplimiento:</span>
                        <span className="text-navy-900">{resumen.promediosPorAspecto.puntualidad}/10</span>
                      </div>
                      <Progress value={resumen.promediosPorAspecto.puntualidad * 10} className="h-1.5" />
                    </div>
                  </div>
                </div>

                {/* Comentarios de estudiantes recibidos */}
                <div className="space-y-2">
                  <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider">
                    Comentarios y Sugerencias de Estudiantes:
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {resumen.comentariosRecientes.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-navy-200 p-3 text-xs text-navy-400">
                        Aún no hay recomendaciones escritas para este profesor.
                      </p>
                    ) : resumen.comentariosRecientes.map((c) => (
                      <div key={c.id} className="rounded-xl border border-navy-100 bg-navy-50/60 p-3 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-[11px] text-navy-800">
                          <span>{c.estudianteNombre} ({c.grado})</span>
                          <span className="text-gold-700 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-gold-500 text-gold-500" /> {c.promedio}/10
                          </span>
                        </div>
                        <p className="text-navy-600 italic">"{c.comentario}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fortalezas vs En qué está fallando */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-emerald-50/80 p-3.5 border border-emerald-200 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-900 block flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Fortalezas Registradas:
                    </span>
                    <ul className="text-xs text-emerald-950 space-y-1">
                      {doc.fortalezasDocentes.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-wine-50/80 p-3.5 border border-wine-200 space-y-1.5">
                    <span className="text-xs font-bold text-wine-900 block flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-wine-600" />
                      En qué está fallando / Puntos a Corregir:
                    </span>
                    <ul className="text-xs text-wine-950 space-y-1">
                      {doc.fallasDocenciaOportunidades.map((fallo, i) => (
                        <li key={i}>• {fallo}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Acciones directivas */}
                <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                  <Button variant="outline" size="sm" onClick={() => setDocenteSeleccionadoExpediente(null)}>
                    Cerrar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-navy-800 hover:bg-navy-900 text-white font-bold"
                    onClick={() => {
                      setDocenteSeleccionadoExpediente(null)
                      setDocenteParaDirectriz(doc)
                      setTextoDirectriz(`Directriz para ${doc.profesor} (${doc.materiaNombre}): `)
                    }}
                  >
                    <Send className="mr-1.5 h-3.5 w-3.5 text-gold-400" />
                    Emitir Directriz a este Docente
                  </Button>
                </div>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
