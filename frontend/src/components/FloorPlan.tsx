import { useMemo } from 'react';
import type { Table } from '../types';
import TableElement from './TableElement';
import '../style/FloorPlan.css';

interface Props {
    tables: Table[];
}

/* Predefined positions (%) for tables within each zone area —
   carefully spaced to avoid overlaps at all table sizes */
const TERRACE_SLOTS = [
    { left: '13%', top: '55%' },
    { left: '38%', top: '58%' },
    { left: '63%', top: '54%' },
    { left: '88%', top: '57%' },
];

const INDOOR_SLOTS = [
    { left: '18%', top: '20%' },
    { left: '50%', top: '14%' },
    { left: '84%', top: '24%' },
    { left: '32%', top: '46%' },
    { left: '68%', top: '42%' },
    { left: '86%', top: '66%' },
    { left: '20%', top: '72%' },
    { left: '52%', top: '72%' },
];

const PRIVATE_SLOTS = [
    { left: '50%', top: '25%' },
    { left: '50%', top: '75%' },
];

function FloorPlan({ tables }: Props) {
    const { terrace, indoor, privateLeft, privateRight } = useMemo(() => {
        const terrace = tables.filter(t => t.zone === 'TERRACE');
        const indoor = tables.filter(t => t.zone === 'INDOOR');
        const priv = tables.filter(t => t.zone === 'PRIVATE_ROOM');
        const mid = Math.ceil(priv.length / 2);
        return {
            terrace,
            indoor,
            privateLeft: priv.slice(0, mid),
            privateRight: priv.slice(mid),
        };
    }, [tables]);

    function handleTableClick(table: Table) {
        console.log('Clicked table:', table);
    }

    return (
        <div className="floorplan-wrapper">
            <div className="floorplan-header">
                <h2>Restaurant Floor Plan</h2>
                <div className="floorplan-legend">
                    <span className="legend-item legend-terrace">Terrace</span>
                    <span className="legend-item legend-indoor">Indoor</span>
                    <span className="legend-item legend-private">Private</span>
                </div>
            </div>

            {/* Architectural Floor Plan (desktop) */}
            <div className="fp-container">
                {/* Terrace */}
                <div className="fp-terrace">
                    <span className="fp-zone-tag fp-tag-terrace">Terrace</span>
                    {terrace.map((table, i) => (
                        <div key={table.id} className="fp-table-slot" style={TERRACE_SLOTS[i]}>
                            <TableElement table={table} onClick={handleTableClick} />
                        </div>
                    ))}
                </div>

                {/* Main Building */}
                <div className="fp-building">
                    {/* Private Room: Left */}
                    <div className="fp-room fp-room-left">
                        <span className="fp-room-tag">Private</span>
                        <div className="fp-door fp-door-right" />
                        <div className="fp-window fp-window-1" />
                        <div className="fp-window fp-window-2" />
                        {privateLeft.map((table, i) => (
                            <div key={table.id} className="fp-table-slot" style={PRIVATE_SLOTS[i]}>
                                <TableElement table={table} onClick={handleTableClick} />
                            </div>
                        ))}
                    </div>

                    {/* Main Hall: Center */}
                    <div className="fp-hall">
                        <span className="fp-zone-tag fp-tag-indoor">Main Hall</span>
                        <div className="fp-glass-wall">
                            <div className="fp-terrace-door" />
                        </div>
                        <div className="fp-hall-entrance" />
                        {indoor.map((table, i) => (
                            <div key={table.id} className="fp-table-slot" style={INDOOR_SLOTS[i]}>
                                <TableElement table={table} onClick={handleTableClick} />
                            </div>
                        ))}
                        <div className="fp-kids-area">
                            <span className="fp-kids-icon">&#9650;</span>
                            <span className="fp-kids-text">Kids Area</span>
                        </div>
                    </div>

                    {/* Private Room: Right */}
                    <div className="fp-room fp-room-right">
                        <span className="fp-room-tag">Private</span>
                        <div className="fp-door fp-door-left" />
                        <div className="fp-window fp-window-1" />
                        <div className="fp-window fp-window-2" />
                        {privateRight.map((table, i) => (
                            <div key={table.id} className="fp-table-slot" style={PRIVATE_SLOTS[i]}>
                                <TableElement table={table} onClick={handleTableClick} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: WC + Entrance */}
                <div className="fp-bottom-bar">
                    <div className="fp-wc">
                        <span className="fp-wc-icon">&#9633;</span>
                        <span className="fp-wc-text">WC</span>
                    </div>
                    <div className="fp-entrance">
                        <span className="fp-entrance-text">Entrance</span>
                    </div>
                    <div className="fp-wc">
                        <span className="fp-wc-icon">&#9633;</span>
                        <span className="fp-wc-text">WC</span>
                    </div>
                </div>
            </div>

            {/* Mobile List View (shown below 700px) */}
            <div className="fp-mobile-view">
                {terrace.length > 0 && (
                    <div className="fp-mobile-zone fp-mobile-terrace">
                        <h3>Terrace</h3>
                        <div className="fp-mobile-tables">
                            {terrace.map(table => (
                                <TableElement key={table.id} table={table} onClick={handleTableClick} />
                            ))}
                        </div>
                    </div>
                )}
                {indoor.length > 0 && (
                    <div className="fp-mobile-zone fp-mobile-indoor">
                        <h3>Main Hall</h3>
                        <div className="fp-mobile-tables">
                            {indoor.map(table => (
                                <TableElement key={table.id} table={table} onClick={handleTableClick} />
                            ))}
                        </div>
                    </div>
                )}
                {(privateLeft.length > 0 || privateRight.length > 0) && (
                    <div className="fp-mobile-zone fp-mobile-private">
                        <h3>Private Rooms</h3>
                        <div className="fp-mobile-tables">
                            {[...privateLeft, ...privateRight].map(table => (
                                <TableElement key={table.id} table={table} onClick={handleTableClick} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FloorPlan;
