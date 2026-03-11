import { useState } from 'react';
import { bookTable } from '../services/api';
import type { Table, ReservationSearch, ReservationResponse } from '../types';
import '../style/BookingDialog.css';

interface Props {
    table: Table;
    search: ReservationSearch;
    onConfirm: (response: ReservationResponse) => void;
    onClose: () => void;
}

function formatZone(zone: string): string {
    return zone.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function BookingDialog({ table, search, onConfirm, onClose }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function validate(): boolean {
        if (!name.trim()) { setError('Please enter your name.'); return false; }
        if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email.'); return false; }
        return true;
    }

    function handleConfirm() {
        setError('');
        if (!validate()) return;
        setLoading(true);
        bookTable(table.id, name.trim(), email.trim(), search.date, search.time, search.partySize)
            .then(onConfirm)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }

    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div className="dialog-backdrop" onClick={handleBackdropClick}>
            <div className="dialog-card" role="dialog" aria-modal="true">

                <div className="dialog-header">
                    <div className="dialog-header-ornament" />
                    <p className="dialog-eyebrow">Your reservation</p>
                    <h2 className="dialog-title">Table {table.tableNumber}</h2>
                    <p className="dialog-subtitle">{formatZone(table.zone)}</p>
                </div>

                <div className="dialog-summary">
                    <div className="dialog-summary-row">
                        <span className="summary-label">Date</span>
                        <span className="summary-value">{search.date}</span>
                    </div>
                    <div className="dialog-summary-row">
                        <span className="summary-label">Time</span>
                        <span className="summary-value">{search.time} — {addTwoHours(search.time)}</span>
                    </div>
                    <div className="dialog-summary-row">
                        <span className="summary-label">Guests</span>
                        <span className="summary-value">{search.partySize} of {table.capacity} seats</span>
                    </div>
                </div>

                <div className="dialog-divider" />

                <div className="dialog-form">
                    <div className="dialog-field">
                        <label htmlFor="booking-name">Name</label>
                        <input
                            id="booking-name"
                            type="text"
                            placeholder="Your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                    </div>
                    <div className="dialog-field">
                        <label htmlFor="booking-email">Email</label>
                        <input
                            id="booking-email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="dialog-error">{error}</p>}
                </div>

                <div className="dialog-actions">
                    <button className="dialog-btn-cancel" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button className="dialog-btn-confirm" onClick={handleConfirm} disabled={loading}>
                        {loading ? 'Booking...' : 'Confirm Reservation'}
                    </button>
                </div>

            </div>
        </div>
    );
}

function addTwoHours(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const end = new Date(0, 0, 0, h + 2, m);
    return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
}

export default BookingDialog;
