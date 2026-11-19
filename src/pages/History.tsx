import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUp, Award, Calendar, PlayCircle, CheckCircle2, Clock, RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEstadisticasEstudiante } from '@/lib/studentHistory'

const seriesPorArea = [
  { key: 'matematicas', label: 'Matemáticas', color: '#13214A' },
  { key: 'lectura', label: 'Lectura Crítica', color: '#8B1E1E' },
  { key: 'ciencias', label: 'Ciencias', color: '#059669' },
  { key: 'sociales', label: 'Sociales', color: '#D4A017' },
  { key: 'ingles', label: 'Inglés', color: '#7c8fc0' },
]

export default function History() {
  const [vista, setVista] = useState<'general' | 'areas'>('general')
  const { stats, cargando, limpiarHistorial } = useEstadisticasEstudiante()

  const sinSimulacros = stats.totalSimulacros === 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-2xl font-bold text-navy-800 sm:text-3xl">Mi progreso</h1>
          <p className="mt-1 text-navy-400">Evolución de tus puntajes guardados a lo largo del tiempo</p>
        </motion.div>
        {!sinSimulacros && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm('¿Deseas reiniciar tu historial de simulacros a cero?')) {
                limpiarHistorial()
              }
            }}
            className="text-xs text-navy-400 hover:text-wine-600 hover:bg-wine-50 self-start sm:self-auto"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reiniciar a 0
          </Button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardContent className="p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700 text-white">
                <TrendingUp className="h-[18px] w-[18px]" />
              </div>
              <p className="font-heading text-2xl font-bold text-navy-800">
                {sinSimulacros ? '0 pts' : stats.mejoraTotal >= 0 ? `+${stats.mejoraTotal} pts` : `${stats.mejoraTotal} pts`}
              </p>
              <p className="text-xs text-navy-400">Mejora desde tu primer simulacro</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-navy-900">
                <Award className="h-[18px] w-[18px]" />
              </div>
              <p className="font-heading text-2xl font-bold text-navy-800">
                {sinSimulacros ? '0 pts' : `${stats.puntajeActual} pts`}
              </p>
              <p className="text-xs text-navy-400">Puntaje más reciente</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardContent className="p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-500 text-white">
                <Calendar className="h-[18px] w-[18px]" />
              </div>
              <p className="font-heading text-2xl font-bold text-navy-800">{stats.totalSimulacros}</p>
              <p className="text-xs text-navy-400">Simulacros presentados</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {sinSimulacros ? (
        <Card className="border-dashed border-2 border-navy-200 bg-white p-8 text-center sm:p-12">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h2 className="font-heading text-xl font-bold text-navy-900 sm:text-2xl">
              Aún no tienes simulacros registrados
            </h2>
            <p className="mt-2 max-w-md text-sm text-navy-400 leading-relaxed">
              Tu puntaje actual es <strong>0</strong>. A medida que realices simulacros en la plataforma, registraremos automáticamente tus resultados, tiempos y evolución por competencia en esta gráfica interactiva.
            </p>
            <Button size="lg" className="mt-6 bg-navy-800 text-white font-semibold hover:bg-navy-900" asChild>
              <Link to="/simulacros">
                <PlayCircle className="mr-2 h-5 w-5" />
                Explorar catálogo de simulacros
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs value={vista} onValueChange={(v) => setVista(v as 'general' | 'areas')}>
            <TabsList>
              <TabsTrigger value="general">Puntaje general</TabsTrigger>
              <TabsTrigger value="areas">Por área</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading font-semibold text-navy-800">
                  {vista === 'general' ? 'Evolución del puntaje total' : 'Evolución por competencia'}
                </h2>
                {vista === 'general' && (
                  <Badge variant="soft">Promedio nacional: {stats.promedioNacional} pts</Badge>
                )}
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={stats.puntosGrafica} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef1f7" vertical={false} />
                  <XAxis dataKey="fecha" tick={{ fill: '#4a5f9e', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={vista === 'general' ? [0, 500] : [0, 100]}
                    tick={{ fill: '#adbadb', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #d6ddec', backgroundColor: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {vista === 'general' ? (
                    <Line
                      type="monotone"
                      dataKey="puntaje"
                      name="Puntaje total (0-500)"
                      stroke="#D4A017"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#D4A017' }}
                      activeDot={{ r: 7 }}
                      animationDuration={1000}
                    />
                  ) : (
                    seriesPorArea.map((serie) => (
                      <Line
                        key={serie.key}
                        type="monotone"
                        dataKey={serie.key}
                        name={serie.label}
                        stroke={serie.color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        animationDuration={1000}
                      />
                    ))
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabla detallada de simulacros presentados */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-heading text-lg font-semibold text-navy-800 mb-4">
                Historial de simulacros realizados
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 text-xs font-bold uppercase tracking-wider text-navy-400">
                      <th className="pb-3 pr-4">Fecha</th>
                      <th className="pb-3 pr-4">Simulacro</th>
                      <th className="pb-3 pr-4">Puntaje ICFES</th>
                      <th className="pb-3 pr-4">Aciertos</th>
                      <th className="pb-3 pr-4">Tiempo</th>
                      <th className="pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-50">
                    {stats.simulacros.slice().reverse().map((sim) => (
                      <tr key={sim.id} className="hover:bg-navy-50/40 transition-colors">
                        <td className="py-3.5 pr-4 text-xs font-medium text-navy-500">{sim.fecha}</td>
                        <td className="py-3.5 pr-4 font-semibold text-navy-800">{sim.tituloSimulacro}</td>
                        <td className="py-3.5 pr-4">
                          <span className="font-bold text-navy-900 bg-gold-100 text-navy-950 px-2.5 py-1 rounded-md text-xs">
                            {sim.puntajeIcfes} pts
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-navy-600">
                          {sim.aciertos}/{sim.totalPreguntas} ({sim.porcentaje}%)
                        </td>
                        <td className="py-3.5 pr-4 text-xs text-navy-400">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {Math.floor(sim.tiempoUsadoSeg / 60)}m {sim.tiempoUsadoSeg % 60}s
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
