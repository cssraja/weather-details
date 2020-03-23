import axios from 'axios'
import * as constants from '../Common/constant'
import  { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from './actionTypes'

const URL= `https://api.openweathermap.org/data/2.5/forecast?q=${constants.LOCATION}&APPID=${constants.APPID}&cnt=${constants.COUNT}`

const fetchWeatherRequest = () => {
    return {
        type: FETCH_WEATHER_REQUEST
    }
}

const fetchWeatherSuccess = (report) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload: report
    }
}

const fetchWeatherFailure = (error) => {
    return {
        type: FETCH_WEATHER_FAILURE,
        payload: error
    }
}

export const fetchReport = () => {
    return (dispatch) => {
        dispatch(fetchWeatherRequest)
        axios.get(URL)
            .then(response => {
                const report = (response.data && response.data.list) ? response.data.list : []
                dispatch(fetchWeatherSuccess(report))
            })
            .catch(error => {
                const errMessage = error.message
                dispatch(fetchWeatherFailure(errMessage))
            })
    }

}

