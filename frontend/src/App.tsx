import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ReservePage from "./pages/ReservePage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/reserve" element={<ReservePage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
