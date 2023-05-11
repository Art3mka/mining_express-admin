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

// const setDisabledDropdown = (isTrip: boolean, isDay: boolean) => {
//     if (isTrip) {
//         if (isDay) {
//             return setIsDisabled(false);
//         }
//         return setIsDisabled(true);
//     }
//     return setIsDisabled(true);
// };
// useEffect(() => {
//     setDisabledDropdown(isBoardingDate, isRouteChoose);
// }, [isBoardingDate, isRouteChoose]);

    // useEffect(() => {
    //     const data = getModifyStationData(depatureData);
    //     setModifiedStatinData(data);
    // }, [depatureData, routeIdValue]);

    // useEffect(() => {
    //     if (modifiedStatinData.length !== 0) {
    //         // const data = getDefaultRoutesID(editData?.busStopName!);
    //         // setDefaultBusStopId(data!)
    //     }
    // }, [editData?.busStopName, modifiedStatinData, routesData]);


    // useEffect(() => {
    //     if (modifiedTripsData) {
    //         console.log('modifiedTripsData :>> ', modifiedTripsData);
    //         const getDifferentTime = modifiedTripsData.map(
    //             (item: any) => ({
    //                 departureTime: item.departureTime,
    //                 arrivalTime: item.arrivalTime,
    //             })
    //         );
    //         console.log('171 :>> ', getDifferentTime);
    //         setDifferentTimeAvailable(getDifferentTime as any);
    //     }
    // }, [modifiedTripsData]);

export const getDefaultRoutesID = (array: [], value: string) => {
    const result = array.find((el: any) => el.name === value);
    return result;
};
