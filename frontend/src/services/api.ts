import type {Table} from "../types.ts";

const API_BASE = "/api"

export async function fetchTables(): Promise<Table[]> {
    const response = await fetch(`${API_BASE}/tables`)
    if (!response.ok) throw new Error("Failed to fetch tables.")
    return response.json()
}

export async function fetchZones(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/tables/zones`)
    if (!response.ok) throw new Error("Failed to fetch zones.")
    return response.json()
}