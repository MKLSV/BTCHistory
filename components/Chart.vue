<template>
    <div class="chart">
        <div ref="chartContainer" style="height: 400px;"></div>
    </div>
</template>
  
<script>
import { createChart } from 'lightweight-charts';
import { dataService } from '../service/data.service';

export default {
    data() {
        return {
            loader: false
        }
    },
    props: {
        historyTime: String,
        customTo: String,
        customFrom: String,
    },
    async mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            try {
                dataService.getHistoricalData(this.historyTime, this.customFrom, this.customTo).then(res => {
                    let dataToSend = res.map(item => ({
                        time: parseInt(item[0]) / 1000,
                        open: parseFloat(item[1]),
                        high: parseFloat(item[2]),
                        low: parseFloat(item[3]),
                        close: parseFloat(item[4])
                    }));
                    dataToSend.sort((a, b) => a.time - b.time);
                    this.chart = createChart(this.$refs.chartContainer, {
                        width: 800,
                        height: 400,
                        timeScale: {
                            timeVisible: true,
                            secondsVisible: false,
                        },
                        layout: {
                            background: { color: 'rgb(237, 237, 237)' },
                            textColor: 'black',
                        },
                    });
                    const series = this.chart.addCandlestickSeries();
                    series.setData(dataToSend);
                
                })
            } catch {
                console.log('error')
            }
        },
    },
    watch: {
        historyTime(time) {
            this.chart.remove();
            console.log(time)
            this.createChart()
        },
    },
};
</script>
  
<style scoped>
.chart {
    box-shadow: 0px 0px 12px 1px black;
}
</style>