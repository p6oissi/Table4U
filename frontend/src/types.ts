export interface ReservationSearch {
    date: string
    time: string
    partySize: number
    zone: string
    windowSeat: boolean
    privateArea: boolean
    childFriendly: boolean
}

export interface ReservationResponse {
    id: string
    tableId: string
    tableNumber: number
    zone: string
    customerName: string
    customerEmail: string
    date: string
    startTime: string
    endTime: string
    partySize: number
}

export interface Table {
    id: string
    tableNumber: number
    capacity: number
    zone: string
    positionX: number
    positionY: number
    windowSeat: boolean
    privateArea: boolean
    childFriendly: boolean
    status?: 'AVAILABLE' | 'OCCUPIED' | 'FILTERED_OUT'
    score?: number
    bestMatch?: boolean
}