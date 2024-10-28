import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Join from "./pages/join"
import Main from "./pages/main"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    )
}

export default App
