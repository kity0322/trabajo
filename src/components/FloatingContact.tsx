import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ExternalLink, Mail } from 'lucide-react'
import { canalesContacto } from '@/data/contacts'

function FloatingIcon({ id }: { id: string }) {
  switch (id) {
    case 'whatsapp':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    case 'correo':
      return <Mail className="h-4 w-4" />
    case 'instagram':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.86-4.46V8.78a8.16 8.16 0 0 0 4.91 1.63V6.96a4.85 4.85 0 0 1-1-.27z"/>
        </svg>
      )
    default:
      return <ExternalLink className="h-4 w-4" />
  }
}

export function FloatingContact() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 w-80 sm:w-88 rounded-2xl border border-navy-100 bg-white p-5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-navy-950 font-bold">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900 leading-tight">Canales de Contacto</h4>
                  <p className="text-[11px] text-navy-400">ImpulsarSAS Saber 11</p>
                </div>
              </div>
              <button
                onClick={() => setAbierto(false)}
                className="rounded-lg p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-700"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List of the 4 channels */}
            <p className="my-3 text-xs text-navy-500">
              Elige tu canal preferido para solicitar más información:
            </p>

            <div className="space-y-2">
              {canalesContacto.map((canal) => (
                <a
                  key={canal.id}
                  href={canal.url}
                  target={canal.id === 'correo' ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-navy-100 p-2.5 transition-all hover:border-navy-300 hover:bg-navy-50/50"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${
                      canal.id === 'whatsapp'
                        ? 'bg-emerald-600'
                        : canal.id === 'instagram'
                        ? 'bg-gradient-to-tr from-pink-600 via-purple-600 to-amber-500'
                        : canal.id === 'facebook'
                        ? 'bg-blue-600'
                        : canal.id === 'tiktok'
                        ? 'bg-neutral-900'
                        : 'bg-navy-800'
                    }`}>
                      <FloatingIcon id={canal.id} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-navy-800 group-hover:text-navy-950">
                        {canal.nombre}
                      </p>
                      <p className="truncate text-[10px] text-navy-400">{canal.valor}</p>
                    </div>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-100/70 text-navy-600 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3.5 border-t border-navy-100 pt-2.5 flex items-center justify-between text-[11px] text-navy-400">
              <span>ImpulsarSaber 2026</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Atención activa
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAbierto(!abierto)}
        className="flex items-center gap-2 rounded-full bg-navy-800 px-4 py-3 text-white shadow-xl transition-colors hover:bg-navy-900 focus:outline-none focus:ring-4 focus:ring-gold-400/30 border border-gold-400/30"
        aria-label="Abrir contactos"
      >
        <MessageCircle className="h-5 w-5 text-gold-400" />
        <span className="text-xs font-bold sm:inline hidden">Contactos</span>
      </motion.button>
    </div>
  )
}
