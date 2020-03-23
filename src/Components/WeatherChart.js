import React from 'react'
import Chart from "react-apexcharts";
import * as constants from './../Common/constant'

function WeatherChart(chartData) {
    let info = (chartData.chartData) ? chartData.chartData : {}
    let data = (chartData.unit === constants.FAHRENHEIT) ? info.tempinFahr : info.tempinCelc;

    let options = {
        chart: {
          type: 'bar'
        },
        series: [{
          name: `Temp in ${chartData.unit[0]}`,
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