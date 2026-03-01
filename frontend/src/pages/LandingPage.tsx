import { useNavigate } from 'react-router-dom';
import '../style/LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Table4U</h1>
                <p>
                    Find and book the perfect table at our restaurant.
                    We recommend the best seat based on your party size
                    and preferences.
                </p>
                <button className="btn-primary" onClick={() => navigate('/reserve')}>
                    Book a Table
                </button>
            </div>
        </div>
    );
}

export default LandingPage;