import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import SupplierDBCaseStudy from './pages/SupplierDBCaseStudy.jsx'
import SentinelCaseStudy from './pages/SentinelCaseStudy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-study/supplierdb" element={<SupplierDBCaseStudy />} />
        <Route path="/case-study/sentinel" element={<SentinelCaseStudy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
