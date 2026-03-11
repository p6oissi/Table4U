import type { Table, ReservationSearch, ReservationResponse } from "../types"

const API_BASE = "/api"

export async function fetchRecommendedTables(search: ReservationSearch): Promise<Table[]> {
    const params = new URLSearchParams({
        date: search.date,
        time: search.time,
        partySize: String(search.partySize),
        window: String(search.windowSeat),
        privateArea: String(search.privateArea),
        childFriendly: String(search.childFriendly),
    })
    if (search.zone) params.set('zone', search.zone)
    const response = await fetch(`${API_BASE}/tables/recommended?${params}`)
    if (!response.ok) throw new Error("Failed to fetch recommended tables.")
    return response.json()
}

export async function bookTable(
    tableId: string,
    customerName: string,
    customerEmail: string,
    date: string,
    startTime: string,
    partySize: number
): Promise<ReservationResponse> {
    const response = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId, customerName, customerEmail, date, startTime, partySize }),
    })
    if (!response.ok) {
        const body = await response.json()
        throw new Error(body.error ?? 'Booking failed.')
    }
    return response.json()
}

export async function fetchZones(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/tables/zones`)
    if (!response.ok) throw new Error("Failed to fetch zones.")
    return response.json()
}