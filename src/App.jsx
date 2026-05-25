import { Route, Routes, Navigate } from 'react-router-dom'
import { PageLayout } from './components/PageLayout'
import { HomePage } from './pages/HomePage'
import { CoursesPage } from './pages/CoursesPage'
import { CasesPage } from './pages/CasesPage'
import { ToolsPage } from './pages/ToolsPage'
import { AccountPage } from './pages/AccountPage'

export default function App() {
  return (
    <Routes>
      {/* 首页独立布局 */}
      <Route path="/" element={<HomePage />} />

      {/* 子页面使用统一布局 */}
      <Route element={<PageLayout />}>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
