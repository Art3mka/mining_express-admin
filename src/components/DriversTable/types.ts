export type Drivers = {
    userId: number
    login?: string
    password?: string
    phone?: string
}

const enableEditing = true
const enableStickyHeader = true
const rowCount = 30

export const tableProps = {
    enableStickyHeader,
    enableEditing,
    rowCount,
}

export interface Trip {
    routeId: number;
    departureTime?: string;
    arrivalTime?: string;
    dayOfWeekNumber?: number;
}

export interface UpdateTrip {
    tripId: number;
    departureTime?: string;
    arrivalTime?: string;
}
