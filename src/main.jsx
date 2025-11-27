import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Comment from './routes/Comment.jsx'
import Details from './routes/Details.jsx'
import NavMenu from './ui/NavMenu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comments/:id" element={<Comment />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  </StrictMode>
)
