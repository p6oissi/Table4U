import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ReservePage from "./pages/ReservePage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/reserve" element={<ReservePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
