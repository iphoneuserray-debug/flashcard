import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WordTable from './pages/WordTable'

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/word-table">All Words</Link> |{" "}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/word-table" element={<WordTable />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
