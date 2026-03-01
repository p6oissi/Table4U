import { useState, useEffect } from 'react';
import { fetchZones } from '../services/api';
import type { ReservationSearch } from '../types';
import '../style/ReservationForm.css';

interface Props {
    onSearch: (search: ReservationSearch) => void;
}

const TIME_SLOTS = generateTimeSlots();

function generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 11; hour <= 21; hour++) {
        slots.push(`${String(hour).padStart(2, '0')}:00`);
        slots.push(`${String(hour).padStart(2, '0')}:30`);
    }
    slots.push('22:00');
    return slots;
}

function ReservationForm({ onSearch }: Props) {
    const today = new Date().toISOString().split('T')[0];

    const [date, setDate] = useState(today);
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState(2);
    const [zone, setZone] = useState('');
    const [windowSeat, setWindowSeat] = useState(false);
    const [privateArea, setPrivateArea] = useState(false);
    const [childFriendly, setChildFriendly] = useState(false);
    const [zones, setZones] = useState<string[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchZones()
            .then(setZones)
            .catch(() => setError('Failed to load zones'));
    }, []);

    function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        setError('');

        if (!date || !time) {
            setError('Please select a date and time.');
            return;
        }
        if (partySize < 1 || partySize > 20) {
            setError('Party size must be between 1 and 20.');
            return;
        }

        onSearch({ date, time, partySize, zone, windowSeat, privateArea, childFriendly });
    }

    return (
        <form className="reservation-form" onSubmit={handleSubmit}>
            <h2>Find Your Table</h2>
            <p className="form-subtitle">Select your preferences below</p>

            {error && <p className="form-error">{error}</p>}

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
                        <option value="">Select time</option>
                        {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="partySize">Guests</label>
                    <input
                        id="partySize"
                        type="number"
                        min={1}
                        max={20}
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zone">Zone</label>
                    <select id="zone" value={zone} onChange={(e) => setZone(e.target.value)}>
                        <option value="">All zones</option>
                        {zones.map((z) => (
                            <option key={z} value={z}>{z.replace('_', ' ')}</option>
                        ))}
                    </select>
                </div>
            </div>

            <hr className="form-divider" />

            <div className="form-preferences">
                <label>Preferences</label>
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={windowSeat}
                            onChange={(e) => setWindowSeat(e.target.checked)}
                        />
                        By the window
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={privateArea}
                            onChange={(e) => setPrivateArea(e.target.checked)}
                        />
                        Quiet / Private
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={childFriendly}
                            onChange={(e) => setChildFriendly(e.target.checked)}
                        />
                        Child-friendly
                    </label>
                </div>
            </div>

            <button type="submit" className="btn-search">Find Tables</button>
        </form>
    );
}

export default ReservationForm;
