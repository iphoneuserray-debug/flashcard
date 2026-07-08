import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import WordTable from './pages/WordTable'

function App() {
    return (
        <BrowserRouter>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/word-table">All Words</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/word-table" element={<WordTable />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
