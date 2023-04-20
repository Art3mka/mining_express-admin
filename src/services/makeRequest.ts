import axios from "axios";

interface IMakeRequest {
    url: string;
    data?: any;
    method?: "get" | "post";
    params?: any;
    headers?: any;
}

export const makeRequest = async ({
    url,
    method = "get",
    data,
    params,
    headers,
}: IMakeRequest) => {
    return await axios({
        url,
        method,
        data,
        headers,
        params,
        withCredentials: false,
    } as IMakeRequest);
};
