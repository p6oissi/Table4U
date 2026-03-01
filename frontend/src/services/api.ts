const API_BASE = "/api"

export async function fetchTables() {
    const response = await fetch(`${API_BASE}/tables`);
    if (!response.ok) throw new Error("Failed to fetch tables.");
    return response.json();
}