import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { Trophy, TrendingUp, Clock, Target, BookOpen, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useConfettiCelebration } from '@/components/Confetti'
import { useAuth } from '@/context/AuthContext'
import { obtenerUltimoResultado, obtenerUltimoResultadoEstudiante, type ResultadoSimulacro } from '@/lib/scoring'
import { promedioNacional } from '@/data/history'

const recomendaciones: Record<string, string> = {
  Mate: 'Refuerza funciones cuadráticas y proporcionalidad con 3 simulacros cortos por semana.',
  Lectura: 'Practica identificación de tesis y argumentos en textos de opinión.',
  Ciencias: 'Repasa ecosistemas colombianos y mezclas químicas con ejercicios guiados.',
  Sociales: 'Profundiza en la Constitución de 1991 y la estructura del Estado.',
  Inglés: 'Dedica 15 minutos diarios a lectura en inglés y gramática de tiempos verbales.',
}

export default function Results() {
  const { usuario } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mostrarPlan, setMostrarPlan] = useState(false)

  const esAdmin = usuario?.rol === 'admin'

  const resultado: ResultadoSimulacro | null = useMemo(() => {
    const desdeRuta = (location.state as { resultado?: ResultadoSimulacro } | null)?.resultado ?? null
    if (usuario?.rol === 'estudiante') {
      const correo = usuario.correo.trim().toLowerCase()
      if (desdeRuta?.estudiante?.correo.trim().toLowerCase() === correo) return desdeRuta
      return obtenerUltimoResultadoEstudiante(correo)
    }
    return desdeRuta ?? obtenerUltimoResultado()
  }, [location.state, usuario])

  const [animarNumero, setAnimarNumero] = useState(0)
  const buenPuntaje = resultado ? resultado.porcentaje >= 70 : false

  useConfettiCelebration(buenPuntaje)

  useEffect(() => {
    if (!resultado) return
    let frame: number
    const duracion = 1200
    const inicio = performance.now()
    const paso = (t: number) => {
      const progreso = Math.min((t - inicio) / duracion, 1)
      setAnimarNumero(Math.round(progreso * resultado.puntajeIcfes))
      if (progreso < 1) frame = requestAnimationFrame(paso)
    }
    frame = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(frame)
  }, [resultado])

  if (!resultado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <Target className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <h1 className="font-heading text-xl font-bold text-navy-800">Aún no tienes resultados</h1>
            <p className="mt-2 text-sm text-navy-400">Presenta un simulacro para ver tu análisis de desempeño.</p>
            <Button className="mt-5" onClick={() => navigate('/simulacros')}>
              Ir al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const datosRadar = resultado.desglosePorArea.map((d) => ({ area: d.area, puntaje: d.puntaje, fullMark: 100 }))
  const datosComparacion = resultado.desglosePorArea.map((d) => ({
    area: d.area,
    tú: d.puntaje,
    promedio: Math.max(30, Math.round(promedioNacional / 5)),
  }))
  const areaMasFuerte = [...resultado.desglosePorArea].sort((a, b) => b.puntaje - a.puntaje)[0]
  const areaMasDebil = [...resultado.desglosePorArea].sort((a, b) => a.puntaje - b.puntaje)[0]

  const minutos = Math.floor(resultado.tiempoUsadoSeg / 60)
  const segundos = resultado.tiempoUsadoSeg % 60

  return (
    <div className="min-h-screen bg-surface px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Encabezado con puntaje */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 to-navy-900 p-8 text-center text-white shadow-xl sm:p-12"
        >
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="relative mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500"
          >
            <Trophy className="h-8 w-8 text-navy-900" />
          </motion.div>
          <p className="relative font-semibold text-gold-300">
            {buenPuntaje ? '¡Excelente trabajo!' : 'Simulacro completado'}
          </p>
          <p className="relative mt-2 font-heading text-6xl font-bold tabular-nums sm:text-7xl">
            {animarNumero}
          </p>
          <p className="relative mt-1 text-navy-200">de 500 puntos posibles</p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gold-400" />
              <span className="text-sm text-navy-100">
                {resultado.aciertos}/{resultado.totalPreguntas} correctas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gold-400" />
              <span className="text-sm text-navy-100">
                {resultado.puntajeIcfes > promedioNacional ? '+' : ''}
                {resultado.puntajeIcfes - promedioNacional} vs. promedio nacional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-400" />
              <span className="text-sm text-navy-100">
                {minutos}:{segundos.toString().padStart(2, '0')} usados
              </span>
            </div>
          </div>
        </motion.div>

        {/* Gráficos */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="mb-4 font-heading font-semibold text-navy-800">Desglose por competencia</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={datosRadar}>
                    <PolarGrid stroke="#d6ddec" />
                    <PolarAngleAxis dataKey="area" tick={{ fill: '#4a5f9e', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#adbadb', fontSize: 10 }} />
                    <Radar
                      name="Puntaje"
                      dataKey="puntaje"
                      stroke="#D4A017"
                      fill="#D4A017"
                      fillOpacity={0.35}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="mb-4 font-heading font-semibold text-navy-800">Tú vs. promedio nacional</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={datosComparacion} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef1f7" vertical={false} />
                    <XAxis dataKey="area" tick={{ fill: '#4a5f9e', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#adbadb', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid #d6ddec' }}
                      cursor={{ fill: '#f7f8fa' }}
                    />
                    <Bar dataKey="tú" radius={[6, 6, 0, 0]} maxBarSize={28}>
                      {datosComparacion.map((_, i) => (
                        <Cell key={i} fill="#13214A" />
                      ))}
                    </Bar>
                    <Bar dataKey="promedio" radius={[6, 6, 0, 0]} fill="#d6ddec" maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fortalezas y plan de estudio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 font-heading font-semibold text-navy-800">Tu desempeño por área</h2>
              <div className="space-y-3">
                {resultado.desglosePorArea.map((d) => (
                  <div key={d.areaId}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-navy-700">{d.area}</span>
                      <span className="font-semibold text-navy-500">{d.puntaje}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-navy-100">
                      <motion.div
                        className="h-2.5 rounded-full bg-gradient-to-r from-navy-500 to-navy-700"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.puntaje}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="success">Fortaleza: {areaMasFuerte.area}</Badge>
                <Badge variant="wine">Por reforzar: {areaMasDebil.area}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-gold-50 to-white">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gold-600" />
                <h2 className="font-heading font-semibold text-navy-800">Plan de estudio recomendado</h2>
              </div>
              {!mostrarPlan ? (
                <>
                  <p className="text-sm text-navy-500">
                    Basado en tu desempeño, creamos un plan enfocado en {areaMasDebil.area} y tus demás
                    áreas de oportunidad.
                  </p>
                  <Button className="mt-5 w-full" onClick={() => setMostrarPlan(true)}>
                    Ver plan de estudio recomendado
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  {resultado.desglosePorArea
                    .slice()
                    .sort((a, b) => a.puntaje - b.puntaje)
                    .map((d, i) => (
                      <div key={d.areaId} className="rounded-xl border border-gold-200 bg-white p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-gold-600">
                          Prioridad {i + 1} · {d.area}
                        </p>
                        <p className="mt-1 text-sm text-navy-600">
                          {recomendaciones[d.area] ?? 'Practica con simulacros adicionales de esta área.'}
                        </p>
                      </div>
                    ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {esAdmin ? (
            <Button size="lg" className="bg-navy-800 hover:bg-navy-900 text-white font-bold" asChild>
              <Link to="/institucional">
                Volver al Panel de Supervisión & Resultados
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="outline" size="lg" asChild>
                <Link to="/progreso">
                  Ver mi historial de progreso
                </Link>
              </Button>
              <Button size="lg" onClick={() => navigate('/simulacros')}>
                <RotateCcw className="h-4 w-4" />
                Presentar otro simulacro
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
