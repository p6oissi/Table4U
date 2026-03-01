import { useState, useRef } from 'react';
import ReservationForm from '../components/ReservationForm';
import FloorPlan from '../components/FloorPlan';
import { fetchTables } from '../services/api';
import type { ReservationSearch, Table } from '../types';
import '../style/ReservePage.css';

function ReservePage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [searched, setSearched] = useState(false);
    const floorPlanRef = useRef<HTMLDivElement>(null);

    function handleSearch(search: ReservationSearch) {
        console.log('Search:', search);
        fetchTables()
            .then((data) => {
                setTables(data);
                setSearched(true);
                setTimeout(() => {
                    floorPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className="reserve">
            <div className="reserve-header fade-in">
                <h1>Your Reservation</h1>
                <p>Select your preferences and we will find the perfect table</p>
                <hr className="gold-line" />
            </div>
            <ReservationForm onSearch={handleSearch} />
            {searched && (
                <div ref={floorPlanRef}>
                    <FloorPlan tables={tables} />
                </div>
            )}
        </div>
    );
}

export default ReservePage;
