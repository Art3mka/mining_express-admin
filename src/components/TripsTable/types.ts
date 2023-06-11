export type Drivers = {
    userId: number;
    login: string;
    password: string;
    phone: number;
};

export interface IRoutes {
    label: string;
    value: number;
}

const enableEditing = true;
const enableStickyHeader = true;
const rowCount = 30;

export const tableProps = {
    enableStickyHeader,
    enableEditing,
    rowCount,
};
