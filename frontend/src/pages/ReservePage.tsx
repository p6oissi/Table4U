import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationForm from '../components/ReservationForm';
import FloorPlan from '../components/FloorPlan';
import BookingDialog from '../components/BookingDialog';
import { fetchRecommendedTables } from '../services/api';
import type { ReservationSearch, ReservationResponse, Table } from '../types';
import '../style/ReservePage.css';

function ReservePage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [searched, setSearched] = useState(false);
    const [lastSearch, setLastSearch] = useState<ReservationSearch | null>(null);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const floorPlanRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    function handleSearch(search: ReservationSearch) {
        fetchRecommendedTables(search)
            .then((data) => {
                setTables(data);
                setSearched(true);
                setLastSearch(search);
                setTimeout(() => {
                    floorPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            })
            .catch((err) => console.error(err));
    }

    function handleTableClick(table: Table) {
        if (table.status === 'AVAILABLE') {
            setSelectedTable(table);
        }
    }

    function handleBookingConfirmed(response: ReservationResponse) {
        navigate('/confirmation', { state: { reservation: response } });
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
                    <FloorPlan tables={tables} onTableClick={handleTableClick} />
                </div>
            )}

            {selectedTable && lastSearch && (
                <BookingDialog
                    table={selectedTable}
                    search={lastSearch}
                    onConfirm={handleBookingConfirmed}
                    onClose={() => setSelectedTable(null)}
                />
            )}

        </div>
    );
}

export default ReservePage;
