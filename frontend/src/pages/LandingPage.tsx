import { useNavigate } from 'react-router-dom';
import '../style/LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <div className="landing-content">
                <div className="landing-ornament fade-in">
                    <hr className="gold-line" />
                    <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                        Est. 2025
                    </span>
                    <hr className="gold-line" />
                </div>

                <h1 className="fade-in fade-in-delay-1">Table4U</h1>

                <p className="landing-tagline fade-in fade-in-delay-2">
                    A dining experience, curated for you
                </p>

                <div className="landing-divider fade-in fade-in-delay-2"></div>

                <p className="landing-description fade-in fade-in-delay-3">
                    Reserve your perfect table at our restaurant. We recommend
                    the ideal seat based on your party size and personal preferences.
                </p>

                <div className="fade-in fade-in-delay-4">
                    <button className="btn-primary" onClick={() => navigate('/reserve')}>
                        <span>Reserve a Table</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
