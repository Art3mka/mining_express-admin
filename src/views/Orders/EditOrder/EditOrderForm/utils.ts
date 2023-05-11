export const seatsData = ['1', '2', '3'].map((item) => ({
    label: item,
    value: item,
}));

export const getModifyStationData = (data: any) => {
    const result = data.map((item: any) => ({
        label: item.name,
        value: item.id,
        stopTimes: item.stopTimes,
    }));

    return result;
};

export const getDefaultRoutesID = (array: [], value: string) => {
    const result = array.find((el: any) => el.name === value);
    return result;
};
