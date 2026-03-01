import type { Table, ReservationSearch } from "../types"

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

export async function fetchZones(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/tables/zones`)
    if (!response.ok) throw new Error("Failed to fetch zones.")
    return response.json()
}