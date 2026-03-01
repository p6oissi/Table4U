import type { Table } from '../types';
import '../style/TableElement.css';

interface Props {
    table: Table;
    onClick: (table: Table) => void;
}

function sizeClass(capacity: number): string {
    if (capacity <= 2) return 'table-sm';
    if (capacity <= 4) return 'table-md';
    if (capacity <= 6) return 'table-lg';
    return 'table-xl';
}

function statusClass(status?: string): string {
    if (!status) return '';
    if (status === 'AVAILABLE') return 'status-available';
    if (status === 'OCCUPIED') return 'status-occupied';
    return 'status-filtered';
}

function buildScoreTooltip(table: Table): string {
    if (table.status !== 'AVAILABLE' || table.score === undefined) return '';
    const parts: string[] = [];
    if (table.bestMatch) parts.push('Best match');
    if (table.windowSeat) parts.push('Window seat');
    if (table.privateArea) parts.push('Private');
    if (table.childFriendly) parts.push('Child-friendly');
    parts.push(`Score: ${table.score}`);
    return parts.join(' · ');
}

function TableElement({ table, onClick }: Props) {
    const zoneClass = table.zone.toLowerCase().replace('_', '-');
    const size = sizeClass(table.capacity);
    const status = statusClass(table.status);
    const recommended = table.bestMatch ? 'status-recommended' : '';
    const interactive = !table.status || table.status === 'AVAILABLE';
    const tooltip = buildScoreTooltip(table);

    return (
        <button
            className={`table-element zone-${zoneClass} ${size} ${status} ${recommended}`}
            onClick={() => interactive && onClick(table)}
            tabIndex={interactive ? 0 : -1}
            aria-disabled={!interactive}
            title={tooltip}
        >
            {table.bestMatch && <span className="table-badge">Best</span>}
            <span className="table-number">T{table.tableNumber}</span>
            <span className="table-seats">{table.capacity}</span>
            {table.status === 'AVAILABLE' && table.score !== undefined && !table.bestMatch && (
                <span className="table-score">{table.score}</span>
            )}
        </button>
    );
}

export default TableElement;
