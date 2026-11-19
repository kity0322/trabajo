import * as React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, AlertCircle, BookOpen, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { areas, type AreaId } from '@/data/areas'
import { institucionesAliadas } from '@/data/institutional'

const grados = ['9°', '10°', '11°']

interface FormErrors {
  nombre?: string
  correo?: string
  institucion?: string
  grado?: string
  materia?: string
}

export default function Register() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()
  const [rol, setRol] = useState<'estudiante' | 'docente'>('estudiante')
  const [materia, setMateria] = useState<AreaId>('matematicas')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [grado, setGrado] = useState('')
  const [errores, setErrores] = useState<FormErrors>({})
  const [cargando, setCargando] = useState(false)

  const validar = () => {
    const nuevosErrores: FormErrors = {}
    if (!nombre.trim() || nombre.trim().length < 3) nuevosErrores.nombre = 'Ingresa tu nombre completo'
    if (!correo.trim()) nuevosErrores.correo = 'Ingresa tu correo electrónico'
    else if (!/^\S+@\S+\.\S+$/.test(correo)) nuevosErrores.correo = 'Ingresa un correo válido'
    if (!institucion.trim()) nuevosErrores.institucion = 'Ingresa tu institución educativa'
    if (rol === 'estudiante' && !grado) nuevosErrores.grado = 'Selecciona tu grado'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    setCargando(true)
    setTimeout(() => {
      iniciarSesion({
        nombre,
        correo,
        institucion,
        grado: rol === 'docente' ? 'Docente' : grado,
        rol,
        materia: rol === 'docente' ? materia : undefined,
        instituciones: rol === 'docente' ? [institucion] : undefined,
      })
      setCargando(false)
      navigate(rol === 'docente' ? '/mi-materia' : '/panel')
    }, 700)
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
            <h1 className="font-heading text-2xl font-bold text-navy-800">Crea tu cuenta</h1>
            <p className="mt-1 text-sm text-navy-400">Plataforma oficial de preparación Pre-ICFES Saber 11</p>

            {/* Selector de Tipo de Cuenta */}
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-navy-50 p-1">
              <button
                type="button"
                onClick={() => setRol('estudiante')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  rol === 'estudiante' ? 'bg-navy-800 text-white shadow-sm' : 'text-navy-600 hover:bg-navy-100'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => setRol('docente')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  rol === 'docente' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-navy-600 hover:bg-navy-100'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Docente / Profesor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre"
                  placeholder={rol === 'docente' ? 'Ej: Prof. Carlos Muñoz' : 'Ej: María José Ramírez'}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={errores.nombre}
                />
                {errores.nombre && <ErrorText texto={errores.nombre} />}
              </div>

              {rol === 'docente' && (
                <div className="space-y-1.5">
                  <Label>Materia / Área a cargo</Label>
                  <Select value={materia} onValueChange={(val) => setMateria(val as AreaId)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu materia" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="correo">Correo electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  placeholder="tunombre@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={errores.correo}
                />
                {errores.correo && <ErrorText texto={errores.correo} />}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="institucion">Institución educativa</Label>
                {rol === 'estudiante' ? (
                  <select
                    id="institucion"
                    value={institucion}
                    onChange={(event) => setInstitucion(event.target.value)}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-600 ${errores.institucion ? 'border-wine-400' : 'border-navy-200'}`}
                  >
                    <option value="">Selecciona tu institución aliada</option>
                    {institucionesAliadas.map((item) => (
                      <option key={item.id} value={`${item.nombre}${item.sigla ? ` (${item.sigla})` : ''}`}>
                        {item.sigla ? `${item.sigla} · ${item.nombre}` : item.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id="institucion"
                    placeholder="Ej: I.E. Simón Bolívar"
                    value={institucion}
                    onChange={(e) => setInstitucion(e.target.value)}
                    error={errores.institucion}
                  />
                )}
                {errores.institucion && <ErrorText texto={errores.institucion} />}
              </div>

              {rol === 'estudiante' && (
                <div className="space-y-1.5">
                  <Label>Grado</Label>
                  <Select value={grado} onValueChange={setGrado}>
                    <SelectTrigger className={errores.grado ? 'border-wine-400' : ''}>
                      <SelectValue placeholder="Selecciona tu grado" />
                    </SelectTrigger>
                    <SelectContent>
                      {grados.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errores.grado && <ErrorText texto={errores.grado} />}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={cargando}>
                {cargando ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {cargando
                  ? 'Creando cuenta...'
                  : rol === 'docente'
                  ? 'Registrarme como docente'
                  : 'Crear cuenta gratis'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-navy-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/iniciar-sesion" className="font-semibold text-navy-700 hover:text-gold-600">
                Inicia sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function ErrorText({ texto }: { texto: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-xs font-medium text-wine-500"
    >
      <AlertCircle className="h-3.5 w-3.5" /> {texto}
    </motion.p>
  )
}
