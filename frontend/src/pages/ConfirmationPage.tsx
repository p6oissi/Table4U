import { useLocation, useNavigate } from 'react-router-dom';
import type { ReservationResponse } from '../types';
import '../style/ConfirmationPage.css';

interface LocationState {
    reservation: ReservationResponse;
}

function formatZone(zone: string): string {
    return zone.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function ConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;
    const reservation = state?.reservation;

    return (
        <div className="confirmation">
            <div className="confirmation-card fade-in">

                <div className="confirmation-ornament">
                    <hr className="gold-line" />
                    <span className="confirmation-ornament-text">Table4U</span>
                    <hr className="gold-line" />
                </div>

                <div className="confirmation-check">&#10003;</div>

                <h1 className="confirmation-title">Thank you{reservation ? `, ${reservation.customerName.split(' ')[0]}` : ''}.</h1>
                <p className="confirmation-subtitle">
                    Your reservation has been confirmed. A confirmation will be sent to your email.
                </p>

                {reservation && (
                    <div className="confirmation-details">
                        <div className="confirmation-details-row">
                            <span className="detail-label">Table</span>
                            <span className="detail-value">
                                {reservation.tableNumber} &mdash; {formatZone(reservation.zone)}
                            </span>
                        </div>
                        <div className="confirmation-details-row">
                            <span className="detail-label">Date</span>
                            <span className="detail-value">{reservation.date}</span>
                        </div>
                        <div className="confirmation-details-row">
                            <span className="detail-label">Time</span>
                            <span className="detail-value">{reservation.startTime.slice(0, 5)} — {reservation.endTime.slice(0, 5)}</span>
                        </div>
                        <div className="confirmation-details-row">
                            <span className="detail-label">Guests</span>
                            <span className="detail-value">{reservation.partySize}</span>
                        </div>
                        <div className="confirmation-details-row">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{reservation.customerEmail}</span>
                        </div>
                    </div>
                )}

                <div className="confirmation-actions">
                    <button className="btn-primary" onClick={() => navigate('/reserve')}>
                        <span>Make Another Reservation</span>
                    </button>
                    <button className="confirmation-btn-home" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmationPage;
