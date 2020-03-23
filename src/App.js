import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Container from '@material-ui/core/Container'
import { Forward } from '@material-ui/icons'
import {fetchReport} from './Actions/weatherActions'
import WeatherUnitSelector from './Components/WeatherUnitSelector'
import WeatherInfo from './Components/WeatherInfo'

import * as constants from './Common/constant'
import './App.scss';

function App() {

	const weatherDetails = useSelector(state => state.weatherReducer)
	const [data, setData] = useState({loading: false})
	const [currentPage, setCurrentPage] = useState(1)
	const [unit, setUnit] = useState(constants.FAHRENHEIT)
	const [cardItems, setCardItems] = useState({})
	const [datesList, setDatesList] = useState([])
	const [selDate, setSelDate] = useState('')
	const itemsPerPage = constants.ITEMS_PER_PAGE
	const dispatch = useDispatch()

	useEffect(() => {
        dispatch(fetchReport())
	}, [dispatch])


	useEffect(() => {
		let cardItem = weatherDetails.report.reduce((cumm, item) => {
			let date = (item.dt_txt).split(' ')[0];

			if(!cumm) {
				cumm = {};
			}
			if(!cumm[date]) {
				cumm[date] = {
					date: (item.dt_txt).split(' ')[0],
					time: [],
					tempinFahr: [],
					tempinCelc: [],
					avgFahr: '',
					avgCelc: '',
					isSelected: false
				};
			}

			if(cumm[date]['date'] === date) {
				let time = (item.dt_txt).split(' ')[1].split(':')[0];
				time = time > 9 ? `${parseInt(time, 10)}PM` :  `${parseInt(time, 10)}AM`
				cumm[date]['time'].push(time);
				cumm[date]['tempinFahr'].push(Math.ceil(((item.main.temp - 273.15) * 9/5) + 32).toFixed(1));
				cumm[date]['tempinCelc'].push(Math.ceil(item.main.temp - 273.15).toFixed(1));
				cumm[date]['avgFahr'] = (((((item.main.temp - 273.15) * 9/5) + 32) / cumm[date]['tempinFahr'].length) * cumm[date]['tempinFahr'].length).toFixed(1);
				cumm[date]['avgCelc'] = (((item.main.temp - 273.15) / cumm[date]['tempinCelc'].length) * cumm[date]['tempinCelc'].length).toFixed(1);
			}

			return cumm;
		}, {});
		
		const chunk = (arr, size) =>
		Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
			arr.slice(i * size, i * size + size)
		);

		setDatesList(chunk(Object.keys(cardItem), itemsPerPage)[currentPage - 1])
		setCardItems(cardItem);
		setData(weatherDetails);
		// console.log(Object.keys(cardItem), itemsPerPage)
	}, [weatherDetails, currentPage, currentPage, itemsPerPage, selDate])



	const selTempFormat = unit => {
        setUnit(unit)
	};

	const selCurrentPage = useCallback(cond => {
		setCurrentPage(currentPage + cond)
	}, [currentPage]);

	const selectedDate = date => {
        setSelDate(date)
	};
	
	return (
		<div className="App">
			{
				data.loading ? 
					<div className="spinner"></div> : 
					<Container maxWidth="md" className="main-container">
						<WeatherUnitSelector selTempFormat={selTempFormat}/>
						<div className="navigation">
							{
								currentPage > 1 ? 
									<Forward className="prev" onClick={() => selCurrentPage(-1)} /> : ''
							}

							{
								datesList && datesList.length > -1 && currentPage < datesList.length - 1 ? 
									<Forward className="next" onClick={() => selCurrentPage(1)} /> : ''
							}
							
						</div>
						{
							datesList && datesList.length > -1 ? 
								<WeatherInfo cardItems={cardItems} datesList={datesList} selectedDate={selectedDate} highlightedDate={selDate} unit={unit} /> : ''
						}
						
					</Container>
			}
		</div>
	);
}

export default App;
