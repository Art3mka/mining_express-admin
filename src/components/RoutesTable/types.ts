export type Routes = {
    routeId: number
    routeName: string
}

export const citiesList = [
    'San Francisco',
    'Richmond',
    'Riverside',
    'Los Angeles',
    'Blacksburg',
    'New York',
]

export const usStateList = [
    'California',
    'Virginia',
    'South Carolina',
    'New York',
    'Texas',
]

const enableEditing = true
const enableStickyHeader = true
const rowCount = 30

export const tableProps = {
    enableStickyHeader,
    enableEditing,
    rowCount,
}
