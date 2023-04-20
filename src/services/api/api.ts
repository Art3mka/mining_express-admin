import { makeRequest } from "../makeRequest";
import { RequestEnum } from "../types";

const url = "http://localhost:3005/store/api";

export const getData = async () => {
    const { data } = await makeRequest({
        url: `${url}/stocks`,
        method: RequestEnum.GET,
    });

    return data;
};

export const createData = async (postData: string) => {
    const { data } = await makeRequest({
        url: `${url}/stocks`,
        headers: {
            '':''
        },
        method: RequestEnum.POST,
        data: postData
    });

    return data;
};
