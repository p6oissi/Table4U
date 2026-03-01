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

function TableElement({ table, onClick }: Props) {
    const zoneClass = table.zone.toLowerCase().replace('_', '-');
    const size = sizeClass(table.capacity);

    return (
        <button
            className={`table-element zone-${zoneClass} ${size}`}
            onClick={() => onClick(table)}
        >
            <span className="table-number">T{table.tableNumber}</span>
            <span className="table-seats">{table.capacity}</span>
        </button>
    );
}

export default TableElement;
