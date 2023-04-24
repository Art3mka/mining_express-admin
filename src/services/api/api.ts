import { makeRequest } from "../makeRequest";
import { RequestEnum } from "../types";

const url = "http://199.247.18.191:7777";

interface IAuthData {
    login: string,
    password: string,
}

export const getAuth = async (authData: IAuthData) => {
    console.log(authData);
    
    const { data } = await makeRequest({
        url: `${url}/api/auth/admin`,
        method: RequestEnum.POST,
        data: authData
    });

    return data;
};


export const getOrders = async (token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        method: RequestEnum.GET,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    });

    return data;
};

export const getDrivers = async (token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users`,
        method: RequestEnum.GET,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return data;
};

export const createOrder = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.POST,
        data: postData
    });

    return data;
};

export const createDriver = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.POST,
        data: postData
    });

    return data;
};

export const updateOrder = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.PATCH,
        data: postData
    });

    return data;
};

export const deleteOrder = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/api/orders/cancel`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.DELETE,
        data: postData
    });

    return data;
};

export const updateDriver = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}/users/updateDriver`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.PATCH,
        data: postData
    });

    return data;
};

export const unAssignDriver = async (postData: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}api/tripps/unAssign`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.PATCH,
        data: postData
    });

    return data;
};

export const deleteTrip = async (postData: string,tripId: string, token: string) => {
    const { data } = await makeRequest({
        url: `${url}api/trips/${tripId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: RequestEnum.PATCH,
        data: postData
    });

    return data;
};
