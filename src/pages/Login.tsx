import * as React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, AlertCircle, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { cuentasDemo, buscarCuentaDemo, type CuentaDemo } from '@/data/demoAccounts'
import { institucionesAliadas } from '@/data/institutional'

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState('')
  const [errores, setErrores] = useState<{ correo?: string; clave?: string; institucion?: string }>({})
  const [cargando, setCargando] = useState(false)
  const cuentaDetectada = buscarCuentaDemo(correo)
  const requiereInstitucion = !cuentaDetectada || cuentaDetectada.rol === 'estudiante'

  const validar = () => {
    const nuevosErrores: typeof errores = {}
    if (!correo.trim()) nuevosErrores.correo = 'Ingresa tu correo electrónico'
    else if (!/^\S+@\S+\.\S+$/.test(correo)) nuevosErrores.correo = 'Ingresa un correo válido'
    if (!clave.trim()) nuevosErrores.clave = 'Ingresa tu contraseña'
    else if (clave.length < 4) nuevosErrores.clave = 'La contraseña debe tener al menos 4 caracteres'

    const cuenta = buscarCuentaDemo(correo)
    if (requiereInstitucion && !institucionSeleccionada) {
      nuevosErrores.institucion = 'Selecciona la institución educativa a la que perteneces'
    }
    if (cuenta && clave && clave !== cuenta.clave) {
      nuevosErrores.clave = 'Contraseña incorrecta para esta cuenta de prueba'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const completarIngreso = (destino: string) => {
    setCargando(false)
    navigate(destino)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    setCargando(true)

    const cuenta = buscarCuentaDemo(correo)
    setTimeout(() => {
      if (cuenta) {
        iniciarSesion({
          nombre: cuenta.nombre,
          correo: cuenta.correo,
          institucion: cuenta.rol === 'estudiante' ? institucionSeleccionada : cuenta.institucion,
          grado: cuenta.grado,
          rol: cuenta.rol,
          materia: cuenta.materia,
          instituciones: cuenta.instituciones,
        })
        completarIngreso(cuenta.redirectTo)
        return
      }
      iniciarSesion({
        nombre: correo.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        correo,
        institucion: institucionSeleccionada,
        grado: '11°A',
        rol: 'estudiante',
      })
      completarIngreso('/panel')
    }, 700)
  }

  const usarCuentaDemo = (cuenta: CuentaDemo) => {
    setCorreo(cuenta.correo)
    setClave(cuenta.clave)
    setInstitucionSeleccionada(cuenta.rol === 'estudiante' ? cuenta.institucion : '')
    setErrores({})
    setCargando(true)
    setTimeout(() => {
      iniciarSesion({
        nombre: cuenta.nombre,
        correo: cuenta.correo,
        institucion: cuenta.institucion,
        grado: cuenta.grado,
        rol: cuenta.rol,
        materia: cuenta.materia,
        instituciones: cuenta.instituciones,
      })
      completarIngreso(cuenta.redirectTo)
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-800 via-navy-700 to-navy-600 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <Link to="/">
            <Logo dark />
          </Link>
        </div>
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <h1 className="font-heading text-2xl font-bold text-navy-800">Bienvenido de nuevo</h1>
            <p className="mt-1 text-sm text-navy-400">Inicia sesión para continuar tu preparación</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="correo">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                  <Input
                    id="correo"
                    type="email"
                    placeholder="tunombre@correo.com"
                    className="pl-10"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    error={errores.correo}
                  />
                </div>
                {errores.correo && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-xs font-medium text-wine-500"
                  >
                    <AlertCircle className="h-3.5 w-3.5" /> {errores.correo}
                  </motion.p>
                )}
              </div>

              {requiereInstitucion && (
                <div className="space-y-1.5">
                  <Label htmlFor="institucion-estudiante">Institución educativa</Label>
                  <select
                    id="institucion-estudiante"
                    value={institucionSeleccionada}
                    onChange={(event) => setInstitucionSeleccionada(event.target.value)}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-600 ${errores.institucion ? 'border-wine-400' : 'border-navy-200'}`}
                  >
                    <option value="">Selecciona tu institución aliada</option>
                    {institucionesAliadas.map((item) => {
                      const value = `${item.nombre}${item.sigla ? ` (${item.sigla})` : ''}`
                      return <option key={item.id} value={value}>{item.sigla ? `${item.sigla} · ${item.nombre}` : item.nombre}</option>
                    })}
                  </select>
                  {errores.institucion && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs font-medium text-wine-500">
                      <AlertCircle className="h-3.5 w-3.5" /> {errores.institucion}
                    </motion.p>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="clave">Contraseña</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                  <Input
                    id="clave"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    error={errores.clave}
                  />
                </div>
                {errores.clave && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-xs font-medium text-wine-500"
                  >
                    <AlertCircle className="h-3.5 w-3.5" /> {errores.clave}
                  </motion.p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={cargando}>
                {cargando ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                {cargando ? 'Ingresando...' : 'Iniciar sesión'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-navy-400">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="font-semibold text-navy-700 hover:text-gold-600">
                Regístrate gratis
              </Link>
            </p>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
        >
          <div className="text-center mb-3">
            <p className="text-xs font-bold uppercase tracking-wide text-gold-300">
              Cuentas de Acceso Rápido (Demo)
            </p>
            <p className="text-[11px] text-navy-200 mt-0.5">
              Accede como profesor de materia, estudiante o coordinador
            </p>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {cuentasDemo.map((cuenta) => (
              <div
                key={cuenta.correo}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/95 px-3 py-2.5 shadow-sm hover:bg-white transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge
                      variant={cuenta.rol === 'docente' ? 'outline' : cuenta.rol === 'admin' ? 'wine' : 'gold'}
                      className="text-[10px] font-bold"
                    >
                      {cuenta.etiqueta}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs font-semibold text-navy-800">{cuenta.nombre}</p>
                  <p className="truncate text-[11px] text-navy-500 font-mono">{cuenta.correo}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="shrink-0 text-xs font-semibold border-navy-200 hover:bg-navy-50"
                  disabled={cargando}
                  onClick={() => usarCuentaDemo(cuenta)}
                >
                  <Wand2 className="h-3.5 w-3.5 mr-1 text-gold-600" />
                  Ingresar
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-navy-950/40 p-2.5 text-center border border-white/10 text-[11px] text-navy-200">
            <span>Contraseña maestra para todas las cuentas: </span>
            <strong className="font-mono text-gold-300 ml-1">Demo2026*</strong>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-navy-200">
          Esta es una demo funcional. No se requiere una contraseña real para continuar.
        </p>
      </motion.div>
    </div>
  )
}
