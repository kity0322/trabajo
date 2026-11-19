import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { canalesContacto } from '@/data/contacts'

function CanalIcon({ id }: { id: string }) {
  switch (id) {
    case 'whatsapp':
      return (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    case 'correo':
      return <Mail className="h-6 w-6" />
    case 'instagram':
      return (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.86-4.46V8.78a8.16 8.16 0 0 0 4.91 1.63V6.96a4.85 4.85 0 0 1-1-.27z"/>
        </svg>
      )
    default:
      return <ExternalLink className="h-6 w-6" />
  }
}

export function ContactSection() {
  const [formNombre, setFormNombre] = useState('')
  const [formContacto, setFormContacto] = useState('')
  const [formMensaje, setFormMensaje] = useState('')
  const [canalEnvio, setCanalEnvio] = useState<'whatsapp' | 'correo'>('whatsapp')
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formNombre || !formContacto) return

    if (canalEnvio === 'whatsapp') {
      const texto = encodeURIComponent(
        `Hola, mi nombre es ${formNombre} (${formContacto}). ${formMensaje ? `Consulta: ${formMensaje}` : 'Deseo solicitar más información sobre los simulacros Saber 11 de ImpulsarSaber.'}`
      )
      window.open(`https://wa.me/573165811216?text=${texto}`, '_blank')
    } else {
      const subject = encodeURIComponent(`Consulta ImpulsarSaber - ${formNombre}`)
      const body = encodeURIComponent(
        `Nombre: ${formNombre}\nContacto/Teléfono: ${formContacto}\n\nConsulta:\n${formMensaje || 'Deseo solicitar más información sobre los simulacros y planes Saber 11.'}`
      )
      window.open(`mailto:sasimpulsar@gmail.com?subject=${subject}&body=${body}`, '_blank')
    }

    setEnviado(true)
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <section id="contacto" className="relative bg-gradient-to-b from-navy-50/40 via-white to-navy-50/60 py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
            <Sparkles className="h-4 w-4 text-gold-600" />
            Canales Oficiales
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
            Contactos y <span className="text-gold-600">Redes Sociales</span>
          </h2>
          <p className="mt-4 text-base text-navy-500 sm:text-lg">
            ¿Necesitas más información sobre nuestros simulacros Saber 11 o convenios institucionales? 
            Comunícate con nosotros o síguenos en nuestras redes.
          </p>
        </motion.div>

        {/* Official Channels Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {canalesContacto.map((canal, idx) => (
            <motion.div
              key={canal.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Card className="h-full overflow-hidden border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-300 hover:shadow-xl flex flex-col justify-between">
                {/* Header banner */}
                <div className={`bg-gradient-to-r ${canal.color} p-5 text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                      <CanalIcon id={canal.id} />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold">{canal.nombre}</h3>
                      <p className="text-[11px] text-white/80">{canal.subtitulo}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/30 bg-white/10 text-[10px] text-white font-semibold">
                    {canal.badge}
                  </Badge>
                </div>

                <CardContent className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="mb-3 rounded-lg bg-navy-50/70 p-2.5">
                      <p className="text-xs font-bold text-navy-900 break-all">{canal.valor}</p>
                    </div>
                    <p className="text-xs text-navy-500 leading-relaxed mb-5">
                      {canal.descripcion}
                    </p>
                  </div>

                  <Button
                    className={`w-full text-white font-semibold shadow-sm ${
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
                      <CanalIcon id={canal.id} />
                      {canal.accionTexto}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Message Form */}
        <div className="mt-16 rounded-3xl border border-navy-100 bg-white p-8 sm:p-10 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-navy-800">
                <PhoneCall className="h-3.5 w-3.5 text-gold-600" />
                Atención Inmediata
              </div>
              <h3 className="mt-3 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
                ¿Prefieres escribirnos un mensaje?
              </h3>
              <p className="mt-3 text-sm text-navy-500 leading-relaxed">
                Elige si deseas contactarnos vía <strong>WhatsApp</strong> o <strong>Correo Electrónico</strong>, diligencia tus datos y te responderemos en el menor tiempo posible.
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-navy-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Información de simulacros individuales y por paquetes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-navy-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Convenios pedagógicos para colegios e instituciones</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-navy-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Soporte técnico y acceso para estudiantes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleEnviar} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formNombre}
                      onChange={(e) => setFormNombre(e.target.value)}
                      placeholder="Ej. Valentina Gómez"
                      className="w-full rounded-xl border border-navy-200 bg-navy-50/40 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                      Teléfono o Correo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formContacto}
                      onChange={(e) => setFormContacto(e.target.value)}
                      placeholder="Ej. +57 300... o correo@gmail.com"
                      className="w-full rounded-xl border border-navy-200 bg-navy-50/40 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                    Enviar a través de:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCanalEnvio('whatsapp')}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 px-3 text-xs font-bold transition-all ${
                        canalEnvio === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400/20 shadow-sm'
                          : 'border-navy-200 bg-white text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      WhatsApp (+57 316 581 1216)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCanalEnvio('correo')}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 px-3 text-xs font-bold transition-all ${
                        canalEnvio === 'correo'
                          ? 'border-navy-700 bg-navy-50 text-navy-900 ring-2 ring-navy-400/20 shadow-sm'
                          : 'border-navy-200 bg-white text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      <Mail className="h-4 w-4 text-navy-700" />
                      Correo (sasimpulsar@gmail.com)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                    Mensaje o Consulta (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formMensaje}
                    onChange={(e) => setFormMensaje(e.target.value)}
                    placeholder="Escribe tu consulta sobre los simulacros Pre-ICFES..."
                    className="w-full rounded-xl border border-navy-200 bg-navy-50/40 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full text-white font-semibold py-3 text-sm ${
                    canalEnvio === 'whatsapp'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-navy-700 hover:bg-navy-800'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  {canalEnvio === 'whatsapp' ? 'Enviar Mensaje por WhatsApp' : 'Redactar por Correo Electrónico'}
                </Button>

                {enviado && (
                  <p className="text-center text-xs font-semibold text-emerald-600 animate-fade-in">
                    {canalEnvio === 'whatsapp'
                      ? '¡Listo! Abriendo el chat de WhatsApp...'
                      : '¡Listo! Abriendo tu cliente de correo electrónico...'}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
