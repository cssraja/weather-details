import React from 'react'
import Chart from "react-apexcharts";

function WeatherChart(chartData) {
    let info = (chartData.chartData) ? chartData.chartData : {}
    let data = (chartData.unit === 'Fahrenheit') ? info.tempinFahr : info.tempinCelc;

    let options = {
        chart: {
          type: 'bar'
        },
        series: [{
          name: 'Temp',
          data: (data) ? data : []
        }],
        xaxis: {
          categories: (info && info.time) ? info.time : []
        }
    }

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={options.series}
                        type="bar"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );

}

export default React.memo(WeatherChart);