import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  AlertCircle,
  Download,
  KeyRound,
  Eye,
  PlusCircle,
  MessageCircle,
  Mail,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'

interface PruebaOficial {
  id: string
  titulo: string
  sesion: string
  preguntas: number
  duracionMin: number
  areas: string[]
  habilitada: boolean
  fechaProgramada: string
  colegioAsignado: string
}

const pruebasIniciales: PruebaOficial[] = [
  {
    id: 'pre-1',
    titulo: 'Cuadernillo Oficial Pre-ICFES — Sesión 1',
    sesion: 'Sesión Mañana (4h 30m)',
    preguntas: 120,
    duracionMin: 270,
    areas: ['Matemáticas (25)', 'Lectura Crítica (41)', 'Sociales y Ciudadanas 1 (25)', 'Ciencias Naturales 1 (29)'],
    habilitada: false,
    fechaProgramada: '15 de Octubre 2026',
    colegioAsignado: 'Colegios Aliados ImpulsarSAS (Grados 11°)',
  },
  {
    id: 'pre-2',
    titulo: 'Cuadernillo Oficial Pre-ICFES — Sesión 2',
    sesion: 'Sesión Tarde (4h 30m)',
    preguntas: 120,
    duracionMin: 270,
    areas: ['Sociales y Ciudadanas 2 (25)', 'Ciencias Naturales 2 (29)', 'Matemáticas 2 (25)', 'Inglés (41)'],
    habilitada: false,
    fechaProgramada: '16 de Octubre 2026',
    colegioAsignado: 'Colegios Aliados ImpulsarSAS (Grados 11°)',
  },
  {
    id: 'pre-3',
    titulo: 'Prueba Diagnóstica de Entrada Pre-ICFES 2026',
    sesion: 'Sesión Única (3h)',
    preguntas: 80,
    duracionMin: 180,
    areas: ['Matemáticas', 'Lectura', 'Ciencias', 'Sociales', 'Inglés'],
    habilitada: false,
    fechaProgramada: '5 de Noviembre 2026',
    colegioAsignado: 'Nuevas Instituciones en Convenio',
  },
  {
    id: 'pre-4',
    titulo: 'Gran Simulacro Nacional ICFES Saber 11',
    sesion: 'Doble Jornada Completa',
    preguntas: 240,
    duracionMin: 540,
    areas: ['5 Competencias Oficiales ICFES'],
    habilitada: false,
    fechaProgramada: '28 de Noviembre 2026',
    colegioAsignado: 'Convocatoria General Departamental',
  },
]

export default function PreIcfesExams() {
  const { usuario, iniciarSesion } = useAuth()
  const [desbloqueadoLocal, setDesbloqueadoLocal] = useState(false)
  const [claveInput, setClaveInput] = useState('')
  const [errorClave, setErrorClave] = useState('')
  const [modalAdminAbierto, setModalAdminAbierto] = useState(false)
  const [modalNuevaPrueba, setModalNuevaPrueba] = useState(false)
  const [pruebas, setPruebas] = useState<PruebaOficial[]>(pruebasIniciales)
  const [mensajeExito, setMensajeExito] = useState('')

  // Formulario nueva prueba
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevaSesion, setNuevaSesion] = useState('Sesión Mañana (4h 30m)')
  const [nuevoColegio, setNuevoColegio] = useState('I.E. Simón Bolívar')
  const [nuevaFecha, setNuevaFecha] = useState('')

  if (usuario?.rol === 'docente') {
    return <Navigate to="/simulacros" replace />
  }

  const esAdmin = usuario?.rol === 'admin' || desbloqueadoLocal

  const handleDesbloquear = (e: React.FormEvent) => {
    e.preventDefault()
    const claveLimpia = claveInput.trim()
    if (claveLimpia === 'Demo2026*' || claveLimpia === 'admin2026' || claveLimpia === 'impulsar2026') {
      setDesbloqueadoLocal(true)
      setErrorClave('')
      setModalAdminAbierto(false)
      setMensajeExito('¡Acceso concedido como Administradora!')
      setTimeout(() => setMensajeExito(''), 4000)
    } else {
      setErrorClave('Clave de administradora incorrecta. Verifica e intenta nuevamente.')
    }
  }

  const handleToggleHabilitada = (id: string) => {
    setPruebas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, habilitada: !p.habilitada } : p))
    )
  }

  const handleCrearPrueba = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoTitulo.trim() || !nuevaFecha.trim()) return

    const nueva: PruebaOficial = {
      id: `pre-${Date.now()}`,
      titulo: nuevoTitulo,
      sesion: nuevaSesion,
      preguntas: 120,
      duracionMin: 270,
      areas: ['Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas', 'Inglés'],
      habilitada: false,
      fechaProgramada: nuevaFecha,
      colegioAsignado: nuevoColegio,
    }

    setPruebas([nueva, ...pruebas])
    setModalNuevaPrueba(false)
    setNuevoTitulo('')
    setNuevaFecha('')
    setMensajeExito(`Prueba "${nuevoTitulo}" programada exitosamente.`)
    setTimeout(() => setMensajeExito(''), 4000)
  }

  const cambiarARolAdmin = () => {
    iniciarSesion({
      nombre: 'Administradora ImpulsarSAS',
      correo: 'admin@impulsasaber.demo',
      institucion: 'ImpulsarSAS Educación',
      grado: 'Dirección Académica',
      rol: 'admin',
    })
    setDesbloqueadoLocal(true)
    setModalAdminAbierto(false)
  }

  const bloquearModulo = () => {
    setDesbloqueadoLocal(false)
    if (usuario?.rol === 'admin') {
      iniciarSesion({
        nombre: 'Estudiante',
        correo: 'estudiante@impulsasaber.edu.co',
        institucion: 'I.E. Simón Bolívar',
        grado: '11°',
        rol: 'estudiante',
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-navy-900 mb-1.5 border border-gold-300">
            {esAdmin ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-800">Administración Activa ImpulsarSAS</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                <span className="text-navy-900 font-bold">Exclusivo para Estudiantes ImpulsarSAS</span>
              </>
            )}
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-800 sm:text-3xl">
            Pruebas PRE ICFES Oficiales
          </h1>
          <p className="mt-1 text-navy-400">
            {esAdmin
              ? 'Gestión de cuadernillos, programación institucional y control de acceso a pruebas oficiales.'
              : 'Cuadernillos oficiales de simulación institucional y diagnóstico Saber 11 para estudiantes del programa Impulsar.'}
          </p>
        </motion.div>

        <div>
          {esAdmin ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold"
                onClick={() => setModalNuevaPrueba(true)}
              >
                <PlusCircle className="mr-1.5 h-4 w-4" />
                Programar nueva prueba
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={bloquearModulo}
                className="text-xs text-navy-500 hover:text-wine-600"
              >
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Bloquear módulo
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="bg-navy-800 hover:bg-navy-900 text-white font-semibold shadow-sm"
              onClick={() => setModalAdminAbierto(true)}
            >
              <KeyRound className="mr-1.5 h-4 w-4 text-gold-400" />
              Acceso Administradora
            </Button>
          )}
        </div>
      </div>

      {mensajeExito && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          {mensajeExito}
        </motion.div>
      )}

      {!esAdmin ? (
        /* VISTA EXCLUSIVA / BLOQUEADA PARA ESTUDIANTES */
        <div className="space-y-8">
          {/* Banner de argumentación institucional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-8 sm:p-12 text-white shadow-xl border border-navy-700"
          >
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-3.5 py-1 text-xs font-bold text-gold-300 border border-gold-400/30 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Programa Académico Pre-ICFES Saber 11
              </div>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight">
                Módulo reservado exclusivamente para estudiantes matriculados en ImpulsarSAS
              </h2>
              <p className="mt-4 text-sm text-navy-200 sm:text-base leading-relaxed">
                Este espacio contiene los <strong>cuadernillos oficiales de aplicación Pre-ICFES por sesiones</strong> (Sesión 1 y Sesión 2). Están diseñados bajo los estándares y matrices de evaluación del ICFES, y su acceso hace parte del plan formativo integral de nuestra institución.
              </p>

              {/* Argumentos pedagógicos */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400 mb-2 font-bold text-sm">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Evaluación Calibrada
                  </h4>
                  <p className="text-[11px] text-navy-300 leading-normal">
                    Preguntas estructuradas con baremos oficiales y tiempos reales de jornada ICFES.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400 mb-2 font-bold text-sm">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Retroalimentación Guiada
                  </h4>
                  <p className="text-[11px] text-navy-300 leading-normal">
                    Acompañamiento docente y análisis estadístico individual para estudiantes de Impulsar.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400 mb-2 font-bold text-sm">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Custodia por Administradora
                  </h4>
                  <p className="text-[11px] text-navy-300 leading-normal">
                    La apertura de cada cuadernillo es gestionada únicamente por la dirección académica.
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-lg"
                  asChild
                >
                  <a
                    href="https://wa.me/573165811216?text=Hola,%20soy%20estudiante%20y%20deseo%20matricularme%20o%20solicitar%20mi%20acceso%20a%20las%20Pruebas%20PRE%20ICFES%20de%20ImpulsarSAS."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 text-navy-950" />
                    Solicitar inscripción en ImpulsarSAS
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-semibold"
                  onClick={() => setModalAdminAbierto(true)}
                >
                  <KeyRound className="mr-2 h-4 w-4 text-gold-400" />
                  Acceso Administradora / Docente
                </Button>
              </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
              <FileText className="h-96 w-96 text-white" />
            </div>
          </motion.div>

          {/* Cuadernillos oficiales en custodia */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-900">
                  Banco de Cuadernillos Institucionales Pre-ICFES
                </h3>
                <p className="text-xs text-navy-400">
                  Pruebas administradas y habilitadas bajo el calendario oficial de ImpulsarSAS
                </p>
              </div>
              <Badge variant="outline" className="border-gold-300 bg-gold-50 text-navy-800 text-xs font-semibold">
                {pruebas.length} pruebas oficiales
              </Badge>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pruebas.map((prueba, i) => (
                <motion.div
                  key={prueba.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border-navy-100 bg-white shadow-sm relative overflow-hidden transition-all hover:border-gold-300">
                    <div className="absolute top-0 right-0 bg-navy-800 text-gold-400 px-3 py-1 text-[11px] font-bold rounded-bl-xl flex items-center gap-1.5 shadow-sm">
                      <Lock className="h-3 w-3" />
                      Exclusivo Impulsar
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-navy-400 mb-2">
                        <Calendar className="h-3.5 w-3.5 text-gold-600" />
                        {prueba.fechaProgramada}
                      </div>
                      <h4 className="font-heading text-base font-bold text-navy-800 mb-1 pr-20">
                        {prueba.titulo}
                      </h4>
                      <p className="text-xs text-navy-500 mb-3">{prueba.sesion} · {prueba.preguntas} preguntas oficiales</p>

                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {prueba.areas.map((area, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-navy-50 px-2 py-0.5 text-[10px] font-semibold text-navy-700 border border-navy-100"
                          >
                            {area}
                          </span>
                        ))}
                      </div>

                      <div className="rounded-xl border border-navy-100 bg-navy-50/70 p-3 text-xs text-navy-600 flex items-center justify-between">
                        <span className="truncate max-w-[210px] font-medium">{prueba.colegioAsignado}</span>
                        <span className="font-bold text-gold-700 shrink-0">Habilitación por Administradora</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VISTA ADMINISTRADORA DESBLOQUEADA */
        <div className="space-y-8">
          {/* Métricas de administración */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-navy-100 bg-navy-800 text-white shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-navy-300 font-medium">Cuadernillos Oficiales</span>
                  <FileText className="h-5 w-5 text-gold-400" />
                </div>
                <p className="font-heading text-2xl font-bold">{pruebas.length}</p>
                <p className="text-[11px] text-navy-300 mt-1">Pruebas en plataforma</p>
              </CardContent>
            </Card>

            <Card className="border-navy-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-navy-400 font-medium">Colegios Citados</span>
                  <Building2 className="h-5 w-5 text-navy-700" />
                </div>
                <p className="font-heading text-2xl font-bold text-navy-800">14</p>
                <p className="text-[11px] text-navy-400 mt-1">Convenios activos 2026</p>
              </CardContent>
            </Card>

            <Card className="border-navy-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-navy-400 font-medium">Estudiantes a Evaluar</span>
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="font-heading text-2xl font-bold text-navy-800">1.840</p>
                <p className="text-[11px] text-emerald-600 mt-1">Grados 10° y 11°</p>
              </CardContent>
            </Card>

            <Card className="border-navy-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-navy-400 font-medium">Pruebas Habilitadas</span>
                  <ShieldCheck className="h-5 w-5 text-gold-500" />
                </div>
                <p className="font-heading text-2xl font-bold text-navy-800">
                  {pruebas.filter((p) => p.habilitada).length} / {pruebas.length}
                </p>
                <p className="text-[11px] text-navy-400 mt-1">Acceso en vivo para estudiantes</p>
              </CardContent>
            </Card>
          </div>

          {/* Panel de control de pruebas */}
          <Card className="shadow-md">
            <CardHeader className="p-6 border-b border-navy-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="font-heading text-xl text-navy-900">
                    Control de Cuadernillos Oficiales PRE-ICFES
                  </CardTitle>
                  <p className="text-xs text-navy-400 mt-0.5">
                    Habilita o bloquea el acceso a cada prueba según el horario y grupo institucional
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                  Modo Administradora
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pruebas.map((prueba) => (
                  <div
                    key={prueba.id}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge
                          variant={prueba.habilitada ? 'default' : 'outline'}
                          className={
                            prueba.habilitada
                              ? 'bg-emerald-600 text-white'
                              : 'border-navy-200 text-navy-500'
                          }
                        >
                          {prueba.habilitada ? 'Habilitada para estudiantes' : 'Bloqueada (Solo Administradora)'}
                        </Badge>
                        <span className="text-xs text-navy-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {prueba.fechaProgramada}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-navy-900">
                        {prueba.titulo}
                      </h4>
                      <p className="text-xs text-navy-500 mt-0.5">
                        {prueba.sesion} · {prueba.preguntas} preguntas · Asignado a: <strong>{prueba.colegioAsignado}</strong>
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {prueba.areas.map((area, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-navy-50 px-2 py-0.5 text-[10px] font-semibold text-navy-700 border border-navy-100"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-navy-100">
                      <Button
                        size="sm"
                        variant={prueba.habilitada ? 'outline' : 'primary'}
                        onClick={() => handleToggleHabilitada(prueba.id)}
                        className={
                          prueba.habilitada
                            ? 'border-wine-300 text-wine-600 hover:bg-wine-50'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }
                      >
                        {prueba.habilitada ? (
                          <>
                            <Lock className="mr-1.5 h-3.5 w-3.5" />
                            Bloquear
                          </>
                        ) : (
                          <>
                            <Unlock className="mr-1.5 h-3.5 w-3.5" />
                            Habilitar acceso
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => alert(`Descargando cuadernillo oficial de "${prueba.titulo}" en formato PDF institucional.`)}
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        PDF Cuadernillo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal para desbloqueo de Administradora */}
      <Dialog open={modalAdminAbierto} onOpenChange={setModalAdminAbierto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              <KeyRound className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center font-heading text-xl font-bold text-navy-900">
              Acceso Exclusivo Administradora
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-navy-400">
              Ingresa la clave de administradora de ImpulsarSAS para habilitar, programar y descargar las Pruebas PRE ICFES oficiales.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDesbloquear} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="claveAdmin">Clave de Administradora</Label>
              <Input
                id="claveAdmin"
                type="password"
                placeholder="Ingresa la clave..."
                value={claveInput}
                onChange={(e) => setClaveInput(e.target.value)}
                autoFocus
              />
              {errorClave && (
                <p className="text-xs font-semibold text-wine-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errorClave}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-navy-50 p-3 text-xs text-navy-600 border border-navy-100">
              <p className="font-semibold text-navy-800">💡 Clave de acceso rápido:</p>
              <p className="mt-0.5 text-navy-500">
                Puedes usar <code className="font-bold text-gold-700 bg-gold-50 px-1 py-0.5 rounded">Demo2026*</code> o pulsar el botón inferior para ingresar con la cuenta administradora.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" className="w-full bg-navy-800 hover:bg-navy-900 text-white font-bold">
                Desbloquear módulo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={cambiarARolAdmin}
                className="w-full text-xs font-semibold text-navy-700"
              >
                Ingresar directamente con perfil Administradora
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para programar nueva prueba */}
      <Dialog open={modalNuevaPrueba} onOpenChange={setModalNuevaPrueba}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg font-bold text-navy-900">
              Programar Nueva Prueba PRE-ICFES
            </DialogTitle>
            <DialogDescription className="text-xs text-navy-400">
              Diligencia los datos del cuadernillo y la institución asignada
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCrearPrueba} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="tituloPrueba">Título del Cuadernillo</Label>
              <Input
                id="tituloPrueba"
                placeholder="Ej: Simulacro Pre-ICFES Saber 11 — Fase 2"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sesionPrueba">Jornada / Sesión</Label>
              <Input
                id="sesionPrueba"
                value={nuevaSesion}
                onChange={(e) => setNuevaSesion(e.target.value)}
                placeholder="Ej: Sesión Mañana (4h 30m)"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="colegioPrueba">Institución Educativa Asignada</Label>
              <Input
                id="colegioPrueba"
                value={nuevoColegio}
                onChange={(e) => setNuevoColegio(e.target.value)}
                placeholder="Ej: I.E. Simón Bolívar"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fechaPrueba">Fecha Programada</Label>
              <Input
                id="fechaPrueba"
                placeholder="Ej: 20 de Noviembre 2026"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalNuevaPrueba(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold">
                Guardar y Programar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
