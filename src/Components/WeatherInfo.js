import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined'
import WeatherChart from './WeatherChart'
import * as constants from '../Common/constant'


function WeatherInfo( {cardItems, datesList, selectedDate, highlightedDate, unit} ) {
    const [chartData, setChartData] = useState([])
    const [selDate, setSelDate] = useState(highlightedDate)
    const defaultSeldateIndex = constants.DEFAULT_SEL_DATE_INDEX

    useEffect(() => {
        for (let [key, value] of Object.entries(cardItems)) {
            value.isSelected = false;
        }

        if(cardItems[selDate])
            setChartData(cardItems[selDate])
        
        if(!selDate && datesList.length > 0) {
            setSelDate(datesList[defaultSeldateIndex])
            setChartData(cardItems[datesList[defaultSeldateIndex]])
        }
	}, [datesList, cardItems, selDate, defaultSeldateIndex])

    const listItems = datesList.map((item) => {
        
        if(cardItems[item]) {
            return  <Card 
                        key={item}
                        onClick={() => {
                            cardItems[item].isSelected = true
                            selectedDate(selDate)
                            setSelDate(item)
                            setChartData(cardItems[item])
                        }}
                        className={(cardItems[item].isSelected || cardItems[item].date === selDate ? 'active' : '') + ' card-size'}
                    >
                        <CardContent >
                            <Typography variant="h4" component="h3">
                                Temp:
                            </Typography>
                            <Typography variant="h6" component="h3">
                                {unit[0] === 'F' ? cardItems[item].avgFahr : cardItems[item].avgCelc } <FiberManualRecordOutlinedIcon className="degrees"/> {unit[0]}
                            </Typography>
                            <Typography variant="h4" component="h3">
                                Date:
                            </Typography>
                            <Typography variant="h6" component="h3">
                                {cardItems[item].date}
                            </Typography>
                        </CardContent>
                    </Card>
        }
        return ''
     } );

    return (
        <div className="weather-info">
            {listItems}
            {chartData ? <WeatherChart chartData={chartData} unit={unit} /> : ''}
        </div>
    )
}

export default React.memo(WeatherInfo);