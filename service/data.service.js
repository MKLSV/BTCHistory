
export const dataService = {
    getHistoricalData
};

const BASE_URL = '/api/'

async function getHistoricalData(type, customFrom, customTo) {
    const dataToSend = formateData(type, customFrom, customTo)
    const response = await $fetch ("/api/get-candles",{
        method:"POST",
        body:dataToSend
    })
    return response
}

function formateData(type, customFrom, customTo) {
    if (type === "День") {
        return {
            type,
            interval: "5",
            fromTimestamp: Math.floor((Date.now() - 1 * 24 * 60 * 60 * 1000)),
            toTimestamp: Math.floor(Date.now())
        }
    }
    else if (type === "Неделя") {
        return {
            type,
            interval: "30",
            fromTimestamp: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000)),
            toTimestamp: Math.floor(Date.now())
        }
    }
    else if (type === "Месяц") {
        return {
            type,
            interval: "120",
            fromTimestamp: Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000)),
            toTimestamp: Math.floor(Date.now())
        }
    }
    else if (type === "Год") {
        return {
            type,
            interval: "D",
            fromTimestamp: Math.floor((Date.now() - 360 * 24 * 60 * 60 * 1000)),
            toTimestamp: Math.floor(Date.now())
        }
    }
    else if (type === "Custom") {
        return {
            type,
            interval: "15",
            fromTimestamp: new Date(customFrom).getTime(),
            toTimestamp: new Date(customTo).getTime()
        }
    }
}