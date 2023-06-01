export enum RequestEnum {
    GET = "get",
    POST = "post",
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export interface ITrip {
    routeId: number;
    departureTime?: string;
    arrivalTime?: string;
    dayOfWeekNumber?: number;
}