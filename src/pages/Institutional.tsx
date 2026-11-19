import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Users, TrendingUp, Target, ArrowUp, ArrowDown, Minus, Search, ExternalLink, Sparkles, BookOpenCheck, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import {
  estudiantesInstitucion,
  resumenInstitucional,
  promedioPorArea,
} from '@/data/institutional'
import { canalesContacto } from '@/data/contacts'
import { getArea } from '@/data/areas'
import { obtenerEstudiantesPorMateria, obtenerMetricasMateria } from '@/data/teacherData'

const barColors = ['#13214A', '#8B1E1E', '#059669', '#D4A017', '#7c8fc0']

function iniciales(nombre: string) {
  return nombre.split(' ').slice(0, 2).map((p) => p[0]).join('')
}

const tendenciaIcon = {
  up: <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />,
  down: <ArrowDown className="h-3.5 w-3.5 text-wine-500" />,
  stable: <Minus className="h-3.5 w-3.5 text-navy-400" />,
}

import AdminDashboard from './AdminDashboard'

export default function Institutional() {
  const { usuario } = useAuth()
  const [busqueda, setBusqueda] = useState('')

  // Si el usuario es Administrador(a), mostrar el panel de supervisión y auditoría total
  if (usuario?.rol === 'admin') {
    return <AdminDashboard />
  }

  if (usuario?.rol !== 'docente') {
    return <Navigate to="/panel" replace />
  }

  if (usuario?.rol === 'docente') {
    if (!usuario.materia) {
      return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          Tu cuenta docente aún no tiene una materia asignada. Contacta a la administración.
        </div>
      )
    }

    const area = getArea(usuario.materia)
    const AreaIcon = area.icon
    const estudiantesMateria = obtenerEstudiantesPorMateria(usuario.materia).filter((estudiante) =>
      estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    const metricasMateria = obtenerMetricasMateria(usuario.materia)

    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 border-b border-navy-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-gold-700">Panel institucional docente</p>
            <h1 className="mt-1 flex items-center gap-2 font-heading text-2xl font-bold text-navy-900">
              <AreaIcon className="h-6 w-6" /> Avances en {area.nombre}
            </h1>
            <p className="mt-1 text-sm text-navy-500">Esta vista contiene únicamente resultados, fortalezas y temas por reforzar de tu materia.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <Input placeholder="Buscar alumno..." className="pl-9" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="p-5"><p className="text-xs text-navy-500">Alumnos en {area.nombreCorto}</p><p className="mt-1 font-heading text-3xl font-bold text-navy-900">{metricasMateria.total}</p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-xs text-navy-500">Promedio de la materia</p><p className="mt-1 font-heading text-3xl font-bold text-navy-900">{metricasMateria.promedioGeneral}<span className="ml-1 text-sm font-medium text-navy-400">/100</span></p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-xs text-navy-500">Necesitan refuerzo en {area.nombreCorto}</p><p className="mt-1 font-heading text-3xl font-bold text-amber-700">{metricasMateria.requierenRefuerzoTotal}</p></CardContent></Card>
        </div>

        <section className="divide-y divide-navy-100 border-y border-navy-100">
          {estudiantesMateria.map((estudiante) => (
            <article key={estudiante.id} className="grid gap-5 py-5 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
              <div>
                <h2 className="font-heading font-bold text-navy-900">{estudiante.nombre}</h2>
                <p className="text-xs text-navy-500">{estudiante.grado} · {estudiante.institucion}</p>
                <p className="mt-2 text-sm font-semibold text-navy-700">Promedio: {estudiante.promedioMateria}/100</p>
                <p className="text-xs text-navy-400">Última actividad: {estudiante.ultimaActividad}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-emerald-800">Fortalezas · {area.nombreCorto}</h3>
                <ul className="mt-2 space-y-1.5 text-xs text-navy-700">
                  {estudiante.temasDominados.map((tema) => <li key={tema}>• {tema}</li>)}
                  {estudiante.competencias.filter((competencia) => competencia.estado === 'dominado').map((competencia) => (
                    <li key={competencia.nombre}>• {competencia.nombre} ({competencia.puntaje}%)</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-amber-800">Por reforzar · {area.nombreCorto}</h3>
                <ul className="mt-2 space-y-1.5 text-xs text-navy-700">
                  {estudiante.temasPorReforzar.map((tema) => <li key={tema}>• {tema}</li>)}
                  {estudiante.competencias.filter((competencia) => competencia.estado === 'reforzar').map((competencia) => (
                    <li key={competencia.nombre}>• {competencia.nombre} ({competencia.puntaje}%)</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          {estudiantesMateria.length === 0 && <p className="py-8 text-center text-sm text-navy-400">No hay alumnos que coincidan con la búsqueda.</p>}
        </section>
      </div>
    )
  }

  const filtrados = estudiantesInstitucion.filter((e) =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800 sm:text-3xl">Panel institucional</h1>
          <p className="mt-1 text-navy-400">{resumenInstitucional.nombreInstitucion} — Vista para directivos y docentes</p>
        </div>

        <Button
          size="lg"
          className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-md self-start sm:self-auto"
          asChild
        >
          <Link to="/mi-materia">
            <BookOpenCheck className="mr-2 h-5 w-5" />
            Portal de Profesores por Materia
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      {/* Banner de Acceso al Módulo Docente */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r from-navy-800 to-navy-900 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-navy-700 shadow-md"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-400/30">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-white">
              Gestión y Nivelación de Estudiantes por Materia
            </h3>
            <p className="text-xs text-navy-200">
              Cada docente (Matemáticas, Lectura, Ciencias, Sociales, Inglés) puede ver sus estudiantes, identificar quiénes están quedados y enviar planes de refuerzo.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-white hover:bg-navy-50 text-navy-900 font-bold shrink-0"
          asChild
        >
          <Link to="/mi-materia">
            Entrar a mi materia
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Users,
            label: 'Estudiantes activos',
            valor: resumenInstitucional.totalEstudiantes,
            bg: 'bg-navy-700',
          },
          {
            icon: Target,
            label: 'Simulacros este mes',
            valor: resumenInstitucional.simulacrosDelMes,
            bg: 'bg-gold-500',
          },
          {
            icon: TrendingUp,
            label: 'Puntaje promedio',
            valor: resumenInstitucional.puntajePromedioGeneral,
            bg: 'bg-wine-500',
          },
          {
            icon: Target,
            label: 'Meta Saber 11 alcanzada',
            valor: `${resumenInstitucional.porcentajeMetaSaber11}%`,
            bg: 'bg-navy-500',
          },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card>
              <CardContent className="p-5">
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg} text-white`}>
                  <stat.icon className="h-[18px] w-[18px]" />
                </div>
                <p className="font-heading text-2xl font-bold text-navy-800">{stat.valor}</p>
                <p className="text-xs text-navy-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 font-heading font-semibold text-navy-800">Desempeño promedio por área</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={promedioPorArea}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f7" vertical={false} />
              <XAxis dataKey="area" tick={{ fill: '#4a5f9e', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#adbadb', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #d6ddec' }} cursor={{ fill: '#f7f8fa' }} />
              <Bar dataKey="promedio" radius={[8, 8, 0, 0]} maxBarSize={56} animationDuration={1000}>
                {promedioPorArea.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading font-semibold text-navy-800">Desempeño por estudiante</h2>
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <Input
                placeholder="Buscar estudiante..."
                className="pl-9"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-xs font-semibold uppercase tracking-wide text-navy-400">
                  <th className="pb-3 pr-4">Estudiante</th>
                  <th className="pb-3 pr-4">Grado</th>
                  <th className="pb-3 pr-4">Simulacros</th>
                  <th className="pb-3 pr-4">Puntaje prom.</th>
                  <th className="pb-3 pr-4">Tendencia</th>
                  <th className="pb-3 pr-4">Fortaleza</th>
                  <th className="pb-3">Por reforzar</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((e, i) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-navy-50 transition-colors hover:bg-navy-50/50"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[10px]">{iniciales(e.nombre)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-navy-800">{e.nombre}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-navy-500">{e.grado}</td>
                    <td className="py-3 pr-4 text-navy-500">{e.simulacrosPresentados}</td>
                    <td className="py-3 pr-4 font-semibold text-navy-800">{e.puntajePromedio}</td>
                    <td className="py-3 pr-4">{tendenciaIcon[e.tendencia]}</td>
                    <td className="py-3 pr-4">
                      <Badge variant="success">{e.areaMasFuerte}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="wine">{e.areaMasDebil}</Badge>
                    </td>
                  </motion.tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-navy-400">
                      No se encontraron estudiantes con ese nombre.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Canales de Contacto Oficiales */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-navy-800">
              Canales de Contacto y Redes Oficiales
            </h2>
            <p className="text-xs text-navy-400">
              Canales directos para resolver dudas pedagógicas, convenios institucionales o solicitar información.
            </p>
          </div>
          <Badge variant="outline" className="border-gold-300 bg-gold-50 text-gold-700">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            ImpulsarSAS Saber 11
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {canalesContacto.map((canal) => (
            <Card key={canal.id} className="border-navy-100 hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-sm font-bold text-navy-800">{canal.nombre}</span>
                    <Badge variant="outline" className="text-[10px]">{canal.badge}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-navy-700 mb-1">{canal.valor}</p>
                  <p className="text-xs text-navy-400 mb-4">{canal.descripcion}</p>
                </div>
                <Button
                  size="sm"
                  className={`w-full text-xs font-semibold text-white ${
                    canal.id === 'whatsapp'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : canal.id === 'instagram'
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                      : canal.id === 'facebook'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : canal.id === 'tiktok'
                      ? 'bg-neutral-900 hover:bg-neutral-800'
                      : 'bg-navy-700 hover:bg-navy-800'
                  }`}
                  asChild
                >
                  <a href={canal.url} target={canal.id === 'correo' ? undefined : '_blank'} rel="noreferrer">
                    {canal.accionTexto}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
