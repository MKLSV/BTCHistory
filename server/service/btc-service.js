import axios from 'axios';
export default async function getCandles(data) {
    try {
        const apiUrl = 'https://api.bybit.com/v5/market/kline';

        const response = await axios.get(apiUrl, {
            params: {
                category: 'inverse',
                symbol: 'BTCUSDT',
                interval: data.interval,
                start: data.fromTimestamp,
                end: data.toTimestamp,
            },
        });

        const candleData = response.data.result;
        return candleData
    } catch (err) {
        console.error('cannot find stories', err)
    }
}
