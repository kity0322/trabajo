import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { PageTransition } from '@/components/PageTransition'

import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Catalog from '@/pages/Catalog'
import ExamRunner from '@/pages/ExamRunner'
import Results from '@/pages/Results'
import History from '@/pages/History'
import Institutional from '@/pages/Institutional'
import PreIcfesExams from '@/pages/PreIcfesExams'
import TeacherDashboard from '@/pages/TeacherDashboard'
import Students from '@/pages/Students'
import AdminDashboard from '@/components/admin/AdminDashboard'
import InstitutionView from '@/components/admin/InstitutionView'
import RankingView from '@/components/admin/RankingView'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/como-funciona" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/instituciones" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/areas" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/contacto" element={<PageTransition><Landing /></PageTransition>} />
        <Route
          path="/iniciar-sesion"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/registro"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulacros"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Catalog />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulacro/:id"
          element={
            <ProtectedRoute>
              <ExamRunner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resultados"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progreso"
          element={
            <ProtectedRoute>
              <PageTransition>
                <History />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pruebas-preicfes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <PreIcfesExams />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/institucional"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Institutional />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-materia"
          element={
            <ProtectedRoute>
              <PageTransition>
                <TeacherDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/estudiantes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Students />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/institucion/:id"
          element={
            <ProtectedRoute>
              <PageTransition><InstitutionView /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ranking"
          element={
            <ProtectedRoute>
              <PageTransition><RankingView /></PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
