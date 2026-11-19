import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  AlertTriangle,
  TrendingUp,
  Award,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  BookOpen,
  MessageCircle,
  Save,
  Sparkles,
  Layers,
  FolderOpen,
  ArrowLeft,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { obtenerIdInstitucion } from '@/lib/scoring'
import { areas, type AreaId, getArea } from '@/data/areas'
import { institucionesAliadas } from '@/data/institutional'
import {
  profesoresPorMateria,
  obtenerEstudiantesPorMateria,
  guardarObservacionDocente,
  type DetalleEstudianteMateria,
  type EstadoRendimiento,
} from '@/data/teacherData'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

const estadoInfo: Record<
  EstadoRendimiento,
  { label: string; badgeVariant: 'success' | 'outline' | 'wine' | 'gold'; colorClass: string; bgClass: string; icon: typeof CheckCircle2 }
> = {
  sobresaliente: {
    label: 'Sobresaliente',
    badgeVariant: 'success',
    colorClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50 border-emerald-200',
    icon: Award,
  },
  al_dia: {
    label: 'Al día',
    badgeVariant: 'outline',
    colorClass: 'text-navy-700',
    bgClass: 'bg-navy-50 border-navy-200',
    icon: CheckCircle2,
  },
  quedado: {
    label: 'Quedado - Requiere Refuerzo',
    badgeVariant: 'gold',
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
  },
  critico: {
    label: 'Crítico - Atención Urgente',
    badgeVariant: 'wine',
    colorClass: 'text-wine-700',
    bgClass: 'bg-wine-50 border-wine-200',
    icon: AlertCircle,
  },
}

interface AlumnoPanel {
  correo: string
  nombre: string
  grado: string
  institucion?: string
  ficha?: DetalleEstudianteMateria
}

export default function TeacherDashboard() {
  const { usuario } = useAuth()
  const esAdmin = usuario?.rol === 'admin'

  // Determinar materia asignada o permitir cambiar si es admin / coordinador
  const materiaInicial: AreaId = usuario?.materia || 'matematicas'
  const [materiaActiva, setMateriaActiva] = useState<AreaId>(materiaInicial)

  // Filtros
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'refuerzo' | 'al_dia' | 'sobresaliente'>('todos')
  const [filtroGrado, setFiltroGrado] = useState<string>('todos')

  // Modal de detalle de estudiante
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<DetalleEstudianteMateria | null>(null)
  const [observacionTemp, setObservacionTemp] = useState('')
  const [mensajeGuardado, setMensajeGuardado] = useState(false)
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState<string | null>(null)

  const infoProfesor = profesoresPorMateria[materiaActiva]
  const areaConfig = getArea(materiaActiva)
  const AreaIcon = areaConfig?.icon || BookOpen

  const institucionesDocente = useMemo(() => {
    const nombres = esAdmin
      ? institucionesAliadas.map((institucion) => institucion.nombre)
      : usuario?.instituciones?.length
        ? usuario.instituciones
        : usuario?.institucion
          ? usuario.institucion.split(/\s*&\s*/)
          : []
    const unicas = new Map<string, { id: string; nombre: string }>()
    nombres.forEach((nombre) => {
      const id = obtenerIdInstitucion(nombre)
      const oficial = institucionesAliadas.find((institucion) => institucion.id === id)
      unicas.set(id, { id, nombre: oficial?.sigla ? `${oficial.sigla} · ${oficial.nombre}` : oficial?.nombre ?? nombre })
    })
    return [...unicas.values()]
  }, [esAdmin, usuario])

  // Estudiantes de la materia seleccionada
  const estudiantesMateria = useMemo(() => {
    if (!institucionSeleccionada) return []
    return obtenerEstudiantesPorMateria(materiaActiva).filter(
      (estudiante) => obtenerIdInstitucion(estudiante.institucion) === institucionSeleccionada
    )
  }, [materiaActiva, institucionSeleccionada])

  const metricas = useMemo(() => {
    const total = estudiantesMateria.length
    if (!total) {
      return {
        total: 0,
        promedioGeneral: 0,
        sobresalientes: 0,
        alDia: 0,
        quedados: 0,
        criticos: 0,
        tasaAprobacion: 0,
        requierenRefuerzoTotal: 0,
      }
    }
    const sobresalientes = estudiantesMateria.filter((estudiante) => estudiante.estado === 'sobresaliente').length
    const alDia = estudiantesMateria.filter((estudiante) => estudiante.estado === 'al_dia').length
    const quedados = estudiantesMateria.filter((estudiante) => estudiante.estado === 'quedado').length
    const criticos = estudiantesMateria.filter((estudiante) => estudiante.estado === 'critico').length
    return {
      total,
      promedioGeneral: Math.round(estudiantesMateria.reduce((total, estudiante) => total + estudiante.promedioMateria, 0) / total),
      sobresalientes,
      alDia,
      quedados,
      criticos,
      tasaAprobacion: Math.round(((sobresalientes + alDia) / total) * 100),
      requierenRefuerzoTotal: quedados + criticos,
    }
  }, [estudiantesMateria])

  // Obtener grados únicos
  const gradosDisponibles = useMemo(() => {
    const set = new Set<string>()
    estudiantesMateria.forEach((e) => set.add(e.grado))
    return Array.from(set).sort()
  }, [estudiantesMateria])

  // Filtrado de estudiantes
  const estudiantesFiltrados = useMemo(() => {
    return estudiantesMateria.filter((est) => {
      const coincideBusqueda =
        est.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        est.grado.toLowerCase().includes(busqueda.toLowerCase()) ||
        est.institucion.toLowerCase().includes(busqueda.toLowerCase())

      if (!coincideBusqueda) return false

      if (filtroGrado !== 'todos' && est.grado !== filtroGrado) return false

      if (filtroEstado === 'refuerzo') {
        return est.estado === 'quedado' || est.estado === 'critico'
      }
      if (filtroEstado === 'al_dia') {
        return est.estado === 'al_dia'
      }
      if (filtroEstado === 'sobresaliente') {
        return est.estado === 'sobresaliente'
      }
      return true
    })
  }, [estudiantesMateria, busqueda, filtroEstado, filtroGrado])

  const alumnosPanel = useMemo(() => {
    const alumnos = new Map<string, AlumnoPanel>()
    estudiantesFiltrados.forEach((estudiante) => {
      const correo = estudiante.correo.trim().toLowerCase()
      alumnos.set(correo, {
        correo,
        nombre: estudiante.nombre,
        grado: estudiante.grado,
        institucion: estudiante.institucion,
        ficha: estudiante,
      })
    })

    return [...alumnos.values()]
  }, [estudiantesFiltrados])

  const abrirDetalleEstudiante = (estudiante: DetalleEstudianteMateria) => {
    setEstudianteSeleccionado(estudiante)
    setObservacionTemp(estudiante.observacionGuardada || '')
    setMensajeGuardado(false)
  }

  const handleGuardarObservacion = () => {
    if (!estudianteSeleccionado) return
    guardarObservacionDocente(materiaActiva, estudianteSeleccionado.id, observacionTemp)
    setMensajeGuardado(true)
    setTimeout(() => setMensajeGuardado(false), 3000)

    // Actualizar estudiante en memoria
    setEstudianteSeleccionado((prev) => (prev ? { ...prev, observacionGuardada: observacionTemp } : null))
  }

  const generarMensajeWhatsApp = (est: DetalleEstudianteMateria) => {
    const temas = est.temasPorReforzar.slice(0, 2).join(', ')
    const texto = `Hola ${est.nombre}, te saluda el ${infoProfesor.nombreProfesor} de ${infoProfesor.materiaNombre} de ImpulsarSAS. Hemos revisado tu seguimiento académico y queremos invitarte a una sesión de refuerzo en los temas: ${temas}. ¿Cuándo tienes disponibilidad para acordar el horario?`
    return `https://wa.me/${est.telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(texto)}`
  }

  if (usuario?.rol === 'docente' && !usuario.materia) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        Tu cuenta docente aún no tiene una materia asignada. Contacta a la administración.
      </div>
    )
  }

  if (usuario?.rol !== 'docente' && usuario?.rol !== 'admin') {
    return <Navigate to="/panel" replace />
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Encabezado del Portal Docente */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 p-6 sm:p-8 text-white shadow-xl border border-navy-700 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-400/30 shadow-inner">
              <AreaIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/20 px-3 py-0.5 text-xs font-bold text-gold-300 border border-gold-400/30">
                  <Sparkles className="h-3 w-3" />
                  Módulo de Gestión Docente por Materia
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-navy-200">
                  {usuario?.institucion || 'I.E. Simón Bolívar'}
                </span>
              </div>
              <h1 className="font-heading text-2xl font-bold sm:text-3xl text-white">
                {infoProfesor.materiaNombre}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-navy-200">
                Docente a cargo: <strong className="text-white">{infoProfesor.nombreProfesor}</strong> · {infoProfesor.descripcion}
              </p>
            </div>
          </div>

          {esAdmin ? (
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/10">
              <span className="text-[11px] font-bold text-gold-300 uppercase px-2 tracking-wider">
                Vista General de Materias:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {areas.map((a) => {
                const activo = materiaActiva === a.id
                const Icon = a.icon
                return (
                  <button
                    key={a.id}
                    onClick={() => setMateriaActiva(a.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      activo
                        ? 'bg-gold-500 text-navy-950 font-bold shadow-md scale-105'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{a.nombreCorto}</span>
                  </button>
                )
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold uppercase text-gold-300">
              Materia asignada: {infoProfesor.materiaNombre}
            </div>
          )}
        </div>
      </motion.div>

      {!institucionSeleccionada ? (
        <section className="space-y-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-navy-800">Mis colegios</h2>
            <p className="text-xs text-navy-400">Selecciona una institución para ver únicamente sus alumnos y resultados.</p>
          </div>
          <div className="divide-y divide-navy-100 border-y border-navy-100">
            {institucionesDocente.map((institucion) => (
              <button
                key={institucion.id}
                type="button"
                onClick={() => {
                  setInstitucionSeleccionada(institucion.id)
                  setFiltroGrado('todos')
                  setFiltroEstado('todos')
                }}
                className="flex w-full items-center gap-4 py-4 text-left hover:bg-navy-50/70"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <FolderOpen className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-navy-900">{institucion.nombre}</span>
                  <span className="text-xs text-navy-500">{infoProfesor.materiaNombre}</span>
                </span>
                <span className="text-xs font-semibold text-navy-500">
                  {obtenerEstudiantesPorMateria(materiaActiva).filter((estudiante) => obtenerIdInstitucion(estudiante.institucion) === institucion.id).length} alumnos
                </span>
              </button>
            ))}
            {institucionesDocente.length === 0 && <p className="py-6 text-sm text-navy-400">No hay instituciones asignadas a esta cuenta.</p>}
          </div>
        </section>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 pb-4">
          <div>
            <p className="text-xs font-bold uppercase text-gold-700">Carpeta institucional</p>
            <h2 className="font-heading text-lg font-bold text-navy-900">
              {institucionesDocente.find((institucion) => institucion.id === institucionSeleccionada)?.nombre}
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            setInstitucionSeleccionada(null)
          }}>
            <ArrowLeft className="h-4 w-4" /> Volver a colegios
          </Button>
        </div>
      )}

      {institucionSeleccionada && <>
      {/* Tarjetas de Métricas de la Materia */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-navy-400">Promedio de Materia</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-heading text-3xl font-bold text-navy-800">{metricas.promedioGeneral}</p>
                <span className="text-xs font-semibold text-navy-400">/ 100 pts</span>
              </div>
              <p className="mt-1 text-[11px] text-navy-500">
                Meta institucional:{' '}
                <strong className={metricas.promedioGeneral >= infoProfesor.metaPromedio ? 'text-emerald-600' : 'text-wine-600'}>
                  {infoProfesor.metaPromedio} pts
                </strong>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card
            className={`border-amber-200 bg-amber-50/40 shadow-sm transition-all cursor-pointer hover:border-amber-400 hover:shadow-md ${
              filtroEstado === 'refuerzo' ? 'ring-2 ring-amber-500 bg-amber-50' : ''
            }`}
            onClick={() => setFiltroEstado(filtroEstado === 'refuerzo' ? 'todos' : 'refuerzo')}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-800">Requieren Refuerzo</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-heading text-3xl font-bold text-amber-800">{metricas.requierenRefuerzoTotal}</p>
                <span className="text-xs font-bold text-amber-700">alumnos</span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-amber-700 flex items-center gap-1">
                <span>{metricas.quedados} Quedados</span> ·{' '}
                <span className="text-wine-600 font-bold">{metricas.criticos} Críticos</span>
                <span className="ml-auto underline text-[10px]">Filtrar</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-navy-400">Al Día / Destacados</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-heading text-3xl font-bold text-navy-800">
                  {metricas.sobresalientes + metricas.alDia}
                </p>
                <span className="text-xs font-semibold text-navy-400">alumnos</span>
              </div>
              <p className="mt-1 text-[11px] text-navy-500">
                {metricas.sobresalientes} Sobresalientes · {metricas.alDia} Con buen ritmo
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-navy-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-navy-400">Tasa de Aprobación</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-white">
                  <GraduationCap className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-heading text-3xl font-bold text-navy-800">{metricas.tasaAprobacion}%</p>
                <span className="text-xs font-semibold text-emerald-600">en {infoProfesor.materiaNombre}</span>
              </div>
              <div className="mt-2">
                <Progress value={metricas.tasaAprobacion} className="h-2 bg-navy-100" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alerta si hay estudiantes quedados */}
      {metricas.requierenRefuerzoTotal > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 p-4 sm:p-5 text-amber-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-amber-900">
                Atención Pedagógica: {metricas.requierenRefuerzoTotal} estudiantes rezagados en {infoProfesor.materiaNombre}
              </h3>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Haz clic en cualquier estudiante de la lista para revisar su diagnóstico específico, ver los temas exactos a reforzar y enviarle su plan de nivelación.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 shadow-sm"
            onClick={() => setFiltroEstado('refuerzo')}
          >
            <AlertCircle className="mr-1.5 h-4 w-4" />
            Ver {metricas.requierenRefuerzoTotal} estudiantes a reforzar
          </Button>
        </motion.div>
      )}

      {/* Controles de Búsqueda y Filtros de Estudiantes */}
      <Card className="border-navy-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-navy-100">
            <div>
              <h2 className="font-heading text-lg font-bold text-navy-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-navy-700" />
                Estudiantes Matriculados en {infoProfesor.materiaNombre}
              </h2>
              <p className="text-xs text-navy-400">
                Mostrando {alumnosPanel.length} alumnos de {infoProfesor.materiaNombre}
              </p>
            </div>

            {/* Buscador */}
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <Input
                placeholder="Buscar por nombre o salón..."
                className="pl-9 h-10 text-sm"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          {/* Barra de Filtros rápidos */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFiltroEstado('todos')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  filtroEstado === 'todos'
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                Todos ({estudiantesMateria.length})
              </button>
              <button
                onClick={() => setFiltroEstado('refuerzo')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  filtroEstado === 'refuerzo'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Quedados / Refuerzo ({metricas.requierenRefuerzoTotal})
              </button>
              <button
                onClick={() => setFiltroEstado('al_dia')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  filtroEstado === 'al_dia'
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                Al día ({metricas.alDia})
              </button>
              <button
                onClick={() => setFiltroEstado('sobresaliente')}
                className={`flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  filtroEstado === 'sobresaliente'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                Sobresalientes ({metricas.sobresalientes})
              </button>
            </div>

            {/* Selector de Grado */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-navy-500">Filtrar por grupo:</span>
              <select
                value={filtroGrado}
                onChange={(e) => setFiltroGrado(e.target.value)}
                className="rounded-xl border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-600 shadow-sm"
              >
                <option value="todos">Todos los grupos</option>
                {gradosDisponibles.map((g) => (
                  <option key={g} value={g}>
                    Grado {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 divide-y divide-navy-100 border-y border-navy-100">
            {alumnosPanel.map((alumno) => (
              <div key={alumno.correo} className="flex items-center gap-3 py-3">
                <Avatar className="h-9 w-9 shrink-0 border border-navy-100">
                  <AvatarFallback className="bg-navy-50 text-xs font-bold text-navy-700">{iniciales(alumno.nombre)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  {alumno.ficha ? (
                    <button type="button" className="block max-w-full truncate text-left text-sm font-semibold text-navy-800 hover:text-gold-700" onClick={() => abrirDetalleEstudiante(alumno.ficha!)} title="Abrir ficha académica">
                      {alumno.nombre}
                    </button>
                  ) : <p className="truncate text-sm font-semibold text-navy-800">{alumno.nombre}</p>}
                  <p className="truncate text-[11px] text-navy-400">{alumno.grado}{alumno.institucion ? ` · ${alumno.institucion}` : ''}</p>
                </div>
                {alumno.ficha && <Button type="button" size="sm" variant="outline" onClick={() => abrirDetalleEstudiante(alumno.ficha!)}>Ver ficha</Button>}
              </div>
            ))}
            {alumnosPanel.length === 0 && <p className="py-8 text-center text-xs text-navy-400">No se encontraron alumnos en este colegio con esos filtros.</p>}
          </div>
        </CardContent>
      </Card>
      </>}

      {/* Modal / Ficha Detallada del Estudiante */}
      <Dialog
        open={Boolean(estudianteSeleccionado)}
        onOpenChange={(abierto) => {
          if (!abierto) setEstudianteSeleccionado(null)
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          {estudianteSeleccionado && (
            <div className="space-y-6">
              {/* Encabezado del estudiante */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-100">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-gold-400 shadow-md">
                    <AvatarFallback className="text-base font-bold text-navy-800 bg-gold-50">
                      {iniciales(estudianteSeleccionado.nombre)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-xl font-bold text-navy-800">
                        {estudianteSeleccionado.nombre}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                          estadoInfo[estudianteSeleccionado.estado].bgClass
                        } ${estadoInfo[estudianteSeleccionado.estado].colorClass}`}
                      >
                        {estadoInfo[estudianteSeleccionado.estado].label}
                      </span>
                    </div>
                    <p className="text-xs text-navy-500 mt-0.5">
                      Grado {estudianteSeleccionado.grado} · {estudianteSeleccionado.institucion} · {estudianteSeleccionado.correo}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:pl-4 border-navy-100 shrink-0">
                  <span className="text-[11px] font-semibold text-navy-400 uppercase tracking-wide">
                    Promedio {infoProfesor.materiaNombre}
                  </span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="font-heading text-3xl font-bold text-navy-800">
                      {estudianteSeleccionado.promedioMateria}
                    </span>
                    <span className="text-xs font-semibold text-navy-400">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Diagnóstico Pedagógico del Profesor */}
              <div className="rounded-2xl bg-navy-50/80 p-4 border border-navy-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="h-4 w-4 text-gold-600" />
                  <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider">
                    Diagnóstico Pedagógico en {infoProfesor.materiaNombre}
                  </h4>
                </div>
                <p className="text-xs text-navy-700 leading-relaxed">
                  {estudianteSeleccionado.diagnosticoDocente}
                </p>
              </div>

              {/* Métricas clave en esta materia */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                  <span className="text-[10px] font-semibold text-navy-400 uppercase">Evaluaciones</span>
                  <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">
                    {estudianteSeleccionado.evaluacionesRealizadas}
                  </p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                  <span className="text-[10px] font-semibold text-navy-400 uppercase">Tasa de Aciertos</span>
                  <p className="font-heading text-lg font-bold text-emerald-600 mt-0.5">
                    {estudianteSeleccionado.tasaAciertos}%
                  </p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                  <span className="text-[10px] font-semibold text-navy-400 uppercase">Tiempo Promedio</span>
                  <p className="font-heading text-lg font-bold text-navy-800 mt-0.5">
                    {estudianteSeleccionado.tiempoPromedioMin} min
                  </p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-white p-3 text-center">
                  <span className="text-[10px] font-semibold text-navy-400 uppercase">Última Actividad</span>
                  <p className="font-heading text-xs font-bold text-navy-700 mt-1">
                    {estudianteSeleccionado.ultimaActividad}
                  </p>
                </div>
              </div>

              {/* Desglose de Competencias de la Materia */}
              <div className="space-y-3">
                <h4 className="font-heading text-sm font-bold text-navy-800 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-navy-600" />
                  Desempeño por Competencias ({infoProfesor.materiaNombre})
                </h4>
                <div className="space-y-2.5">
                  {estudianteSeleccionado.competencias.map((comp) => (
                    <div key={comp.nombre} className="rounded-xl border border-navy-100 bg-white p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-navy-800">{comp.nombre}</span>
                          <p className="text-[10px] text-navy-400">{comp.descripcion}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-heading font-bold text-navy-800">{comp.puntaje}%</span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              comp.estado === 'dominado'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : comp.estado === 'en_progreso'
                                ? 'bg-navy-50 text-navy-700 border border-navy-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {comp.estado === 'dominado'
                              ? 'Dominado'
                              : comp.estado === 'en_progreso'
                              ? 'En progreso'
                              : 'Por reforzar'}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={comp.puntaje}
                        className={`h-1.5 ${
                          comp.puntaje >= 75
                            ? '[&>div]:bg-emerald-600 bg-emerald-100'
                            : comp.puntaje >= 60
                            ? '[&>div]:bg-navy-600 bg-navy-100'
                            : '[&>div]:bg-amber-500 bg-amber-100'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Temas Dominados vs Temas por Reforzar */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Por Reforzar */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
                  <h5 className="font-heading text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Temas donde está quedado y debe reforzar
                  </h5>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {estudianteSeleccionado.temasPorReforzar.map((tema, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[10px] font-bold text-amber-800">
                          {idx + 1}
                        </span>
                        <span>{tema}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dominados */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                  <h5 className="font-heading text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Temas dominados con solvencia
                  </h5>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {estudianteSeleccionado.temasDominados.map((tema, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-800">
                          ✓
                        </span>
                        <span>{tema}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Plan de Refuerzo Sugerido */}
              <div className="rounded-2xl border border-navy-100 bg-white p-4 space-y-2 shadow-sm">
                <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-gold-600" />
                  Plan de Refuerzo Recomendado para {estudianteSeleccionado.nombre}
                </h4>
                <div className="space-y-1.5">
                  {estudianteSeleccionado.planRefuerzoSugerido.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy-700 bg-navy-50/60 p-2 rounded-xl">
                      <div className="h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historial de Evaluaciones en esta materia */}
              <div className="space-y-3">
                <h4 className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-navy-600" />
                  Historial de Evaluaciones en {infoProfesor.materiaNombre}
                </h4>
                <div className="divide-y divide-navy-50 rounded-xl border border-navy-100 bg-white overflow-hidden text-xs">
                  {estudianteSeleccionado.historialEvaluaciones.map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between p-3 hover:bg-navy-50/40">
                      <div>
                        <p className="font-bold text-navy-800">{ev.titulo}</p>
                        <p className="text-[11px] text-navy-400">
                          {ev.fecha} · {ev.aciertos} de {ev.totalPreguntas} aciertos · {ev.tiempoMin} min
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-heading font-bold text-sm text-navy-800">{ev.puntaje} pts</span>
                        <p
                          className={`text-[10px] font-bold ${
                            ev.puntaje >= 70 ? 'text-emerald-600' : 'text-amber-700'
                          }`}
                        >
                          {ev.estado}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cuaderno de Observaciones y Tareas del Docente */}
              <div className="rounded-2xl border border-navy-200 bg-navy-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="obs-docente" className="font-heading text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Save className="h-4 w-4 text-navy-700" />
                    Anotación y Compromiso del Docente ({infoProfesor.nombreProfesor})
                  </label>
                  {mensajeGuardado && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Guardado
                    </span>
                  )}
                </div>
                <textarea
                  id="obs-docente"
                  rows={3}
                  value={observacionTemp}
                  onChange={(e) => setObservacionTemp(e.target.value)}
                  placeholder="Escribe una observación, compromiso de refuerzo o tarea asignada a este estudiante..."
                  className="w-full rounded-xl border border-navy-200 bg-white p-3 text-xs text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-600"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleGuardarObservacion} className="bg-navy-800 hover:bg-navy-900 text-white font-semibold">
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    Guardar observación
                  </Button>
                </div>
              </div>

              {/* Acciones de Contacto */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-navy-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEstudianteSeleccionado(null)}
                  className="border-navy-200 text-navy-600"
                >
                  Cerrar ficha
                </Button>

                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                  asChild
                >
                  <a
                    href={generarMensajeWhatsApp(estudianteSeleccionado)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    Enviar plan de refuerzo por WhatsApp ({estudianteSeleccionado.telefono})
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
